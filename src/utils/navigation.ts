import React from "react";

export function navigateTo(url: string) {
  if (typeof window === "undefined") return;
  window.history.pushState({}, "", url);
  window.dispatchEvent(new Event("popstate"));
}

export function handleLinkClick(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  href: string,
) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
    return;
  }

  event.preventDefault();
  navigateTo(href);
}
