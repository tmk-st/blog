"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [theme, setTheme] = useState("light");

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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--border)] py-6">
        <nav className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
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
          <button
            onClick={toggleTheme}
            className="px-5 py-1 rounded-full border border-[var(--border)] hover:bg-[var(--accent)] transition-all text-sm"
          >
            {theme === "dark" ? "Dark" : "Light"}
          </button>
        </nav>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-20">
        <div className="flex items-center gap-6 mb-12">
          <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={`${basePath}/icon.jpeg`}
              alt="アイコン"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">tmkst</h1>
            <p className="text-[var(--text-secondary)]">Web Developer</p>
          </div>
        </div>

        <section className="mb-12">
          <p className="text-lg leading-loose text-[var(--text-secondary)]">
            <span className="block mb-2">Webエンジニア。フロントエンド、a11y、UI/UXが好きです。</span>
            <span className="block">
              最近はWebGL（three.js）に興味があります。Nomad Sculptで3Dモデリング勉強中。
            </span>
            <span className="block"></span>
          </p>
        </section>

        <section>
          <div className="flex gap-4 flex-wrap">
            <a
              href="https://bsky.app/profile/tmkst.bsky.social"
              className="px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--accent)] hover:transform hover:-translate-y-0.5 transition-all text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bluesky
            </a>
            <a
              href="https://zenn.dev/tmkst"
              className="px-5 py-2.5 rounded-full border border-[var(--border)] hover:bg-[var(--accent)] hover:transform hover:-translate-y-0.5 transition-all text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zenn
            </a>
          </div>
        </section>
      </main>

      <footer className="pb-10 text-center text-sm text-[var(--text-secondary)]">
        <p>&copy; 2025- tmkst</p>
      </footer>
    </div>
  );
}
