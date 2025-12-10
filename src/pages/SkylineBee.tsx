import React, { useMemo, useState, useEffect } from "react";
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

const STARTER_POSTS = [
  {
    id: 1,
    title: "School wifi achieves Mach 3 when no one needs it",
    blurb: "District engineers confirm the network is fastest during finals only after midnight.",
    category: "Campus",
    author: "Staff",
    date: "Dec 10, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-1/1280/720",
  },
  {
    id: 2,
    title: "Spartans unveil revolutionary new play: Give it to the fast kid",
    blurb: "Coaches cite cutting edge analytics and a stopwatch.",
    category: "Sports",
    author: "Sports Desk",
    date: "Dec 8, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-2/1280/720",
  },
  {
    id: 3,
    title: "Lunch line introduces express lane for kids with exact change",
    blurb: "Pilot program reduces wait time to just three bells.",
    category: "Campus",
    author: "Cafeteria Correspondent",
    date: "Dec 6, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-3/1280/720",
  },
  {
    id: 4,
    title: "Parking lot adds arrows as friendly suggestions",
    blurb: "Administration clarifies that arrows are more of a vibe than a rule.",
    category: "Opinion",
    author: "Editorial Board",
    date: "Dec 3, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-4/1280/720",
  },
  {
    id: 5,
    title: "New AI policy bans using robots to do push ups in PE",
    blurb: "Students disappointed after brief golden age of perfect grades and strong biceps.",
    category: "Tech",
    author: "Tech Desk",
    date: "Nov 30, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-5/1280/720",
  },
  {
    id: 6,
    title: "Counselors announce stress relief week. Homework celebrates by doubling",
    blurb: "Teachers say it builds character. Students say it builds eye bags.",
    category: "Opinion",
    author: "Guest Columnist",
    date: "Nov 28, 2025",
    imageUrl: "https://picsum.photos/seed/skyline-bee-6/1280/720",
  },
];

const CATEGORIES = ["All", "Campus", "Sports", "Opinion", "Tech"] as const;

export type Category = typeof CATEGORIES[number];

export type Post = (typeof STARTER_POSTS)[number];

export function filterPosts(posts: Post[], active: Category, query: string): Post[] {
  const q = query.trim().toLowerCase();
  return posts.filter((p) =>
    (active === "All" || p.category === active) &&
    (q.length === 0 || p.title.toLowerCase().includes(q) || p.blurb.toLowerCase().includes(q))
  );
}

function Header({ onSearch, query }: { onSearch: (q: string) => void; query: string }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 py-3">
          <div className="h-10 w-10 rounded-full bg-emerald-600 text-white grid place-items-center shadow">
            <BeeIcon className="text-lg" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tight leading-5">The Skyline Bee</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 w-full max-w-sm">
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
    <nav className="border-b bg-emerald-50/60">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex gap-2 py-2 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <Button
                variant={active === c ? "default" : "outline"}
                className={active === c ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-white"}
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
    <Card className="hover:shadow-lg transition border border-emerald-100 overflow-hidden">
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
          <Badge className="bg-emerald-600 text-white">{post.category}</Badge>
          <span className="text-xs text-muted-foreground">{post.date}</span>
        </div>
        <h3 className="text-xl font-bold leading-snug">{post.title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{post.blurb}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-muted-foreground">By {post.author}</span>
          <Button variant="ghost" size="sm" className="gap-1">
            Read
            <ChevronRightIcon className="text-sm" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 to-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Breaking: Skyline installs new bell that respects human ears
          </h2>
          <p className="text-muted-foreground mt-3">
            Trials begin Monday. Early reports suggest students still late, but in a calmer way.
          </p>
          <div className="flex gap-3 mt-5">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Latest Stories</Button>
            <Button asChild variant="outline">
              <a href="mailto:skytheredhead@gmail.com?subject=Skyline%20Bee%20Tip">Submit a Tip</a>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
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
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-emerald-600 text-white grid place-items-center">
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

export default function SkylineBee() {
  const [active, setActive] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const posts = useMemo(() => filterPosts(STARTER_POSTS, active, query), [active, query]);

  useEffect(() => {
    try {
      console.assert(filterPosts(STARTER_POSTS, "All", "").length === STARTER_POSTS.length, "Test 1 failed: All should return all posts");
      console.assert(filterPosts(STARTER_POSTS, "Sports", "").length === 1, "Test 2 failed: Sports should return 1 post");
      console.assert(filterPosts(STARTER_POSTS, "All", "Express").length === 1, "Test 3 failed: query 'Express' should match 1 post");
      console.assert(filterPosts(STARTER_POSTS, "Opinion", "Homework").length === 1, "Test 4 failed: Opinion + 'Homework' should match 1 post");
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
        <div className="rounded-2xl border bg-emerald-50/60 p-6">
          <h3 className="font-bold text-lg">Submit a headline</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Send ideas, tips, or fully written satire to <a className="underline" href="mailto:skytheredhead@gmail.com">skytheredhead@gmail.com</a>.
          </p>
          <div className="flex gap-3 mt-4">
            <Input placeholder="Pitch your best headline" />
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <a href="mailto:skytheredhead@gmail.com?subject=Skyline%20Bee%20Headline%20Pitch">Send</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
