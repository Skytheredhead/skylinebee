import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

function Icon({ label, glyph, className = "" }: { label: string; glyph: string; className?: string }) {
  return (
    <span role="img" aria-label={label} className={`inline-block align-middle ${className}`}>
      {glyph}
    </span>
  );
}

const BeeIcon = (p: { className?: string }) => <Icon label="bee" glyph="🐝" className={p.className} />;
const NewspaperIcon = (p: { className?: string }) => <Icon label="newspaper" glyph="📰" className={p.className} />;

type Article = {
  title: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  body: string[];
};

const SAMPLE_ARTICLE: Article = {
  title: "Skyline announces new policy: Phones must be at least 30 percent charged",
  category: "Opinion",
  author: "Editorial Board",
  date: "Dec 10, 2025",
  imageUrl: "https://picsum.photos/seed/skyline-article-1/1280/720",
  body: [
    "In a bold move that nobody asked for, Skyline administration has introduced a brand new rule: phones brought to school must have at least thirty percent battery when students walk through the doors.",
    "According to a fictional memo, the decision came after an internal study showed that the number one cause of student distress was not grades, college applications, or the parking lot, but the moment their phone hit one percent in the middle of third period.",
    "The policy states that staff may conduct random 'battery checks' before class. Students below the thirty percent threshold will be briefly escorted to a designated 'charging reflection space' to think about their life choices while their phone sits in a power strip.",
    "Critics argue that the new rule raises serious questions. Will there be a backup plan for students whose screen time report is already embarrassing. Will the Chromebooks be jealous of all the attention the wall outlets are about to get.",
    "Supporters of the policy say it promotes responsibility, planning ahead, and finally remembering to plug in your phone before falling asleep watching short form videos that you pretend are educational.",
    "At press time, sources confirmed that the school wifi still drops to prehistoric speeds the second anyone actually tries to load something important."
  ]
};

function Header() {
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
              placeholder="Search headlines"
              className="h-9"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-white mt-10">
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
      <div className="text-center text-xs text-muted-foreground pb-6">
        © {new Date().getFullYear()} The Skyline Bee
      </div>
    </footer>
  );
}

function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
      <Badge className="bg-emerald-600 text-white">{article.category}</Badge>
      <span>•</span>
      <span>{article.date}</span>
      <span>•</span>
      <span>By {article.author}</span>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="mt-10 md:mt-0 md:pl-8 md:border-l md:border-emerald-100">
      <Card className="border-emerald-100 bg-emerald-50/60">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <NewspaperIcon className="text-base" />
            <p className="text-sm font-semibold">About The Skyline Bee</p>
          </div>
          <p className="text-xs text-muted-foreground">
            The Skyline Bee is satire, parody, and humor. We are not a real news site. Names, places, and events are used playfully for laughs.
          </p>
        </CardContent>
      </Card>

      <div className="mt-6">
        <p className="text-sm font-semibold mb-2">More stories</p>
        <ul className="space-y-2 text-sm text-emerald-900">
          <li className="border-b border-emerald-100 pb-2">
            Spartans unveil revolutionary new play: Give it to the fast kid
          </li>
          <li className="border-b border-emerald-100 pb-2">
            Lunch line introduces express lane for kids with exact change
          </li>
          <li className="pb-2">
            Counselors announce stress relief week. Homework celebrates by doubling
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold mb-2">Send us your ideas</p>
        <p className="text-xs text-muted-foreground">
          Have a headline that belongs here. Email{" "}
          <a href="mailto:skytheredhead@gmail.com" className="underline">
            skytheredhead@gmail.com
          </a>{" "}
          with your very best satire.
        </p>
      </div>
    </aside>
  );
}

export default function SkylineBeeArticlePage() {
  const article = SAMPLE_ARTICLE;

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Header />

      <div className="border-b bg-emerald-50/60">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Button asChild variant="ghost" className="px-0 text-base md:text-lg font-semibold">
            <a href="/" className="flex items-center gap-2">
              <ChevronLeft className="h-5 w-5" />
              <span>Back to headlines</span>
            </a>
          </Button>
        </div>
      </div>

      <article className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] gap-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="mt-3">
              <ArticleMeta article={article} />
            </div>

            <div className="mt-4 rounded-2xl overflow-hidden border border-emerald-100">
              <img
                src={article.imageUrl}
                alt={article.title}
                width={1280}
                height={720}
                className="w-full aspect-video object-cover"
              />
            </div>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-900">
              {article.body.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="mt-10 border-t pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>
                This piece is satire.
              </span>
              <Button asChild variant="outline" size="sm" className="h-8 px-3 text-xs">
                <a href="mailto:skytheredhead@gmail.com?subject=Letter%20to%20the%20Skyline%20Bee">
                  Send a letter to the editor
                </a>
              </Button>
            </div>
          </div>

          <Sidebar />
        </div>
      </article>

      <Footer />
    </main>
  );
}
