import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';
import { PortableText } from '@portabletext/react';
import { Calendar, ArrowLeft, User, Clock, MessageCircle, Share2 } from 'lucide-react';

// ── Helpers ──────────────────────────────────────────────────────────────────

function getReadTime(body) {
  if (!body || !Array.isArray(body)) return null;
  const text = body
    .filter((b) => b._type === 'block' && Array.isArray(b.children))
    .flatMap((b) => b.children.map((s) => s.text || ''))
    .join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Normalize slug
  const cleanSlug = slug ? slug.trim() : '';

  useEffect(() => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    console.log('Current Page URL:', currentUrl);
    console.log('Extracted slug from useParams():', slug);
    console.log('Fetching slug:', cleanSlug);

    if (!cleanSlug) {
      setLoading(false);
      return;
    }

    const query = `*[_type == "post" && (
      slug.current == $slug ||
      slug.current == "\t" + $slug ||
      slug.current == " " + $slug ||
      slug.current match $slug
    )][0] {
      _id,
      title,
      slug,
      excerpt,
      "name": author->name,
      "author": author->{
        name,
        image
      },
      mainImage,
      publishedAt,
      body,
      "categories": categories[]->title
    }`;

    client
      .withConfig({ useCdn: false })
      .fetch(query, { slug: cleanSlug })
      .then((data) => {
        console.log('Sanity Response:', data);
        setPost(data);
        setLoading(false);
        if (typeof window !== 'undefined') window.__REVI_READY__ = true;

        // Fetch related posts (exclude current)
        if (data?._id) {
          const relatedQuery = `*[_type == "post" && _id != $id] | order(publishedAt desc) [0..2] {
            _id,
            title,
            slug,
            publishedAt,
            mainImage,
            "categories": categories[]->title,
            "fallbackExcerpt": array::join(string::split((pt::text(body)), "")[0..100], "") + "..."
          }`;
          client
            .withConfig({ useCdn: false })
            .fetch(relatedQuery, { id: data._id })
            .then((rel) => setRelated(rel || []))
            .catch(() => {});
        }
      })
      .catch((err) => {
        console.error('Failed to fetch post from Sanity:', err);
        setLoading(false);
        if (typeof window !== 'undefined') window.__REVI_READY__ = true;
      });
  }, [cleanSlug, slug]);

  // ── PortableText Components ─────────────────────────────────────────────────

  const portableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="font-sans text-base sm:text-lg text-gray-300 leading-relaxed mb-6 font-normal">
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D4AF37] mt-12 mb-5 tracking-tight">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#D4AF37] mt-8 mb-4 tracking-tight">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="font-serif text-lg sm:text-xl font-bold text-white mt-6 mb-3">
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-[#D4AF37] bg-[#112240]/60 rounded-r-xl p-6 italic text-gray-200 my-8 text-lg font-serif">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300 font-sans text-base sm:text-lg">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-300 font-sans text-base sm:text-lg">
          {children}
        </ol>
      ),
    },
    marks: {
      link: ({ value, children }) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-[#D4AF37] underline hover:text-[#f3e5ab] transition-colors"
          >
            {children}
          </a>
        );
      },
      strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
      em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
      code: ({ children }) => (
        <code className="bg-[#0A192F] text-[#D4AF37] px-2 py-0.5 rounded text-sm font-mono border border-white/10">
          {children}
        </code>
      ),
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref && !value?.asset?._id && !value?.asset?.url) return null;
        return (
          <figure className="my-10">
            <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A192F]">
              <img
                src={urlFor(value).width(1200).auto('format').fit('max').url()}
                alt={value.alt || 'Vantage Point Journal illustration'}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            {(value.caption || value.alt) && (
              <figcaption className="text-center text-xs text-gray-400 mt-3 font-sans">
                {value.caption || value.alt}
              </figcaption>
            )}
          </figure>
        );
      },
    },
  };

  // ── Loading State ───────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A192F] text-white pt-36 pb-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-sans">Loading Article...</p>
        </div>
      </div>
    );
  }

  // ── Not Found State ─────────────────────────────────────────────────────────

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A192F] text-white pt-36 pb-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Post Not Found</h2>
          <p className="text-gray-400 text-sm mb-6">
            The article you are looking for may have been moved or does not exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4AF37] text-[#0A192F] text-xs uppercase tracking-widest font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Journal</span>
          </Link>
        </div>
      </div>
    );
  }

  // ── Derived Values ──────────────────────────────────────────────────────────

  const readTime = getReadTime(post.body);
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(post.title || '');
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent((post.title || '') + ' — ' + pageUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const waChatUrl = `https://wa.me/254758850766?text=${encodeURIComponent('Hi Vantage Point! I just read "' + (post.title || '') + '" and I would like to chat.')}`;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <article id="top" className="min-h-screen bg-[#0A192F] text-white pt-28 pb-32">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">

        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </Link>
        </div>

        {/* Categories Badges */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {post.categories.map((cat, idx) => {
              const label = typeof cat === 'string' ? cat : cat?.title;
              if (!label) return null;
              return (
                <span
                  key={cat?._id || label || idx}
                  className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10"
                >
                  {label}
                </span>
              );
            })}
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-6">
          {post.title}
        </h1>

        {/* Excerpt Lead */}
        {post.excerpt && (
          <p className="font-sans text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
            {post.excerpt}
          </p>
        )}

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-white/10 mb-10">
          {/* Author */}
          <div className="flex items-center gap-3.5">
            {post.author?.image ? (
              <img
                src={urlFor(post.author.image).width(96).height(96).fit('crop').url()}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#D4AF37]/40 shadow-md"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-[#112240] border border-white/10 flex items-center justify-center text-[#D4AF37]">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block font-sans">WRITTEN BY</span>
              <span className="text-sm font-semibold text-white tracking-wide">
                {post.name || post.author?.name || 'Vantage Point Editorial'}
              </span>
            </div>
          </div>

          {/* Date + Read Time */}
          <div className="flex items-center gap-4 text-xs text-gray-400 font-sans">
            {post.publishedAt && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
            {readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>{readTime} min read</span>
              </div>
            )}
          </div>
        </div>

        {/* Hero Image */}
        {post.mainImage && (
          <div className="relative w-full h-[320px] sm:h-[460px] lg:h-[540px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12 bg-[#112240]">
            <img
              src={urlFor(post.mainImage).width(1400).height(800).url()}
              alt={post.mainImage.alt || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Body */}
        <div className="prose-custom max-w-none">
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-gray-400 italic">No content available for this post.</p>
          )}
        </div>

        {/* ── Social Share ─────────────────────────────────────────────────── */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-sans mb-4 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#D4AF37]" />
            Share this article
          </p>
          <div className="flex flex-wrap gap-3">
            {/* WhatsApp Share */}
            <a
              href={waShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] text-xs font-semibold uppercase tracking-widest hover:bg-[#25D366]/20 transition-colors"
            >
              {/* WhatsApp icon (inline SVG) */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>

            {/* Twitter/X Share */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-gray-300 text-xs font-semibold uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter / X
            </a>

            {/* LinkedIn Share */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0A66C2]/40 bg-[#0A66C2]/10 text-[#60a5fa] text-xs font-semibold uppercase tracking-widest hover:bg-[#0A66C2]/20 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* ── WhatsApp CTA ─────────────────────────────────────────────────── */}
        <div className="mt-12 rounded-3xl bg-[#112240] border border-[#D4AF37]/20 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-sans font-semibold mb-1">
              Got questions from this article?
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              Let's start a conversation.
            </h3>
            <p className="text-gray-400 font-sans text-sm mt-2 leading-relaxed">
              Send us a message on WhatsApp — we typically reply within the hour.
            </p>
          </div>
          <a
            href={waChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#D4AF37] text-[#0A192F] font-bold text-sm uppercase tracking-widest hover:bg-[#c49f2c] transition-colors shadow-lg shadow-[#D4AF37]/20"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>

        {/* ── Related Articles ─────────────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/10">
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-sans font-semibold mb-6">
              More From the Journal
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => {
                const rSlug = r.slug?.current ? r.slug.current.trim() : '';
                const rCategory =
                  r.categories && r.categories.length > 0
                    ? typeof r.categories[0] === 'string'
                      ? r.categories[0]
                      : r.categories[0]?.title
                    : null;
                return (
                  <Link
                    key={r._id}
                    to={`/blog/${rSlug}`}
                    className="group block rounded-2xl bg-[#112240] border border-white/10 hover:border-[#D4AF37] transition-all duration-300 overflow-hidden shadow-lg hover:-translate-y-1"
                  >
                    {/* Thumbnail */}
                    <div className="w-full h-40 bg-[#0A192F] overflow-hidden relative">
                      {r.mainImage ? (
                        <img
                          src={urlFor(r.mainImage).width(600).height(320).url()}
                          alt={r.mainImage.alt || r.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs font-mono">
                          No Image
                        </div>
                      )}
                      {rCategory && (
                        <span className="absolute top-2 left-2 text-[9px] font-bold tracking-widest uppercase bg-[#0A192F]/90 text-[#D4AF37] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                          {rCategory}
                        </span>
                      )}
                    </div>
                    {/* Text */}
                    <div className="p-5">
                      {r.publishedAt && (
                        <p className="text-[10px] text-gray-500 font-sans mb-1">
                          {new Date(r.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                      <h4 className="font-serif text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                        {r.title}
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Bottom Navigation ─────────────────────────────────────────────── */}
        <div className="mt-16 pt-10 border-t border-white/10 flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#D4AF37] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Articles</span>
          </Link>
          <a
            href="#top"
            className="text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            Back to Top ↑
          </a>
        </div>

      </div>
    </article>
  );
}
