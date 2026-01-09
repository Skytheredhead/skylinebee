import React, { useMemo, useState, useEffect } from "react";
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

function AuthorBadge({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs text-neutral-500 ${className}`}>
      <span className="h-6 w-6 rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-700 grid place-items-center">
        {getInitials(name)}
      </span>
      By {name}
    </span>
  );
}

const NAV_ITEMS: { label: string; value: Category }[] = [
  { label: "Home", value: "All" },
  { label: "Campus", value: "Campus" },
  { label: "Sports", value: "Sports" },
  { label: "Opinion", value: "Opinion" },
];

function Header({
  onSearch,
  query,
  activeCategory,
}: {
  onSearch: (q: string) => void;
  query: string;
  activeCategory: Category;
}) {
  const editionDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-20 header-glass">
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-1 text-[11px] text-neutral-600 flex flex-wrap gap-4 items-center">
          <span className="font-semibold text-neutral-800">{editionDate}</span>
          <span className="uppercase tracking-[0.2em] text-neutral-500">Skyline High School</span>
          <div className="ml-auto flex items-center gap-3 text-[11px]">
            <a className="text-spartan" href="#subscribe">Subscribe</a>
            <a className="text-spartan" href="#newsletter">Newsletter</a>
            <a
              className="text-spartan"
              href="https://forms.gle/udmDvnCaALBYcWwD6"
              target="_blank"
              rel="noreferrer"
            >
              Tip line
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 py-2">
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
              className="h-8 text-xs border border-neutral-300 bg-white max-w-[140px] ml-auto"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
          {NAV_ITEMS.map((item) => {
            const hrefValue = item.value === "All" ? "home" : item.value;
            const href = `/?category=${encodeURIComponent(hrefValue)}`;
            const isActive = activeCategory === item.value;
            return (
              <a
                key={item.label}
                href={href}
                onClick={(e) => handleLinkClick(e, href)}
                className={`${isActive ? "text-spartan" : "text-neutral-600"}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function LatestList({ posts }: { posts: Post[] }) {
  return (
    <div className="border-t border-neutral-200 pt-4 mt-6 lg:mt-0 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Latest</p>
        <span className="text-[11px] text-neutral-400">{posts.length} stories</span>
      </div>
      <div className="mt-4 space-y-4">
        {posts.map((post) => {
          const href = `/?page=article&slug=${encodeURIComponent(post.slug)}`;
          const timestamp = formatTimestamp(post.date, post.slug);
          const readingTime = getReadingTime(post.body);
          return (
            <a
              key={post.id}
              href={href}
              onClick={(e) => handleLinkClick(e, href)}
              className="block border-b border-neutral-200 pb-3 last:border-b-0 last:pb-0 focus-ring-spartan"
            >
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-neutral-500">
                <span className="font-semibold text-spartan">{post.category}</span>
                <span className="opacity-60">•</span>
                <span>{timestamp}</span>
              </div>
              <h3 className="mt-1 text-sm font-semibold leading-snug text-neutral-900">{post.title}</h3>
              <p className="text-xs text-neutral-600 mt-1">{post.blurb}</p>
              <div className="mt-2 flex items-center gap-2 text-[10px] text-neutral-500">
                <AuthorBadge name={post.author} className="text-[10px]" />
                <span>•</span>
                <span>{readingTime}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function Hero({ article, latest }: { article: Post; latest: Post[] }) {
  const timestamp = formatTimestamp(article.date, article.slug);
  const readingTime = getReadingTime(article.body);
  const photoCaption = `${article.category} coverage at Skyline High School.`;

  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 grid lg:grid-cols-12 gap-6 items-start">
        <a
          href={`/?page=article&slug=${encodeURIComponent(article.slug)}`}
          onClick={(e) => handleLinkClick(e, `/?page=article&slug=${encodeURIComponent(article.slug)}`)}
          className="lg:col-span-8 space-y-3 focus-ring-spartan group"
          aria-label={`Read ${article.title}`}
        >
          <div className="border border-neutral-200 overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              width={1280}
              height={720}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">
            <span className="font-semibold text-spartan">{article.category}</span>
            <span className="mx-1 opacity-60">•</span>
            <span>{timestamp}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black headline-font headline-tight group-hover:text-spartan transition-colors">
            {article.title}
          </h2>
          <p className="text-sm md:text-base text-neutral-700">
            {article.blurb}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500">
            <AuthorBadge name={article.author} className="text-[11px]" />
            <span>•</span>
            <span>{readingTime}</span>
          </div>
          <p className="text-[11px] text-neutral-500">
            <span className="font-semibold text-neutral-700">Caption:</span> {photoCaption}
            <span className="mx-1">•</span>
            <span className="font-semibold text-neutral-700">Credit:</span> Skyline Bee staff
          </p>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-spartan">Read more</span>
        </a>
        <div className="lg:col-span-4">
          <LatestList posts={latest} />
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
  if (value === "home" || value === "all") return "All";
  if (value === "campus") return "Campus";
  if (value === "sports") return "Sports";
  if (value === "opinion") return "Opinion";
  if (value === "tech") return "Tech";
  return "All";
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-black headline-font">{title}</h3>
      <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">Section</span>
    </div>
  );
}

function LeadStory({ post }: { post: Post }) {
  const href = `/?page=article&slug=${encodeURIComponent(post.slug)}`;
  const timestamp = formatTimestamp(post.date, post.slug);
  const readingTime = getReadingTime(post.body);

  return (
    <a
      href={href}
      onClick={(e) => handleLinkClick(e, href)}
      className="block focus-ring-spartan"
    >
      <div className="border border-neutral-200 overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          width={1280}
          height={720}
          className="w-full aspect-[16/9] object-cover"
          loading="lazy"
        />
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-wide text-neutral-500">
        <span className="font-semibold text-spartan">{post.category}</span>
        <span className="mx-1 opacity-60">•</span>
        <span>{timestamp}</span>
      </div>
      <h4 className="mt-2 text-xl font-bold headline-font headline-tight">{post.title}</h4>
      <p className="text-sm text-neutral-600 mt-2">{post.blurb}</p>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-neutral-500">
        <AuthorBadge name={post.author} className="text-[10px]" />
        <span>•</span>
        <span>{readingTime}</span>
      </div>
    </a>
  );
}

function CompactCard({ post }: { post: Post }) {
  const href = `/?page=article&slug=${encodeURIComponent(post.slug)}`;
  const timestamp = formatTimestamp(post.date, post.slug);
  const readingTime = getReadingTime(post.body);

  return (
    <a
      href={href}
      onClick={(e) => handleLinkClick(e, href)}
      className="block border border-neutral-200 p-3 focus-ring-spartan"
    >
      <div className="overflow-hidden border border-neutral-200">
        <img
          src={post.imageUrl}
          alt={post.title}
          width={1280}
          height={720}
          className="w-full aspect-[16/9] object-cover"
          loading="lazy"
        />
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-wide text-neutral-500">
        <span className="font-semibold text-spartan">{post.category}</span>
        <span className="mx-1 opacity-60">•</span>
        <span>{timestamp}</span>
      </div>
      <h5 className="mt-2 text-sm font-semibold leading-snug">{post.title}</h5>
      <p className="text-xs text-neutral-600 mt-2">{post.blurb}</p>
      <div className="mt-2 flex items-center gap-2 text-[10px] text-neutral-500">
        <AuthorBadge name={post.author} className="text-[10px]" />
        <span>•</span>
        <span>{readingTime}</span>
      </div>
    </a>
  );
}

function ListStory({ post }: { post: Post }) {
  const href = `/?page=article&slug=${encodeURIComponent(post.slug)}`;
  const timestamp = formatTimestamp(post.date, post.slug);
  const readingTime = getReadingTime(post.body);

  return (
    <a
      href={href}
      onClick={(e) => handleLinkClick(e, href)}
      className="block border-b border-neutral-200 pb-3 last:border-b-0 last:pb-0 focus-ring-spartan"
    >
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-neutral-500">
        <span className="font-semibold text-spartan">{post.category}</span>
        <span className="opacity-60">•</span>
        <span>{timestamp}</span>
      </div>
      <h5 className="mt-1 text-sm font-semibold leading-snug">{post.title}</h5>
      <p className="text-xs text-neutral-600 mt-1">{post.blurb}</p>
      <div className="mt-2 flex items-center gap-2 text-[10px] text-neutral-500">
        <AuthorBadge name={post.author} className="text-[10px]" />
        <span>•</span>
        <span>{readingTime}</span>
      </div>
    </a>
  );
}

function CategorySection({ title, posts }: { title: string; posts: Post[] }) {
  if (posts.length === 0) return null;
  const [lead, ...rest] = posts;
  const cardPosts = rest.slice(0, 2);
  const listPosts = rest.slice(2, 6);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 border-t border-neutral-200">
      <SectionHeader title={title} />
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <LeadStory post={lead} />
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {cardPosts.map((post) => (
            <CompactCard key={post.id} post={post} />
          ))}
          {listPosts.length > 0 && (
            <div className="sm:col-span-2 space-y-3">
              {listPosts.map((post) => (
                <ListStory key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function SkylineBee() {
  const [query, setQuery] = useState("");
  const url = new URL(window.location.href);
  const activeCategory = normalizeCategory(url.searchParams.get("category"));

  const dailyPosts = useMemo(() => getDailyShuffle(ARTICLES), []);
  const latestPosts = useMemo(
    () =>
      [...ARTICLES]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [],
  );
  const featured = dailyPosts[0];
  const filteredPosts = useMemo(
    () => filterPosts(dailyPosts, activeCategory, query),
    [dailyPosts, activeCategory, query],
  );
  const rest = featured ? filteredPosts.filter((post) => post.id !== featured.id) : filteredPosts;
  const latestColumn = latestPosts.filter((post) => post.id !== featured?.id).slice(0, 5);
  const trendingPosts = latestPosts.slice(0, 3);
  const campusPosts = rest.filter((post) => post.category === "Campus");
  const sportsPosts = rest.filter((post) => post.category === "Sports");
  const opinionPosts = rest.filter((post) => post.category === "Opinion");
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
        {featured && <Hero article={featured} latest={latestColumn} />}

        {trendingPosts.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 py-6 border-b border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-700">Most read / Trending</h3>
              <span className="text-[11px] text-neutral-400">Updated daily</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {trendingPosts.map((post) => {
                const href = `/?page=article&slug=${encodeURIComponent(post.slug)}`;
                const timestamp = formatTimestamp(post.date, post.slug);
                return (
                  <a
                    key={post.id}
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    className="block border border-neutral-200 p-3 focus-ring-spartan"
                  >
                    <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-neutral-500">
                      <span className="font-semibold text-spartan">{post.category}</span>
                      <span className="opacity-60">•</span>
                      <span>{timestamp}</span>
                    </div>
                    <h4 className="mt-2 text-sm font-semibold leading-snug">{post.title}</h4>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        <CategorySection title="Campus" posts={campusPosts} />
        <CategorySection title="Sports" posts={sportsPosts} />
        <CategorySection title="Opinion" posts={opinionPosts} />

        <Footer />
      </div>
    </main>
  );
}
