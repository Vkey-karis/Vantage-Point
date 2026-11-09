import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';
import { Calendar, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GROQ query to fetch all published blog posts including the explicit excerpt, author, and categories
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        image
      },
      categories[]->{
        _id,
        title
      },
      "fallbackExcerpt": array::join(string::split((pt::text(body)), "")[0..140], "") + "..."
    }`;

    client
      .fetch(query)
      .then((data) => {
        setPosts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch posts from Sanity:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0A192F] text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] font-sans">
              INSIGHTS &amp; PERSPECTIVES
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            The Vantage Point Journal.
          </h1>
          <p className="mt-4 text-gray-400 font-sans text-base sm:text-lg leading-relaxed">
            Thought leadership, design philosophy, and technical playbooks for scaling ambitious digital businesses.
          </p>
        </div>

        {/* Premium Gold Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-[#112240] border border-white/5 p-6 animate-pulse"
              >
                <div className="w-full h-52 bg-[#0A192F] rounded-xl mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent animate-shimmer" />
                </div>
                <div className="h-4 w-28 bg-white/10 rounded mb-4" />
                <div className="h-6 w-5/6 bg-white/10 rounded mb-2" />
                <div className="h-6 w-3/4 bg-white/10 rounded mb-6" />
                <div className="h-4 w-24 bg-[#D4AF37]/20 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-20 bg-[#112240] rounded-3xl border border-white/10 p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#0A192F] border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">No Articles Published Yet</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Open your Sanity Studio at <code className="text-[#D4AF37]">http://localhost:3333</code> or create your first post in the studio to see it appear live here.
            </p>
            <a
              href="http://localhost:3333"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4AF37] text-[#0A192F] text-xs uppercase tracking-widest font-bold hover:bg-[#c49f2c] transition-colors"
            >
              <span>Open Sanity Studio</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* 3-Column Desktop / 1-Column Mobile Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => {
              const displayExcerpt = post.excerpt || post.fallbackExcerpt;
              const primaryCategory = post.categories && post.categories[0]?.title;

              return (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    to={`/blog/${post.slug?.current}`}
                    className="group block rounded-2xl bg-[#112240] border border-white/10 hover:border-[#D4AF37] transition-all duration-300 overflow-hidden shadow-xl hover:shadow-[0_15px_35px_rgba(212,175,55,0.12)] flex flex-col h-full transform hover:-translate-y-1"
                  >
                    {/* Main Image */}
                    <div className="relative w-full h-56 bg-[#0A192F] overflow-hidden">
                      {post.mainImage ? (
                        <img
                          src={urlFor(post.mainImage).width(700).height(420).url()}
                          alt={post.mainImage.alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs font-mono">
                          No Image
                        </div>
                      )}

                      {/* Primary Category Pill Overlay */}
                      {primaryCategory && (
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-[#0A192F]/90 text-[#D4AF37] px-2.5 py-1 rounded-full border border-[#D4AF37]/30 shadow-md backdrop-blur-sm">
                            {primaryCategory}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Date and Author */}
                        <div className="flex items-center justify-between text-xs text-gray-400 font-sans mb-3">
                          {post.publishedAt && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                          )}

                          {post.author?.name && (
                            <span className="text-[11px] text-gray-400 truncate max-w-[140px]">
                              by {post.author.name}
                            </span>
                          )}
                        </div>

                        {/* Title: Playfair Display */}
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors duration-200 line-clamp-2 mb-3">
                          {post.title}
                        </h2>

                        {/* Dedicated Excerpt */}
                        {displayExcerpt && (
                          <p className="text-gray-300 font-sans text-sm line-clamp-3 leading-relaxed mb-6">
                            {displayExcerpt}
                          </p>
                        )}
                      </div>

                      {/* Read Article Link */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-300 group-hover:text-[#D4AF37] transition-colors mt-auto">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200 text-[#D4AF37]" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
