import React, { useMemo, useState, useEffect } from "react";
// Icons kept dependency-free
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

function Icon({ label, glyph, className = "" }: { label: string; glyph: string; className?: string }) {
  return (
    <span role="img" aria-label={label} className={`inline-block align-middle ${className}`}>
      {glyph}
    </span>
  );
}
const BeeIcon = (p: { className?: string }) => <Icon label="bee" glyph="🐝" className={p.className} />;
const NewspaperIcon = (p: { className?: string }) => <Icon label="newspaper" glyph="📰" className={p.className} />;
const ChevronRightIcon = (p: { className?: string }) => <Icon label="arrow" glyph="➡️" className={p.className} />;

// --- Data ---
const STARTER_POSTS = [
  {
    id: 1,
    title: "Group projects prove democracy was a mistake",
    blurb: "Majority votes to do nothing.",
    category: "Opinion",
    author: "Staff",
    date: "Dec 10, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-101/1280/720",
  },
  {
    id: 2,
    title: "Club fair produces record number of signups",
    blurb: "Attendance drops to executive board only.",
    category: "Campus",
    author: "Campus Desk",
    date: "Dec 8, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-102/1280/720",
  },
  {
    id: 3,
    title: "Senioritis officially upgraded to chronic condition",
    blurb: "\"I’ve had this since sophomore year\".",
    category: "Opinion",
    author: "Editorial Board",
    date: "Dec 6, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-103/1280/720",
  },
  {
    id: 4,
    title: "Parking lot etiquette reaches historic low",
    blurb: "Drivers consider using turn signals for the first time.",
    category: "Sports",
    author: "Automotive Enthusiast",
    date: "Dec 3, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-104/1280/720",
  },
  {
    id: 5,
    title: "Bathrooms updated with missing soap dispensers",
    blurb: "Why are children breaking them off the walls?",
    category: "Tech",
    author: "Facilities Beat",
    date: "Nov 30, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-105/1280/720",
  },
  {
    id: 6,
    title: "Skyline student licks flagpole for 30 minutes during lunch??",
    blurb: "He says it’s for an SPTV intro.",
    category: "Campus",
    author: "Onlooker",
    date: "Nov 28, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-106/1280/720",
  },
];

const CATEGORIES = ["All", "Campus", "Sports", "Opinion", "Tech"] as const;

type Category = typeof CATEGORIES[number];

type Post = (typeof STARTER_POSTS)[number];

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
    <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-spartan-soft">
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

function Nav({ active, setActive }: { active: Category; setActive: (c: Category) => void }) {
  return (
    <nav className="border-b border-spartan-soft bg-spartan-tint">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex gap-2 py-2 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <Button
                variant={active === c ? "default" : "outline"}
                className={active === c ? "bg-spartan hover:bg-spartan-strong text-white" : "bg-white"}
                onClick={() => setActive(c)}
                size="sm"
              >
                {c}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <a
      href="/article"
      className="block group focus-ring-spartan rounded-2xl"
      aria-label={`Read ${post.title}`}
    >
      <Card className="hover:shadow-lg transition border border-spartan-soft overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          width={1280}
          height={720}
          className="w-full aspect-video object-cover"
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
              <ChevronRightIcon className="text-base" />
            </span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-br from-[var(--spartan-50)] to-white border-b border-spartan-soft">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Breaking: Skyline installs new bell that respects human ears
          </h2>
          <p className="text-muted-foreground mt-3">
            Trials begin Monday. Early reports suggest students still late, but in a calmer way.
          </p>
          <div className="flex gap-3 mt-5">
            <Button className="bg-spartan hover:bg-spartan-strong">Latest Stories</Button>
            <Button asChild variant="outline">
              <a href="mailto:skytheredhead@gmail.com?subject=Skyline%20Bee%20Tip">Submit a Tip</a>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-spartan-soft bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <NewspaperIcon className="text-base" />
            <p className="text-sm font-semibold">What is this</p>
          </div>
          <p className="text-sm text-muted-foreground">
            The Skyline Bee is satire, parody, and humor. We are not a real news site. Names, places, and events are used playfully for laughs.
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
            <li><a href="mailto:skytheredhead@gmail.com">tips@skylinebee</a></li>
            <li><a href="mailto:skytheredhead@gmail.com">ads@skylinebee</a></li>
            <li><a href="mailto:skytheredhead@gmail.com">submissions@skylinebee</a></li>
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
  const [active, setActive] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const posts = useMemo(() => filterPosts(STARTER_POSTS, active, query), [active, query]);

  // --- Runtime tests (basic) ---
  useEffect(() => {
    try {
      // 1) All + empty returns all
      console.assert(filterPosts(STARTER_POSTS, "All", "").length === STARTER_POSTS.length, "Test 1 failed: All should return all posts");
      // 2) Category filter works
      console.assert(filterPosts(STARTER_POSTS, "Sports", "").length === 1, "Test 2 failed: Sports should return 1 post");
      // 3) Query filter is case-insensitive
      console.assert(filterPosts(STARTER_POSTS, "All", "flagpole").length === 1, "Test 3 failed: query 'flagpole' should match 1 post");
      // 4) Combined filter
      console.assert(filterPosts(STARTER_POSTS, "Opinion", "democracy").length === 1, "Test 4 failed: Opinion + 'democracy' should match 1 post");
      // 5) Every post has a 1280x720 placeholder image URL
      console.assert(STARTER_POSTS.every(p => typeof p.imageUrl === "string" && /\/1280\/720$/.test(p.imageUrl)), "Test 5 failed: All posts should include 1280/720 imageUrl");
    } catch (e) {
      console.error("Runtime tests raised an error", e);
    }
  }, []);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Header onSearch={setQuery} query={query} />
      <Nav active={active} setActive={setActive} />
      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="rounded-2xl border border-spartan-soft bg-spartan-soft p-6">
          <h3 className="font-bold text-lg">Submit a headline</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Send ideas, tips, or fully written satire to <a className="underline" href="mailto:skytheredhead@gmail.com">skytheredhead@gmail.com</a>.
          </p>
          <div className="flex gap-3 mt-4">
            <Input placeholder="Pitch your best headline" />
            <Button asChild className="bg-spartan hover:bg-spartan-strong">
              <a href="mailto:skytheredhead@gmail.com?subject=Skyline%20Bee%20Headline%20Pitch">Send</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
