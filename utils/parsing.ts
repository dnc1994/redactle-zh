import TurndownService from "turndown";
import { parse } from "node-html-parser";

const turndownService = new TurndownService();

export const convertToMarkdown = (htmlContent: string): string => {
  return turndownService.turndown(htmlContent);
};

const elementsToRemove = [
  "audio",
  "video",
  "img",
  "iframe",
  //
  "#toc",
  ".API.nowrap", // Phonetical pronunciation
  ".extiw",
  ".gallery",
  ".hatnote",
  ".infobox",
  ".metadata",
  ".mw-editsection",
  ".mw-empty-elt",
  ".noprint",
  ".reference",
  ".reference-cadre",
  ".thumb",
  ".wikitable",
  "style",
  "sup.reference",
  // From source code of the original game
  "[rel='mw-deduplicated-inline-style']",
  "[title='Name at birth']",
  "[aria-labelledby='micro-periodic-table-title']",
  ".barbox",
  ".clade",
  ".Expand_section",
  ".nowrap",
  ".IPA",
  ".mw-empty-elt",
  ".mw-editsection",
  ".nounderlines",
  ".nomobile",
  ".searchaux",
  ".sidebar",
  ".sistersitebox",
  ".noexcerpt",
  ".haudio",
  ".portalbox",
  ".mw-references-wrap",
  ".unsolved",
  ".navbox",
  ".refbegin",
  ".reflist",
  ".collapsible",
  ".uncollapsed",
  ".mw-collapsible",
  ".mw-made-collapsible",
  ".mbox-small",
  ".mbox",
  ".succession-box",
  ".mwe-math-element",
  ".cs1-ws-icon",
  // Chinese version of element IDs
  "#相关条目",
  "#注释",
  "#参考文献",
  "#外部链接",
];
const elementsToStripAfter = [
  "h2 #相关条目",
  "h2 #注释",
  "h2 #参考文献",
  "h2 #外部链接",
];
const elementsToFlatten = ["a", "abbr", "b", "i", "span", "sup", "time"];

/**
 * Remove extra elements from the Wikipedia article. Only remaining HTML tags after stripping are:
 * <p>, <blockquote>, <h1>, <h2>, <h3>, <h4>, <ul>, <li>
 * @param rawContent The raw HTML content of the Wikipedia article
 */
export const stripArticle = (rawContent: string): string => {
  let content = parse(rawContent);
  content?.querySelectorAll(elementsToRemove.join(",")).forEach((element) => {
    element.remove();
  });

  // TODO: This doesn't seem to work, at least not for 注释 / 相关条目 / 外部链接
  elementsToStripAfter.forEach((selector) => {
    const element = content?.querySelector(selector)?.parentNode;
    while (element?.nextElementSibling) {
      element?.nextElementSibling.remove();
    }
    element?.remove();
  });

  content?.querySelectorAll(elementsToFlatten.join(",")).forEach((element) => {
    element.replaceWith(element.innerText);
  });

  content?.querySelectorAll(".mw-parser-output").forEach((element) => {
    element.replaceWith(element.innerHTML);
  });

  content?.querySelector("#相关条目")?.closest("h2")?.remove();
  return (content || "").toString();
};
