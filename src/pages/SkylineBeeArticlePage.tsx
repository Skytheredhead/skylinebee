import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Article, ARTICLES, getArticleBySlugOrId } from "./articleData";
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
  const dailyFeatured = getDailyShuffle(ARTICLES)[0];
  const breakingTitle = dailyFeatured?.title ?? "Top stories";

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
            <Input
              placeholder="Search headlines"
              className="h-8 text-xs border-0 surface-input max-w-[190px] ml-auto"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
          {["Campus", "Sports", "Opinion"].map((item) => {
            const href = `/?category=${encodeURIComponent(item)}`;
            return (
              <a
                key={item}
                href={href}
                onClick={(e) => handleLinkClick(e, href)}
                className="transition-colors hover:text-spartan"
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

function Footer() {
  return (
    <footer className="border-t border-spartan-soft bg-white mt-10">
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
      <div className="text-center text-xs text-neutral-500 pb-6">
        © {new Date().getFullYear()} The Skyline Bee
      </div>
    </footer>
  );
}

function ArticleMeta({ article }: { article: Article }) {
  const timestamp = formatTimestamp(article.date, article.slug);
  const readingTime = getReadingTime(article.body);
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
      <span className="text-spartan font-semibold uppercase tracking-wide">{article.category}</span>
      <span>•</span>
      <span>{timestamp}</span>
      <span>•</span>
      <span>{readingTime}</span>
      <span className="inline-flex items-center gap-2">
        <span className="h-6 w-6 rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-700 grid place-items-center">
          {getInitials(article.author)}
        </span>
        By {article.author}
      </span>
    </div>
  );
}

function Sidebar({ currentSlug }: { currentSlug: string }) {
  const trendingArticles = ARTICLES
    .filter((story) => story.slug !== currentSlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <aside className="mt-10 md:mt-0 md:pl-8 md:w-80 lg:w-96 shrink-0 h-full">
      <div className="flex flex-col h-full gap-4">
        <div className="rounded-2xl surface-card p-4 flex-1">
          <p className="text-sm font-semibold">Trending Articles</p>
          <div className="h-px bg-black/80 my-3" />

          <div className="space-y-3">
          {trendingArticles.map((story) => {
            const timestamp = formatTimestamp(story.date, story.slug);
            const readingTime = getReadingTime(story.body);
            return (
            <a
              key={story.slug}
              href={`/?page=article&slug=${encodeURIComponent(story.slug)}`}
              onClick={(e) => handleLinkClick(e, `/?page=article&slug=${encodeURIComponent(story.slug)}`)}
              className="group block focus-ring-spartan rounded-2xl"
            >
              <div className="flex gap-3 items-center rounded-2xl surface-card-muted card-animate p-3">
                  <div className="h-20 w-24 rounded-xl overflow-hidden">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      width={1280}
                      height={720}
                      className="h-full w-full object-cover card-media"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-neutral-500">
                    <span className="font-semibold text-spartan">{story.category}</span>
                    <span className="opacity-60">•</span>
                    <span>{timestamp}</span>
                  </div>
                  <h3 className="text-sm font-semibold leading-snug group-hover:text-spartan transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs text-neutral-500">{story.blurb}</p>
                  <span className="text-[11px] text-neutral-400">{readingTime}</span>
                </div>
              </div>
            </a>
          );
          })}
        </div>
        </div>

        <div className="rounded-2xl surface-card p-4 flex-1">
          <p className="text-sm font-semibold mb-2">Send us your ideas</p>
          <p className="text-xs text-neutral-500">
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

        <div className="bar-glass">
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
          <div className="flex flex-col md:flex-row md:items-stretch md:gap-6 lg:gap-8">
            <div
              className="md:min-w-0 md:flex-1 rounded-2xl surface-card p-6 md:p-7 h-full"
              style={{ viewTransitionName: `card-${article.slug}` } as React.CSSProperties}
            >
              <h1 className="text-3xl md:text-4xl font-black headline-font headline-tight">
                {article.title}
              </h1>

              <div className="mt-3 py-2">
                <ArticleMeta article={article} />
              </div>

              <div
                className="mt-4 rounded-2xl overflow-hidden surface-card article-hero max-w-3xl mx-auto"
                style={{ viewTransitionName: `image-${article.slug}` } as React.CSSProperties}
              >
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
