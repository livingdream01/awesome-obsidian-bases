#!/usr/bin/env node
/**
 * build-site — render README.md into a static index.html for GitHub Pages.
 *
 * Zero dependencies. Run after editing the README:
 *   node scripts/build-site.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const md = readFileSync(join(ROOT, "README.md"), "utf-8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function inline(s) {
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" class="inline-block">');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, h) => {
    const ext = /^https?:/.test(h);
    return `<a href="${h}"${ext ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`;
  });
  s = s.replace(/`([^`]+)`/g, '<code class="rounded bg-stone-100 px-1 py-0.5 text-[.8em]">$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return s;
}

const slug = (s) => s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

const lines = md.split("\n");
const body = [];
const toc = [];
let inCode = false, code = [], para = [], list = [];
let inContents = false;

const flushPara = () => { if (para.length) { body.push(`<p>${inline(para.join(" "))}</p>`); para = []; } };
const flushList = () => { if (list.length) { body.push(`<ul>${list.map((l) => `<li>${inline(l)}</li>`).join("")}</ul>`); list = []; } };

for (const raw of lines) {
  const line = raw.replace(/\s+$/, "");
  if (line.startsWith("```")) {
    flushPara(); flushList();
    if (!inCode) { inCode = true; code = []; }
    else { inCode = false; body.push(`<pre><code>${esc(code.join("\n"))}</code></pre>`); }
    continue;
  }
  if (inCode) { code.push(raw); continue; }

  if (/^# /.test(line) || /^\[\!\[/.test(line)) continue; // title + badges handled by the page shell
  if (/^</.test(line)) { flushPara(); flushList(); continue; } // raw HTML (banner etc.) handled by the shell

  if (/^## /.test(line)) {
    flushPara(); flushList();
    const t = line.slice(3).trim();
    if (/contents/i.test(t)) { inContents = true; continue; } // nav replaces it
    inContents = false;
    const id = slug(t);
    toc.push({ id, t });
    body.push(`<h2 id="${id}">${inline(t)}</h2>`);
    continue;
  }
  if (inContents) continue;
  if (/^### /.test(line)) { flushPara(); flushList(); body.push(`<h3>${inline(line.slice(4))}</h3>`); continue; }
  if (/^> /.test(line)) { flushPara(); flushList(); body.push(`<blockquote>${inline(line.slice(2))}</blockquote>`); continue; }
  if (/^- /.test(line)) { flushPara(); list.push(line.slice(2)); continue; }
  if (line.trim() === "") { flushPara(); flushList(); continue; }
  para.push(line);
}
flushPara(); flushList();

const nav = toc.map(({ id, t }) => `<a href="#${id}" class="block py-1 text-sm text-stone-600 hover:text-emerald-700">${t}</a>`).join("");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Awesome Obsidian Bases</title>
<meta name="description" content="A curated list of everything built on Obsidian Bases: views, plugins, starter vaults, agent tooling and examples.">
<meta property="og:title" content="Awesome Obsidian Bases">
<meta property="og:image" content="assets/banner.svg">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body{background:#fafaf9;color:#0f172a;-webkit-font-smoothing:antialiased}
  .prose h2{font-family:Georgia,serif;font-size:1.5rem;margin:2.2rem 0 .6rem;padding-top:.4rem}
  .prose h3{font-weight:600;margin:1.4rem 0 .4rem}
  .prose p{margin:.6rem 0;color:#334155;line-height:1.7}
  .prose ul{margin:.4rem 0 1rem 1.1rem;list-style:disc}
  .prose li{margin:.3rem 0;color:#334155}
  .prose li::marker{color:#a8a29e}
  .prose a{color:#047857;text-decoration:none;font-weight:500}
  .prose a:hover{text-decoration:underline}
  .prose code{font-family:ui-monospace,Menlo,monospace}
  .prose pre{background:#0f172a;color:#e2e8f0;padding:1rem;border-radius:.6rem;overflow:auto;font-size:.82rem;margin:1rem 0}
  .prose pre code{background:none;color:inherit}
  .prose blockquote{border-left:3px solid #d6d3d1;padding-left:1rem;color:#57534e;margin:.8rem 0}
  .prose img{max-width:100%;border-radius:.5rem}
</style>
</head>
<body>
<header class="max-w-5xl mx-auto px-5 pt-8">
  <h1 class="sr-only">Awesome Obsidian Bases</h1>
  <img src="assets/banner.svg" alt="Awesome Obsidian Bases" class="w-full rounded-xl shadow-sm">
  <div class="mt-4 flex flex-wrap items-center gap-3 text-sm">
    <a href="https://github.com/livingdream01/awesome-obsidian-bases" class="rounded-lg bg-stone-900 text-white px-4 py-2 font-medium">View on GitHub</a>
    <a href="https://github.com/livingdream01/awesome-obsidian-bases/stargazers" class="rounded-lg border border-stone-300 px-4 py-2">★ Star</a>
    <span class="text-stone-500">CC0 · verified links · updated weekly</span>
  </div>
</header>
<main class="max-w-5xl mx-auto px-5 py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10">
  <nav class="hidden md:block sticky top-8 self-start">
    <div class="text-xs uppercase tracking-widest text-stone-400 mb-2">On this page</div>
    ${nav}
  </nav>
  <article class="prose max-w-none">
${body.join("\n")}
  </article>
</main>
<footer class="max-w-5xl mx-auto px-5 py-10 text-sm text-stone-500 border-t border-stone-200">
  Built from <a class="text-emerald-700" href="https://github.com/livingdream01/awesome-obsidian-bases/blob/main/README.md">README.md</a> · CC0-1.0 · contributions welcome.
</footer>
</body>
</html>`;

writeFileSync(join(ROOT, "index.html"), html);
console.log(`[build-site] index.html written (${html.length} bytes, ${toc.length} sections)`);
