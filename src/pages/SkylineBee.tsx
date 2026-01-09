import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Article, ARTICLES } from "./articleData";
import { handleLinkClick } from "@/utils/navigation";

function Icon({ label, glyph, className = "" }: { label: string; glyph: string; className?: string }) {
  return (
    <span role="img" aria-label={label} className={`inline-block align-middle ${className}`}>
      {glyph}
    </span>
  );
}
const BeeIcon = (p: { className?: string }) => <Icon label="bee" glyph="🐝" className={p.className} />;

type Category = "All" | "Campus" | "Sports" | "Opinion" | "Tech";

type Post = Article;

// --- Filtering logic factored for testing ---
export function filterPosts(posts: Post[], active: Category, query: string): Post[] {
  const q = query.trim().toLowerCase();
  return posts.filter((p) =>
    (active === "All" || p.category === active) &&
    (q.length === 0 || p.title.toLowerCase().includes(q) || p.blurb.toLowerCase().includes(q))
  );
}

const NAV_ITEMS: Category[] = ["Campus", "Sports", "Opinion"];

function Header({
  onSearch,
  query,
  activeCategory,
}: {
  onSearch: (q: string) => void;
  query: string;
  activeCategory: Category;
}) {
  return (
    <header className="sticky top-0 z-20 header-glass">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 py-3">
          <div className="h-12 w-12 rounded bg-spartan text-white grid place-items-center">
            <BeeIcon className="text-lg" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tight leading-6">The Skyline Bee</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 w-full max-w-sm">
            {/* Magnifying glass removed per request */}
            <Input
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search headlines"
              className="h-8 text-xs border border-neutral-300 bg-white max-w-[190px] ml-auto"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
          {["All", ...NAV_ITEMS].map((item) => {
            const href = `/?category=${encodeURIComponent(item)}`;
            const isActive = activeCategory === item;
            return (
              <a
                key={item}
                href={href}
                onClick={(e) => handleLinkClick(e, href)}
                className={`${isActive ? "text-spartan" : "text-neutral-600"}`}
              >
                {item}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}


function Footer() {
  return (
    <footer className="border-t border-spartan-soft bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-6 text-sm text-neutral-600">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-spartan text-white grid place-items-center">
              <BeeIcon className="text-base" />
            </div>
            <span className="font-bold text-neutral-900">The Skyline Bee</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900 mb-2">About</p>
          <p className="text-xs text-neutral-500">
            This site is a class project showcasing fictional satire and parody coverage.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900 mb-2">Editorial Policy</p>
          <p className="text-xs text-neutral-500">
            Stories are satirical, not affiliated with Skyline High School or the Issaquah School District.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900 mb-2">Contact & Tips</p>
          <ul className="text-xs text-neutral-500 space-y-2">
            <li><a className="text-spartan" href="mailto:sussystudent26@gmail.com">sussystudent26@gmail.com</a></li>
            <li>
              <a
                className="text-spartan"
                href="https://forms.gle/udmDvnCaALBYcWwD6"
                target="_blank"
                rel="noreferrer"
              >
                Submit a tip
              </a>
            </li>
          </ul>
          <p className="text-[11px] text-neutral-500 mt-3">
            Disclaimer: all articles may be fictional satire created for a class project.
          </p>
        </div>
      </div>
      <div className="text-center text-xs text-neutral-500 pb-6">© {new Date().getFullYear()} The Skyline Bee</div>
    </footer>
  );
}

export type { Category, Post };

function normalizeCategory(category: string | null): Category {
  const value = category?.toLowerCase();
  if (value === "campus") return "Campus";
  if (value === "sports") return "Sports";
  if (value === "opinion") return "Opinion";
  if (value === "tech") return "Tech";
  return "All";
}

export default function SkylineBee() {
  const [query, setQuery] = useState("");
  const url = new URL(window.location.href);
  const activeCategory = normalizeCategory(url.searchParams.get("category"));
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // --- Runtime tests (basic) ---
  useEffect(() => {
    try {
      // 1) All + empty returns all
      console.assert(filterPosts(ARTICLES, "All", "").length === ARTICLES.length, "Test 1 failed: All should return all posts");
      // 2) Category filter works
      console.assert(filterPosts(ARTICLES, "Campus", "").length === 6, "Test 2 failed: Campus should return 6 posts");
      // 3) Query filter is case-insensitive
      console.assert(filterPosts(ARTICLES, "All", "flagpole").length === 1, "Test 3 failed: query 'flagpole' should match 1 post");
      // 4) Combined filter
      console.assert(filterPosts(ARTICLES, "Opinion", "democracy").length === 1, "Test 4 failed: Opinion + 'democracy' should match 1 post");
      // 5) Every post has a 1280x720 placeholder image URL
      console.assert(
        ARTICLES.every(
          (p) => typeof p.imageUrl === "string" && (p.imageUrl.includes("ufs.sh") || /\/1280\/720$/.test(p.imageUrl))
        ),
        "Test 5 failed: All posts should include 1280/720 imageUrl or the provided photo",
      );
    } catch (e) {
      console.error("Runtime tests raised an error", e);
    }
  }, []);

  return (
    <main className="page-aurora text-neutral-900">
      <div className="page-shell">
        <Header onSearch={setQuery} query={query} activeCategory={activeCategory} />
        <Footer />
      </div>
    </main>
  );
}
