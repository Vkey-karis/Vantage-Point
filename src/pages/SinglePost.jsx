import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';
import { PortableText } from '@portabletext/react';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';

export default function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GROQ query to fetch post matching slug
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      body
    }`;

    client
      .fetch(query, { slug })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch post from Sanity:', err);
        setLoading(false);
      });
  }, [slug]);

  // Custom PortableText Serializers matching Vantage Point brand
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
      // Inline images serializer using Sanity's urlFor builder
      image: ({ value }) => {
        if (!value?.asset?._ref && !value?.asset?._id && !value?.asset?.url) {
          return null;
        }
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
            {value.alt && (
              <figcaption className="text-center text-xs text-gray-400 mt-3 font-sans">
                {value.alt}
              </figcaption>
            )}
          </figure>
        );
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A192F] text-white pt-36 pb-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-sans">
            Loading Article...
          </p>
        </div>
      </div>
    );
  }

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

  return (
    <article className="min-h-screen bg-[#0A192F] text-white pt-28 pb-32">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Large Hero Image at the top */}
        {post.mainImage && (
          <div className="relative w-full h-[320px] sm:h-[460px] lg:h-[540px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-10 bg-[#112240]">
            <img
              src={urlFor(post.mainImage).width(1400).height(800).url()}
              alt={post.mainImage.alt || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Post Metadata: Date */}
        {post.publishedAt && (
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-6 font-sans">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        )}

        {/* Title: Playfair Display, Massive */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-10 pb-8 border-b border-white/10">
          {post.title}
        </h1>

        {/* Body Content with PortableText */}
        <div className="prose-custom max-w-none">
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-gray-400 italic">No content available for this post.</p>
          )}
        </div>

        {/* Bottom Navigation */}
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
            className="text-xs uppercase tracking-widest text-gray-400 hover:text-white"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </article>
  );
}
