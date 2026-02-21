"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { stories } from "../../data/stories"; // externalized stories

export default function TheBlogPage() {
  const [search, setSearch] = useState("");

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200">
      {/* Fixed top bar */}
      <div className="fixed top-0 left-0 right-0 bg-slate-800/90 backdrop-blur-md z-50 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-cyan-400 font-bold hover:underline"
        >
          ← Back to Portfolio
        </Link>
        <input
          type="text"
          placeholder="Search stories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1 rounded-md bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      {/* Spacer for fixed bar */}
      <div className="h-16"></div>

      <div className="max-w-5xl mx-auto p-6 space-y-12">
        {filteredStories.length === 0 ? (
          <p className="text-slate-400 text-center">No stories match your search.</p>
        ) : (
          filteredStories.map((story) => (
            <motion.article
              key={story.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg hover:shadow-cyan-500/20 transition-shadow"              
            >
              <header className="mb-4">
                <h2 className="text-3xl font-extrabold text-white">{story.title}</h2>
                <p className="text-sm text-slate-400">{story.date}</p>
              </header>

              <section className="space-y-4">
                {story.content.map((paragraph, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-slate-400 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                />
                ))}
              </section>

              {story.links && (
                <footer className="flex flex-wrap gap-3 mt-6">
                  {story.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-md text-sm font-semibold hover:bg-cyan-500/20 transition-all"
                    >
                      {link.label}
                    </a>
                  ))}
                </footer>
              )}
            </motion.article>
          ))
        )}
      </div>
    </div>
  );
}
