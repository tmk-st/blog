"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Work = {
  name: string;
  description?: string;
  image?: string;
  links?: string[];
};

type WorkSection = {
  title: string;
  items: Work[];
};

const workSections: WorkSection[] = [
  {
    title: "Apps",
    items: [
      {
        name: "うかぶしま",
        description:
          "WebGLで作成した3Dの浮かぶ島に、オブジェクトを配置して自分の空間を作れるWebサービス。",
        image: "/works/ukabushima.png",
        links: ["https://ukabushima.tmkst.com/"],
      },
      {
        name: "Feed Preview",
        description:
          "インスタのフィード投稿の並び順を事前にシミュレーションできるWebサービス。PWA対応。",
        image: "/works/feed-preview.png",
        links: ["https://feed-preview-omega.vercel.app/"],
      },
    ],
  },
  {
    title: "Outputs",
    items: [
      {
        name: "BOOTH",
        description: "技術書を個人販売しています。",
        image: "/works/booth.png",
        links: ["https://tmkst.booth.pm/"],
      },
      {
        name: "ProtoPedia",
        description: "試しに使ってみた技術や小さなアウトプットを掲載しています。",
        image: "/works/protopedia.png",
        links: ["https://protopedia.net/prototyper/tmkst"],
      },
    ],
  },
];

export default function WorksPage() {
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
        <div className="mb-12 pb-4 border-b-2 border-[var(--accent)]">
          <h1 className="text-3xl font-bold">Works ✦⋆˙</h1>
        </div>
        <div className="space-y-12">
          {workSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-widest pb-3 mb-0 border-b border-[var(--border)]">
                {section.title}
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {section.items.map((work) => {
                  const primaryUrl = work.links?.[0];
                  const content = (
                    <>
                      <div className="relative w-full h-40 rounded-lg overflow-hidden bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
                        {work.image ? (
                          <Image
                            src={`${basePath}${work.image}`}
                            alt={work.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-[var(--text-tertiary)]">
                            {work.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <p className="font-semibold mb-1 flex items-center gap-1.5">
                        {work.name}
                        {primaryUrl && (
                          <span className="text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] transition-colors text-sm">
                            ↗
                          </span>
                        )}
                      </p>
                      {work.description && (
                        <p className="text-[var(--text-secondary)] text-sm">
                          {work.description}
                        </p>
                      )}
                    </>
                  );

                  return (
                    <div key={work.name}>
                      {primaryUrl ? (
                        <a
                          href={primaryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 hover:bg-[var(--bg-secondary)] rounded-xl transition-all group"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="p-4">{content}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="pb-10 text-center text-sm text-[var(--text-secondary)]">
        <p>&copy; 2025- tmkst</p>
      </footer>
    </div>
  );
}
