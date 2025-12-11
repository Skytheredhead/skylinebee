import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
const ChevronRightIcon = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden
    focusable="false"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

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

function Header({ onSearch, query }: { onSearch: (q: string) => void; query: string }) {
  return (
    <header className="sticky top-0 z-20 header-glass shadow-sm border-b border-spartan-soft">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 py-3">
          <div className="h-10 w-10 rounded-full bg-spartan text-white grid place-items-center shadow">
            <BeeIcon className="text-lg" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tight leading-5">The Skyline Bee</h1>
            {/* Tagline removed per request */}
          </div>
          <div className="ml-auto flex items-center gap-2 w-full max-w-sm">
            {/* Magnifying glass removed per request */}
            <Input
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search headlines"
              className="h-9"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function PostCard({ post }: { post: Post }) {
  const href = `/?page=article&slug=${encodeURIComponent(post.slug)}`;

  return (
    <a
      href={href}
      onClick={(e) => handleLinkClick(e, href)}
      className="block group focus-ring-spartan rounded-2xl"
      aria-label={`Read ${post.title}`}
    >
      <Card className="hover:shadow-lg transition border border-spartan-soft overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          width={1280}
          height={720}
          className="w-full h-48 md:h-56 object-cover"
          loading="lazy"
        />
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-spartan text-white">{post.category}</Badge>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>
          <h3 className="text-xl font-bold leading-snug group-hover:text-spartan transition-colors">{post.title}</h3>
          <p className="text-sm text-muted-foreground mt-2">{post.blurb}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-muted-foreground">By {post.author}</span>
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-spartan-soft text-spartan">
            <ChevronRightIcon className="h-4 w-4" />
          </span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

function Hero({ article }: { article: Post }) {
  return (
    <section className="relative overflow-hidden border-b border-spartan-soft bg-skyline-cool">
      <div
        className="absolute inset-0 hero-backdrop"
        aria-hidden
        style={{ backgroundImage: `url(${article.imageUrl})` }}
      />
      <div className="absolute inset-0 hero-tint" aria-hidden />
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 items-center relative">
        <div className="md:col-span-2 space-y-3">
          <Badge className="bg-spartan text-white shadow">Breaking</Badge>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            {article.title}
          </h2>
          <p className="text-muted-foreground">
            {article.blurb}
          </p>
          <div className="flex gap-3 pt-1">
            <Button asChild className="bg-spartan hover:bg-spartan-strong">
              <a
                href={`/?page=article&slug=${encodeURIComponent(article.slug)}`}
                onClick={(e) => handleLinkClick(e, `/?page=article&slug=${encodeURIComponent(article.slug)}`)}
              >
                Read the story
              </a>
            </Button>
            <Button asChild variant="outline" className="glass-button">
              <a
                href="https://forms.gle/udmDvnCaALBYcWwD6"
                target="_blank"
                rel="noreferrer"
              >
                Submit a Tip
              </a>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl glass-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm font-semibold">What is this</p>
          </div>
          <p className="text-sm text-muted-foreground">
            "All articles (might be) fictional satire created for a class project."
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-spartan-soft bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-spartan text-white grid place-items-center">
              <BeeIcon className="text-base" />
            </div>
            <span className="font-bold">The Skyline Bee</span>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Parody publication. Not affiliated with Skyline High School, Issaquah School District, or any official organization. For entertainment only.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold mb-2">Contact</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><a href="mailto:sussystudent26@gmail.com">sussystudent26@gmail.com</a></li>
            <li><a href="mailto:sussystudent26@gmail.com">sussystudent26@gmail.com</a></li>
            <li><a href="mailto:sussystudent26@gmail.com">sussystudent26@gmail.com</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold mb-2">Policies</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Satire and Parody Disclaimer</li>
            <li>Corrections</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground pb-6">© {new Date().getFullYear()} The Skyline Bee</div>
    </footer>
  );
}

export type { Category, Post };

export default function SkylineBee() {
  const [query, setQuery] = useState("");

  const posts = useMemo(() => filterPosts(ARTICLES, "All", query), [query]);
  const heroArticle = useMemo(
    () => ARTICLES.find((article) => article.slug === "flagpole-sptv-intro") ?? ARTICLES[0],
    [],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // --- Runtime tests (basic) ---
  useEffect(() => {
    try {
      // 1) All + empty returns all
      console.assert(filterPosts(ARTICLES, "All", "").length === ARTICLES.length, "Test 1 failed: All should return all posts");
      // 2) Category filter works
      console.assert(filterPosts(ARTICLES, "Sports", "").length === 1, "Test 2 failed: Sports should return 1 post");
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
        <Header onSearch={setQuery} query={query} />
        <Hero article={heroArticle} />

        <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="rounded-2xl border border-spartan-soft bg-spartan-deep text-white backdrop-blur p-6 shadow-sm">
            <h3 className="font-bold text-lg">Submit a headline</h3>
            <p className="text-sm text-white-soft mt-1">
              Send ideas, tips, or fully written satire through{" "}
              <a
                className="underline"
                href="https://forms.gle/udmDvnCaALBYcWwD6"
                target="_blank"
                rel="noreferrer"
              >
                this form
              </a>
              .
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
