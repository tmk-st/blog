"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/blog";

const POSTS_PER_PAGE = 5;

interface HomeClientProps {
  posts: Post[];
}

export default function HomeClient({ posts }: HomeClientProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const [theme, setTheme] = useState("light");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="border-b border-[var(--border)] py-6">
        <nav className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
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
          </div>
          <button
            onClick={toggleTheme}
            className="px-5 py-1 rounded-full border border-[var(--border)] hover:bg-[var(--accent)] transition-all text-sm"
          >
            {theme === "dark" ? "Dark" : "Light"}
          </button>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        {/* 自己紹介セクション */}
        <section className="py-20">
          <h1 className="md:text-5xl text-3xl font-bold mb-5 relative inline-block whitespace-nowrap">
            Hello World!!★★*:.。.
            <span className="absolute -bottom-1 left-0 w-30 h-2 bg-[var(--accent)]"></span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed">
            Web developer based in 東京.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="https://zenn.dev/tmkst"
              className="px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--accent)] hover:transform hover:-translate-y-0.5 transition-all text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zenn
            </a>
            <a
              href="https://bsky.app/profile/tmkst.bsky.social"
              className="px-5 py-2.5 rounded-full border border-[var(--border)] hover:bg-[var(--accent)] hover:transform hover:-translate-y-0.5 transition-all text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bluesky
            </a>
          </div>
        </section>

        {/* ブログセクション */}
        <section className="py-16">
          <div className="mb-10 pb-4 border-b-2 border-[var(--accent)]">
            <h2 className="text-2xl font-semibold">Blog ✦⋆˙</h2>
          </div>

          {currentPosts.length === 0 ? (
            <p className="text-[var(--text-secondary)] text-center py-12">
              まだ記事がありません
            </p>
          ) : (
            <>
              <div className="space-y-0">
                {currentPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${post.slug}`}
                    className="block py-8 border-b border-[var(--border)] hover:pl-5 transition-all group"
                  >
                    <div className="flex gap-4 text-sm mb-2">
                      <time className="text-[var(--text-secondary)]">
                        {post.date}
                      </time>
                      <span className="px-3 py-1 rounded-full bg-[var(--accent)] text-xs font-medium">
                        Blog
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--text-primary)]">
                      <span className="group-hover:before:content-['→_'] group-hover:before:text-[var(--accent)]">
                        {post.title}
                      </span>
                    </h3>
                    {post.excerpt && (
                      <p className="text-[var(--text-secondary)] text-sm">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </div>

              {/* ページネーション */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    前へ
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-10 h-10 rounded-lg border transition-all ${
                            currentPage === page
                              ? "bg-[var(--accent)] border-[var(--accent)] font-semibold"
                              : "border-[var(--border)] hover:bg-[var(--bg-secondary)]"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    次へ
                  </button>
                </div>
              )}

              {totalPages > 1 && (
                <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
                  {posts.length}件中 {startIndex + 1} -{" "}
                  {Math.min(endIndex, posts.length)}件を表示
                </p>
              )}
            </>
          )}
        </section>
      </main>

      <footer className=" py-10 text-center text-sm text-[var(--text-secondary)] mt-20">
        <p>&copy; 2025 tmkst</p>
      </footer>
    </>
  );
}
