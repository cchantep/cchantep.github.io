---
layout: post
title: Building a personal site with GitHub Pages
date: 2026-07-17

---

**Minimal customization, maximum focus on content**

Creating a personal website often starts with a simple goal: having a place to share ideas, technical notes, projects, or experience.

The technical choices can quickly become the main challenge though. Choosing a framework, designing a theme, building layouts, and maintaining custom styling can consume more time than actually writing content.

For a personal technical site, a different approach works well: start from what GitHub Pages already provides, understand the underlying Jekyll model, and customize only the parts that genuinely add value.

This article does not cover the GitHub Pages setup process itself; the [official documentation](https://docs.github.com/fr/pages/quickstart) already explains how to create and publish a site. Instead, it focuses on what happens after that initial setup and how to adapt the default behavior with minimal effort.

### GitHub Pages already provides a publishing pipeline

Once a `{username}.github.io` repository is enabled, Markdown files can become published pages.

The source remains simple, `README.md` is published as home, any other `.md` files is published using the default layout.

```
README.md
blog/
  *.md
```

### Do not start by replacing the theme

A common first reaction is to look for a complete theme replacement.

GitHub pages is using Jekyll under the hood, whose layouts are composable.

The default GitHub Pages theme already provides:

- the HTML document structure,
- common navigation elements,
- stylesheets,
- page containers.

A better strategy is to keep the existing theme and override only the missing behavior.

### Adding post-specific rendering

One discovery when using the default setup is that front matter values are only metadata.

For example:

```
title: Understanding Classification Metrics in Data Science
```

does not automatically generate:

```html
<h1>Understanding Classification Metrics in Data Science</h1>
```

The layout decides whether and where this information appears.

A minimal `_layouts/post.html` override is enough:

{% raw %}
```liquid
---
layout: default
---

<article>
  <h2>{{ page.title }}</h2>

  <header>
    {% assign pdate = page.date | date_to_xmlschema %}

    <p>
      <time datetime="{{ pdate }}">{{ pdate | date: "%b %-d, %Y" }}</time>
    </p>
  </header>

  {{ content }}
</article>
```
{% endraw %}

The rest of the theme remains untouched.

### Creating a simple post index

A homepage can also remain very simple.
Instead of introducing a dedicated blogging engine, Liquid can generate a list directly from the pages already known by Jekyll:

{% raw %}
```liquid
{% assign posts = site.pages
  | where_exp: "p", "p.path contains 'blog/en/'"
  | sort: "date"
  | reverse
%}

<h2>✍️ Posts</h2>

<ul>
{% for post in posts %}
  <li>
    <a href="{{ post.url }}">
      {{ post.title }}
    </a>

    <time>
      {{ post.date | date: "%Y-%m-%d" }}
    </time>
  </li>
{% endfor %}
</ul>
```
{% endraw %}

The content files remain the source of truth, and the index is generated automatically.

### A pragmatic customization workflow

A useful approach is incremental:

1. Use the default GitHub Pages rendering.
2. Write content.
3. Identify concrete limitations.
4. Override only the relevant layout or include.

Examples:

| Need                | Minimal customization  |
| ------------------- | ---------------------- |
| Display post titles | `_layouts/post.html`   |
| List post on home   | `_layouts/home.html`   |
| Change navigation   | `includes/header.html` |
| Add metadata        | `includes/head.html`   |
| Customize footer    | `layouts/footer.html`  |

This avoids maintaining a full theme fork.

### The website should become invisible

A personal website is valuable because of the content it hosts:

- explanations,
- experiments,
- project notes,
- lessons learned.

The publishing system should support that goal, not compete with it.

GitHub Pages + Jekyll provides a useful balance:

- Markdown as the writing format,
- Git as the content history,
- automatic publication,
- enough flexibility for gradual customization.

The best personal site setup is often the one that requires the least attention after it is created.

> [*See this site sources*](https://github.com/cchantep/cchantep.github.io/)
