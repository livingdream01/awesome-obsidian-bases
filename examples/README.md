# Examples

Copy these `.base` files into any Obsidian vault (with the **Bases** core plugin
enabled) and they will query your notes immediately.

| File | What it shows |
|---|---|
| [`People.base`](People.base) | A table of `type: person` notes, with a second view grouped by `org`. |
| [`Projects.base`](Projects.base) | A table of `type: project` notes filtered by status. |

They work on any notes that carry the matching frontmatter, for example:

```markdown
---
type: person
name: Ada Lovelace
org: Analytical Engines Ltd
phone: "555-0100"
---
```

```markdown
---
type: project
name: Difference Engine
status: active
repo: owner/difference-engine
---
```

Open a `.base` file in Obsidian to see it render as a live view. Edit the
`filters` and `order` to fit your own properties — the
[syntax reference](https://help.obsidian.md/bases/syntax) documents every option.
