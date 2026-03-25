"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PostWithContent } from "@/lib/blog";

interface BlogPostClientProps {
  post: PostWithContent;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  return (
    <>
      <header className="border-b border-[var(--border)] py-6">
        <nav className="max-w-4xl mx-auto px-6">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={`${basePath}/icon.jpeg`}
                alt="アイコン"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <p className="font-semibold text-lg">tmkst</p>
          </Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
          <Link href="/" className="hover:text-[var(--text-primary)]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] truncate">{post.title}</span>
        </nav>

        <article>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex gap-4 items-center flex-wrap">
            <time className="text-[var(--text-secondary)] text-sm">
              {post.date}
            </time>
            {post.tags && post.tags.length > 0 ? (
              post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-[var(--accent)] text-xs font-medium">
                  {tag}
                </span>
              ))
            ) : (
              <span className="px-3 py-1 rounded-full bg-[var(--accent)] text-xs font-medium">
                Blog
              </span>
            )}
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
