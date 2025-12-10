import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SkylineBee from "./pages/SkylineBee";
import SkylineBeeArticlePage from "./pages/SkylineBeeArticlePage";

const pathname = window.location.pathname.toLowerCase();
const isArticle = pathname.includes("article");
const RootComponent = isArticle ? SkylineBeeArticlePage : SkylineBee;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>,
);
