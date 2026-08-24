---
layout: single
title: "Search"
permalink: /search/
author_profile: false
---

<style>
.site-search {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

.site-search-input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--global-border-color);
  border-radius: 6px;
  background: var(--global-bg-color);
  color: var(--global-text-color);
}

.site-search-input:focus {
  outline: 2px solid var(--global-link-color);
  outline-offset: 2px;
}

.site-search-status {
  margin: 1rem 0;
  font-size: 0.9rem;
  color: var(--global-text-color-light);
}

.site-search-results {
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-search-result {
  padding: 1rem 0;
  border-bottom: 1px solid var(--global-border-color);
}

.site-search-result h2 {
  margin: 0 0 0.3rem;
  font-size: 1.15rem;
}

.site-search-result p {
  margin: 0.25rem 0;
}

.site-search-result-type {
  display: inline-block;
  margin-bottom: 0.3rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.7;
}

.site-search-empty {
  padding: 1rem 0;
}
</style>

<div class="site-search">

  <input
    id="site-search-input"
    class="site-search-input"
    type="search"
    placeholder="Search posts, courses, and other content..."
    autocomplete="off"
    aria-label="Search this site">

  <div
    id="site-search-status"
    class="site-search-status"
    aria-live="polite">
    Start typing to search the site.
  </div>

  <ul
    id="site-search-results"
    class="site-search-results">
  </ul>

</div>

<script>
(function () {
  const input = document.getElementById("site-search-input");
  const resultsElement = document.getElementById("site-search-results");
  const statusElement = document.getElementById("site-search-status");

  let searchIndex = [];

  function normalize(value) {
    return (value || "")
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function escapeHtml(value) {
    return (value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function search(query) {
    const normalizedQuery = normalize(query).trim();

    resultsElement.innerHTML = "";

    if (normalizedQuery.length < 2) {
      statusElement.textContent = "Type at least 2 characters.";
      return;
    }

    const terms = normalizedQuery
      .split(/\s+/)
      .filter(Boolean);

    const matches = searchIndex
      .map(function (item) {

        const title = normalize(item.title);
        const content = normalize(item.content);
        const type = normalize(item.type);

        let score = 0;

        terms.forEach(function (term) {
          if (title === term) {
            score += 20;
          } else if (title.includes(term)) {
            score += 10;
          }

          if (type.includes(term)) {
            score += 3;
          }

          if (content.includes(term)) {
            score += 1;
          }
        });

        return {
          item: item,
          score: score
        };
      })
      .filter(function (result) {
        return result.score > 0;
      })
      .sort(function (a, b) {
        return b.score - a.score;
      })
      .slice(0, 50);

    if (matches.length === 0) {
      statusElement.textContent = "No results found.";
      return;
    }

    statusElement.textContent =
      matches.length + (matches.length === 1 ? " result" : " results");

    matches.forEach(function (result) {
      const item = result.item;

      const li = document.createElement("li");
      li.className = "site-search-result";

      li.innerHTML =
        '<span class="site-search-result-type">' +
          escapeHtml(item.type) +
        '</span>' +
        '<h2><a href="' +
          escapeHtml(item.url) +
        '">' +
          escapeHtml(item.title) +
        '</a></h2>' +
        (item.excerpt
          ? "<p>" + escapeHtml(item.excerpt) + "</p>"
          : "");

      resultsElement.appendChild(li);
    });
  }

  fetch("{{ '/search.json' | relative_url }}")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Search index could not be loaded.");
      }

      return response.json();
    })
    .then(function (data) {
      searchIndex = data;

      statusElement.textContent =
        "Search " + searchIndex.length + " pages.";

      input.addEventListener("input", function () {
        search(input.value);
      });

      const params = new URLSearchParams(window.location.search);
      const initialQuery = params.get("q");

      if (initialQuery) {
        input.value = initialQuery;
        search(initialQuery);
      }

      input.focus();
    })
    .catch(function () {
      statusElement.textContent =
        "Search is temporarily unavailable.";
    });
})();
</script>