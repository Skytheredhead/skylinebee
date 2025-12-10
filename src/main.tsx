import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SkylineBee from "./pages/SkylineBee";
import SkylineBeeArticlePage from "./pages/SkylineBeeArticlePage";

const url = new URL(window.location.href);
const pathname = url.pathname.toLowerCase();
const hash = url.hash.toLowerCase();
const viewParam = url.searchParams.get("page")?.toLowerCase();
const isArticle =
  pathname.includes("article") ||
  viewParam === "article" ||
  hash.includes("article");

const RootComponent = isArticle ? SkylineBeeArticlePage : SkylineBee;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>,
);
