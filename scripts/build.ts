import { mkdir, writeFile } from "fs/promises";
import path from "path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import SkylineBee from "../src/pages/SkylineBee";
import SkylineBeeArticlePage from "../src/pages/SkylineBeeArticlePage";

function wrapPage(html: string, { title }: { title: string }) {
  return "<!DOCTYPE html>" +
    renderToStaticMarkup(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <style>
            {`body { margin: 0; font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif; background: #fff; }
              * { box-sizing: border-box; }
            `}
          </style>
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
        </body>
      </html>
    );
}

async function writePage(filename: string, content: string) {
  const outDir = path.join(process.cwd(), "public");
  await mkdir(outDir, { recursive: true });
  const filePath = path.join(outDir, filename);
  await writeFile(filePath, content, "utf8");
  return filePath;
}

async function build() {
  const landing = wrapPage(renderToStaticMarkup(<SkylineBee />), {
    title: "The Skyline Bee – Headlines",
  });
  const article = wrapPage(renderToStaticMarkup(<SkylineBeeArticlePage />), {
    title: "The Skyline Bee – Article",
  });

  const landingPath = await writePage("index.html", landing);
  const articlePath = await writePage("article.html", article);

  console.log(`Wrote ${landingPath}`);
  console.log(`Wrote ${articlePath}`);
}

build().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
