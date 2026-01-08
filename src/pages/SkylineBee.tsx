import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Article, ARTICLES } from "./articleData";
import { handleLinkClick } from "@/utils/navigation";
import { formatTimestamp, getDailyShuffle, getInitials, getReadingTime } from "@/utils/articleMeta";

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

function AuthorBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-neutral-500">
      <span className="h-6 w-6 rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-700 grid place-items-center">
        {getInitials(name)}
      </span>
      By {name}
    </span>
  );
}

const NAV_ITEMS: Category[] = ["Campus", "Sports", "Opinion"];

function Header({
  onSearch,
  query,
  breakingTitle,
  activeCategory,
}: {
  onSearch: (q: string) => void;
  query: string;
  breakingTitle: string;
  activeCategory: Category;
}) {
  return (
    <header className="sticky top-0 z-20 header-glass">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 py-3">
          <div className="h-12 w-12 rounded-full bg-spartan text-white grid place-items-center shadow logo-animate">
            <BeeIcon className="text-lg" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tight leading-6 logo-animate">The Skyline Bee</h1>
            <span className="text-xs uppercase tracking-[0.18em] text-neutral-500">Campus & Culture</span>
          </div>
          <div className="ml-auto flex items-center gap-2 w-full max-w-sm">
            {/* Magnifying glass removed per request */}
            <Input
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search headlines"
              className="h-8 text-xs border-0 surface-input max-w-[190px] ml-auto"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
          {NAV_ITEMS.map((item) => {
            const href = `/?category=${encodeURIComponent(item)}`;
            const isActive = activeCategory === item;
            return (
              <a
                key={item}
                href={href}
                onClick={(e) => handleLinkClick(e, href)}
                className={`transition-colors ${isActive ? "text-spartan" : "hover:text-spartan"}`}
              >
                {item}
              </a>
            );
          })}
        </div>
      </div>
      <div className="border-t border-spartan-soft bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-1 text-xs text-neutral-600">
          <span className="font-semibold text-spartan">Breaking:</span> {breakingTitle}
        </div>
      </div>
    </header>
  );
}

function PostCard({ post }: { post: Post }) {
  const href = `/?page=article&slug=${encodeURIComponent(post.slug)}`;
  const timestamp = formatTimestamp(post.date, post.slug);
  const readingTime = getReadingTime(post.body);

  return (
    <a
      href={href}
      onClick={(e) => handleLinkClick(e, href)}
      className="block group focus-ring-spartan rounded-2xl active:scale-[0.99] transition-transform"
      aria-label={`Read ${post.title}`}
    >
      <Card
        className="glass-card-soft card-animate border-0 overflow-hidden"
        style={{ viewTransitionName: `card-${post.slug}` } as React.CSSProperties}
      >
        <img
          src={post.imageUrl}
          alt={post.title}
          width={1280}
          height={720}
          className="w-full h-40 md:h-44 object-cover card-media"
          loading="lazy"
          style={{ viewTransitionName: `image-${post.slug}` } as React.CSSProperties}
        />
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-neutral-500">
            <span className="font-semibold text-spartan">{post.category}</span>
            <span className="opacity-60">•</span>
            <span>{timestamp}</span>
          </div>
          <h3 className="mt-2 text-xl font-bold headline-font headline-tight group-hover:text-spartan transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-neutral-600 mt-2">{post.blurb}</p>
          <div className="flex items-center justify-between mt-4">
            <AuthorBadge name={post.author} />
            <span className="text-xs text-neutral-500">{readingTime}</span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

function Hero({ article }: { article: Post }) {
  const timestamp = formatTimestamp(article.date, article.slug);
  const readingTime = getReadingTime(article.body);

  return (
    <section className="relative overflow-hidden border-b border-spartan-soft bg-skyline-cool">
      <div
        className="absolute inset-0 hero-backdrop"
        aria-hidden
        style={{ backgroundImage: `url(${article.imageUrl})` }}
      />
      <div className="absolute inset-0 hero-tint" aria-hidden />
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 grid md:grid-cols-5 gap-6 items-center relative">
        <div className="md:col-span-3 space-y-3">
          <h2 className="text-3xl md:text-4xl font-black headline-font headline-tight">{article.title}</h2>
          <p className="text-sm md:text-base text-neutral-700">
            {article.blurb}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <AuthorBadge name={article.author} />
            <span>•</span>
            <span>{timestamp}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
          <div className="flex gap-3 pt-1">
            <Button asChild className="bg-spartan hover:bg-spartan-strong button-animate">
              <a
                href={`/?page=article&slug=${encodeURIComponent(article.slug)}`}
                onClick={(e) => handleLinkClick(e, `/?page=article&slug=${encodeURIComponent(article.slug)}`)}
              >
                Read the story
              </a>
            </Button>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="rounded-2xl overflow-hidden surface-card">
            <img
              src={article.imageUrl}
              alt={article.title}
              width={1280}
              height={720}
              className="w-full h-52 md:h-60 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
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
          <p className="text-xs text-neutral-500">
            Student-run satire desk covering campus life, culture, and everything in between.
          </p>
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

  const dailyPosts = useMemo(() => getDailyShuffle(ARTICLES), []);
  const featured = dailyPosts[0];
  const filteredPosts = useMemo(
    () => filterPosts(dailyPosts, activeCategory, query),
    [dailyPosts, activeCategory, query],
  );
  const rest = featured ? filteredPosts.filter((post) => post.id !== featured.id) : filteredPosts;
  const secondary = rest.slice(0, 3);
  const remaining = rest.slice(3);
  const breakingTitle = featured?.title ?? "Top stories";

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
    <main className="page-aurora text-neutral-900 fade-in">
      <div className="page-shell">
        <Header onSearch={setQuery} query={query} breakingTitle={breakingTitle} activeCategory={activeCategory} />
        {featured && <Hero article={featured} />}

        {secondary.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondary.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </section>
        )}

        {remaining.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 pb-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {remaining.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </section>
        )}

        <Footer />
      </div>
    </main>
  );
}
