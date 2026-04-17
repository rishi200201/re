import { useEffect } from "react";

function upsertMeta(selector, attr, value) {
  if (!value) return;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const match = selector.match(/\[([^=]+)="([^"]+)"\]/);
    if (!match) return;
    const [attrName, attrValue] = match.slice(1);
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({ title, description, keywords, url, ogTitle, ogDescription, ogImage, ogType = "website" }) {
  useEffect(() => {
    if (title) document.title = title;

    const og = ogTitle || title || "";
    const ogDesc = ogDescription || description || "";

    upsertMeta('meta[name="description"]', "content", description);
    upsertMeta('meta[name="keywords"]', "content", keywords);

    upsertLink("canonical", url);

    upsertMeta('meta[property="og:title"]', "content", og);
    upsertMeta('meta[property="og:description"]', "content", ogDesc);
    upsertMeta('meta[property="og:url"]', "content", url);
    upsertMeta('meta[property="og:type"]', "content", ogType);
    upsertMeta('meta[property="og:image"]', "content", ogImage);

    upsertMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "content", og);
    upsertMeta('meta[name="twitter:description"]', "content", ogDesc);
    upsertMeta('meta[name="twitter:image"]', "content", ogImage);
  }, [title, description, keywords, url, ogTitle, ogDescription, ogImage, ogType]);
}
