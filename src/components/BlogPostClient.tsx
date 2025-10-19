"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PostWithContent } from "@/lib/blog";

interface BlogPostClientProps {
  post: PostWithContent;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  return (
    <>
      <header className="border-b border-[var(--border)] py-6">
        <nav className="max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            ← Home
          </Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <article>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex gap-4 items-center">
            <time className="text-[var(--text-secondary)] text-sm">
              {post.date}
            </time>
            <span className="px-3 py-1 rounded-full bg-[var(--accent)] text-xs font-medium">
              Blog
            </span>
          </div>
          <div
            className="znc mt-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>

      <footer className="border-t-2 border-[var(--accent)] py-10 text-center text-sm text-[var(--text-secondary)] mt-20">
        <p>&copy; 2025 tmkst</p>
      </footer>
    </>
  );
}
