import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Article, ARTICLES, getArticleBySlugOrId } from "./articleData";
import { handleLinkClick } from "@/utils/navigation";

function Icon({ label, glyph, className = "" }: { label: string; glyph: string; className?: string }) {
  return (
    <span role="img" aria-label={label} className={`inline-block align-middle ${className}`}>
      {glyph}
    </span>
  );
}

const BeeIcon = (p: { className?: string }) => <Icon label="bee" glyph="🐝" className={p.className} />;
const ChevronLeftIcon = ({ className = "" }: { className?: string }) => (
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
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

function Header() {
  return (
    <header className="sticky top-0 z-20 header-glass shadow-sm border-b border-spartan-soft">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 py-3">
          <div className="h-10 w-10 rounded-full bg-spartan text-white grid place-items-center shadow">
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
    <footer className="border-t border-spartan-soft bg-white mt-10">
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
          <p className="text-sm font-semibold mb-2">About The Skyline Bee</p>
          <p className="text-sm text-muted-foreground">
            "All articles (might be) fictional satire created for a class project."
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold mb-2">Contact</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><a href="mailto:sussystudent26@gmail.com">sussystudent26@gmail.com</a></li>
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
      <Badge className="bg-spartan text-white">{article.category}</Badge>
      <span>•</span>
      <span>{article.date}</span>
      <span>•</span>
      <span>By {article.author}</span>
    </div>
  );
}

function Sidebar({ currentSlug }: { currentSlug: string }) {
  const trendingArticles = ARTICLES
    .filter((story) => story.slug !== currentSlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <aside className="mt-10 md:mt-0 md:pl-8 md:border-l md:border-spartan-soft md:w-80 lg:w-96 shrink-0">
      <div className="mt-0 md:mt-6">
        <p className="text-sm font-semibold mb-3">Trending Articles</p>

        <div className="space-y-4">
          {trendingArticles.map((story) => (
            <a
              key={story.slug}
              href={`/?page=article&slug=${encodeURIComponent(story.slug)}`}
              onClick={(e) => handleLinkClick(e, `/?page=article&slug=${encodeURIComponent(story.slug)}`)}
              className="flex gap-3 group"
            >
              <div className="h-24 w-28 rounded-lg overflow-hidden border border-spartan-soft shadow-sm shadow-spartan/10">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-muted-foreground">
                  <span className="font-semibold text-spartan">{story.category}</span>
                  <span className="opacity-60">•</span>
                  <span>{story.date}</span>
                </div>
                <h3 className="text-sm font-semibold leading-snug group-hover:text-spartan transition-colors">
                  {story.title}
                </h3>
                <p className="text-xs text-muted-foreground">{story.blurb}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold mb-2">Send us your ideas</p>
        <p className="text-xs text-muted-foreground">
          Have a headline that belongs here. Share it through{" "}
          <a
            href="https://forms.gle/udmDvnCaALBYcWwD6"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            this form
          </a>{" "}
          with your very best satire.
        </p>
      </div>
    </aside>
  );
}

export default function SkylineBeeArticlePage() {
  const url = new URL(window.location.href);
  const article = getArticleBySlugOrId(url.searchParams.get("slug"), url.searchParams.get("id"));

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [article.slug]);

  return (
    <main className="page-aurora text-neutral-900 fade-in">
      <div className="page-shell">
        <Header />

        <div className="border-b border-spartan-soft bar-glass">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <Button asChild variant="ghost" className="px-0 text-base md:text-lg font-semibold">
              <a
                href="/"
                className="flex items-center gap-2"
                onClick={(e) => handleLinkClick(e, "/")}
              >
                <ChevronLeftIcon className="h-5 w-5" />
                <span>Back to headlines</span>
              </a>
            </Button>
          </div>
        </div>

        <article className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-start md:gap-10 lg:gap-12">
            <div className="md:min-w-0 md:flex-1">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                {article.title}
              </h1>

              <div className="mt-3">
                <ArticleMeta article={article} />
              </div>

              <div className="mt-4 rounded-2xl overflow-hidden border border-spartan-soft shadow-md shadow-spartan/10 max-w-3xl mx-auto">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  width={1280}
                  height={720}
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-900">
                {article.body.map((para, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </div>

            <Sidebar currentSlug={article.slug} />
          </div>
        </article>

        <Footer />
      </div>
    </main>
  );
}
