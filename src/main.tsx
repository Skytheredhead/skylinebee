import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SkylineBee from "./pages/SkylineBee";
import SkylineBeeArticlePage from "./pages/SkylineBeeArticlePage";

function useLocation() {
  const [href, setHref] = useState(window.location.href);

  useEffect(() => {
    const handlePopState = () => setHref(window.location.href);

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return new URL(href);
}

function App() {
  const url = useLocation();

  const pathname = url.pathname.toLowerCase();
  const hash = url.hash.toLowerCase();
  const viewParam = url.searchParams.get("page")?.toLowerCase();
  const isArticle =
    pathname.includes("article") ||
    viewParam === "article" ||
    hash.includes("article");

  const key = isArticle ? url.searchParams.get("slug") ?? url.searchParams.get("id") ?? "article" : "home";

  return isArticle ? <SkylineBeeArticlePage key={key} /> : <SkylineBee key={key} />;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
