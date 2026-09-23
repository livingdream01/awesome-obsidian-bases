<div align="center">

# Awesome Obsidian Bases

**A curated list of everything built on Obsidian [Bases](https://help.obsidian.md/bases) — the native, file-based database layer for your vault.**

Views · plugins · starter vaults · templates · agent tooling · formulas

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

**Bases** turns your Markdown notes into queryable tables, cards and views — no plugin, no database, no lock-in. It shipped as a core Obsidian feature and the ecosystem around it is *just getting started*. That is exactly why this list exists.

> Maintained by [@livingdream01](https://github.com/livingdream01). Found something great? [Add it](CONTRIBUTING.md).

## Contents

- [Official](#official)
- [What is Bases?](#what-is-bases)
- [Views & Layouts](#views--layouts)
- [Starter Vaults](#starter-vaults)
- [Agent skills and MCP](#agent-skills-and-mcp)
- [Related (not Bases-specific)](#related-not-bases-specific)
- [Guides & References](#guides--references)
- [Contributing](#contributing)

## Official

- [Bases documentation](https://help.obsidian.md/bases) — syntax, formulas, functions, views.
- [Bases syntax reference](https://help.obsidian.md/bases/syntax) — `.base` file structure: `filters`, `formulas`, `properties`, `views`.
- [Obsidian changelog](https://obsidian.md/changelog) — Bases ships as a core plugin; track what lands each release.

## What is Bases?

A `.base` file is a small YAML document that queries the notes in your vault by
their frontmatter and renders the result as a table, cards, or a map. No plugin,
no server — it is just a file.

```yaml
# People.base — everyone in the vault, grouped by org
filters:
  and:
    - type == "person"
properties:
  org:
    displayName: Org
  phone:
    displayName: Phone
views:
  - type: table
    name: People
    order:
      - file.name
      - org
      - phone
```

Point Obsidian at it and you have a live, sortable, filterable table over your
notes. This list collects the views, vaults and tools that make that better.

## Views & Layouts

- [obsidian-maps](https://github.com/obsidianmd/obsidian-maps) — map layout for Bases. Display notes as an interactive map. *(official)*
- [dynamic-views](https://github.com/churnish/dynamic-views) — elegant grid and masonry card views for Bases.

> Know a Bases view, renderer or layout plugin? [Open a PR](CONTRIBUTING.md).

## Starter Vaults

Vaults that use Bases out of the box — clone and go.

- [obsidian-vault-template (weiihann)](https://github.com/weiihann/obsidian-vault-template) — personal knowledge management starter using Categories, **Bases**, and Templater.
- [obsidian-lifecycle (alexmarnell)](https://github.com/alexmarnell/obsidian-lifecycle) — lifecycle-stage folders (Collect → Refine → Library) with Bases.
- [obsidian-workflow-starter (SeanYHan888)](https://github.com/SeanYHan888/obsidian-workflow-starter) — bilingual structure-only starter with daily capture and Bases.
- [ai-vault-contract (gexiro-global)](https://github.com/gexiro-global/ai-vault-contract) — a starter vault + write contract for AI-maintained knowledge bases.

## Agent skills and MCP

Tools that let an agent read and query Bases, the open format.

- [obsidian-skills (kepano)](https://github.com/kepano/obsidian-skills) — agent skills from Obsidian's CEO; teaches agents Markdown, **Bases**, and JSON formats.

> This section is intentionally short — Bases-aware agent tooling is the newest
> frontier here. Built one? [Open a PR](CONTRIBUTING.md).

## Related (not Bases-specific)

Useful in the same space, but **not Bases-specific** — listed for context.

**MCP & vault access**
- [obsidian-local-rest-api](https://github.com/coddingtonbear/obsidian-local-rest-api) — secure REST API + MCP server for your vault.
- [mcp-obsidian (MarkusPfundstein)](https://github.com/MarkusPfundstein/mcp-obsidian) — MCP server over the Obsidian REST API.
- [mcpvault (bitbonsai)](https://github.com/bitbonsai/mcpvault) — lightweight MCP server for safe vault access.
- [obsidian-mcp-tools (jacksteamdev)](https://github.com/jacksteamdev/obsidian-mcp-tools) — semantic search + Templater prompts for MCP clients.

**Agent memory vaults**
- [obsidian-mind (breferrari)](https://github.com/breferrari/obsidian-mind) — self-organising vault giving coding agents persistent memory.
- [ai-memory-vault (jaredrhod)](https://github.com/jaredrhod/ai-memory-vault) — open-source system + templates for persistent AI memory.
- [obsidian-second-brain (eugeniughelbur)](https://github.com/eugeniughelbur/obsidian-second-brain) — cross-platform skill; vault as memory for many CLI agents.
- [basic-memory](https://github.com/basicmachines-co/basic-memory) — Markdown-native memory you can point at an Obsidian vault.

**Importers & converters**
- [obsidian-importer](https://github.com/obsidianmd/obsidian-importer) — convert Apple Notes, Evernote, OneNote and more into Markdown. *(official)*

## Guides & References

- [Bases formulas](https://help.obsidian.md/formulas) — functions and expressions for computed properties.
- [Bases views](https://help.obsidian.md/bases/views) — table, cards and more.

## Contributing

Contributions are what make this list useful. Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

- Add an entry via pull request (one entry per PR).
- Keep the format: `[name](url) — one-sentence description.`
- The project must be **usable today**, related to **Obsidian Bases**, and have a **README**.
- No dead links, no self-promotion spam, no paid-only tools without a free tier.

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the contributors have waived all copyright and
related or neighboring rights to this work. See [LICENSE](LICENSE).
