---
layout: without-sidebar
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
</style>

<div class="site-search">

  <input
    id="site-search-input"
    class="site-search-input"
    type="search"
    placeholder="Search the site..."
    autocomplete="off"
    aria-label="Search this site">

  <div
    id="site-search-status"
    class="site-search-status"
    aria-live="polite">
    Loading search index...
  </div>

  <ul
    id="site-search-results"
    class="site-search-results">
  </ul>

</div>

<script>
(function () {

  const input =
    document.getElementById("site-search-input");

  const resultsElement =
    document.getElementById("site-search-results");

  const statusElement =
    document.getElementById("site-search-status");

  let searchIndex = [];


  /* --------------------------------------------------
     TEXT NORMALIZATION
  -------------------------------------------------- */

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


  function cleanText(value) {
    return (value || "")
      .replace(/\s+/g, " ")
      .trim();
  }


  /* --------------------------------------------------
     FILE HELPERS
  -------------------------------------------------- */

  function getFileName(url) {
    try {
      const pathname =
        new URL(url, window.location.origin).pathname;

      return decodeURIComponent(
        pathname.split("/").pop() || ""
      );
    } catch (e) {
      return "";
    }
  }


  function readableFileName(url) {

    return getFileName(url)
      .replace(/\.(pdf|html?)$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }


  function getAssetType(url, title) {

    const pathname =
      new URL(url, window.location.origin)
        .pathname
        .toLowerCase();

    const text =
      (title || "").toLowerCase();


    if (pathname.endsWith(".pdf")) {

      if (
        text.includes("sunum") ||
        text.includes("slide")
      ) {
        return "Slides";
      }

      if (
        text.includes("lecture note") ||
        text.includes("notes")
      ) {
        return "Lecture Notes";
      }

      if (
        text.includes("vize") ||
        text.includes("final") ||
        text.includes("but") ||
        text.includes("exam")
      ) {
        return "Exam PDF";
      }

      return "PDF";
    }


    if (pathname.endsWith(".html")) {

      if (
        text.includes("simulator") ||
        text.includes("simulation")
      ) {
        return "Simulator";
      }

      return "Interactive";
    }


    return "Resource";
  }


  function isSearchableAsset(url) {

    try {

      const parsed =
        new URL(url, window.location.origin);

      /*
       * Only index files belonging to this site.
       */
      if (
        parsed.origin !==
        window.location.origin
      ) {
        return false;
      }

      return /\.(pdf|html?)$/i
        .test(parsed.pathname);

    } catch (e) {

      return false;
    }
  }


  /* --------------------------------------------------
     FIND SECTION CONTEXT
  -------------------------------------------------- */

  function getSectionContext(link) {

    /*
     * Walk backwards through the rendered page.
     *
     * We collect:
     * - nearest heading
     * - nearby descriptive paragraph
     */

    let element = link;
    let heading = "";
    let description = "";


    while (element) {

      let sibling =
        element.previousElementSibling;


      while (sibling) {

        if (
          !heading &&
          /^H[1-4]$/.test(sibling.tagName)
        ) {
          heading =
            cleanText(sibling.textContent);
        }


        if (
          !description &&
          sibling.tagName === "P"
        ) {

          const text =
            cleanText(sibling.textContent);

          if (text.length > 40) {
            description = text;
          }
        }


        sibling =
          sibling.previousElementSibling;
      }


      if (heading) {
        break;
      }


      element =
        element.parentElement;


      if (
        !element ||
        element.tagName === "BODY"
      ) {
        break;
      }
    }


    return {
      heading: heading,
      description: description
    };
  }


  /* --------------------------------------------------
     EXTRACT PDF / HTML LINKS FROM TEACHING PAGE
  -------------------------------------------------- */

  function extractAssets(html, teachingItem) {

    const parser =
      new DOMParser();

    const documentPage =
      parser.parseFromString(
        html,
        "text/html"
      );


    const links =
      Array.from(
        documentPage.querySelectorAll("a[href]")
      );


    const assets = [];


    links.forEach(function (link) {

      const rawHref =
        link.getAttribute("href");

      if (!rawHref) {
        return;
      }


      let url;

      try {

        url =
          new URL(
            rawHref,
            teachingItem.url.startsWith("http")
              ? teachingItem.url
              : window.location.origin +
                teachingItem.url
          );

      } catch (e) {

        return;
      }


      if (!isSearchableAsset(url.href)) {
        return;
      }


      const title =
        cleanText(link.textContent) ||
        readableFileName(url.href);


      const context =
        getSectionContext(link);


      const filename =
        readableFileName(url.href);


      /*
       * The list item itself may contain some useful
       * explanatory text.
       */

      const listItem =
        link.closest("li");


      let nearbyText = "";

      if (listItem) {

        nearbyText =
          cleanText(listItem.textContent);

        /*
         * Avoid duplicating the title.
         */

        if (nearbyText === title) {
          nearbyText = "";
        }
      }


      const descriptionParts = [];


      if (context.heading) {
        descriptionParts.push(
          context.heading
        );
      }


      if (context.description) {

        /*
         * Keep excerpts reasonably short.
         */

        descriptionParts.push(
          context.description.length > 220
            ? context.description.slice(0, 217) + "..."
            : context.description
        );
      }


      const excerpt =
        descriptionParts.join(" — ");


      const content = [
        title,
        filename,
        context.heading,
        context.description,
        nearbyText,
        teachingItem.title,
        getAssetType(url.href, title)
      ]
        .filter(Boolean)
        .join(" ");


      assets.push({

        title: title,

        url:
          url.pathname +
          url.search +
          url.hash,

        type:
          getAssetType(
            url.href,
            title
          ),

        excerpt:
          excerpt,

        content:
          content
      });

    });


    return assets;
  }


  /* --------------------------------------------------
     LOAD TEACHING ASSETS
  -------------------------------------------------- */

  async function loadTeachingAssets() {

    const teachingPages =
      searchIndex.filter(function (item) {
        return item.type === "Teaching";
      });


    const requests =
      teachingPages.map(
        async function (teachingItem) {

          try {

            const response =
              await fetch(
                teachingItem.url
              );


            if (!response.ok) {
              return [];
            }


            const html =
              await response.text();


            return extractAssets(
              html,
              teachingItem
            );


          } catch (e) {

            return [];
          }

        }
      );


    const groups =
      await Promise.all(requests);


    const assets =
      groups.flat();


    /*
     * Remove duplicate URLs.
     *
     * Example:
     * The same Lecture Notes PDF might appear
     * under more than one chapter.
     */

    const existingUrls =
      new Set(
        searchIndex.map(
          function (item) {
            return item.url;
          }
        )
      );


    const uniqueAssets = [];


    assets.forEach(function (asset) {

      if (!existingUrls.has(asset.url)) {

        existingUrls.add(asset.url);

        uniqueAssets.push(asset);
      }

    });


    searchIndex =
      searchIndex.concat(
        uniqueAssets
      );
  }


  /* --------------------------------------------------
     SEARCH
  -------------------------------------------------- */

  function search(query) {

    const normalizedQuery =
      normalize(query).trim();


    resultsElement.innerHTML = "";


    if (
      normalizedQuery.length < 2
    ) {

      statusElement.textContent =
        "Type at least 2 characters.";

      return;
    }


    const terms =
      normalizedQuery
        .split(/\s+/)
        .filter(Boolean);


    const matches =
      searchIndex

        .map(function (item) {

          const title =
            normalize(item.title);

          const content =
            normalize(item.content);

          const type =
            normalize(item.type);

          const excerpt =
            normalize(item.excerpt);


          let score = 0;
          let matchedTerms = 0;


          terms.forEach(
            function (term) {

              let matched = false;


              if (title === term) {

                score += 30;
                matched = true;

              } else if (
                title.startsWith(term)
              ) {

                score += 20;
                matched = true;

              } else if (
                title.includes(term)
              ) {

                score += 12;
                matched = true;
              }


              if (
                type.includes(term)
              ) {

                score += 4;
                matched = true;
              }


              if (
                excerpt.includes(term)
              ) {

                score += 3;
                matched = true;
              }


              if (
                content.includes(term)
              ) {

                score += 1;
                matched = true;
              }


              if (matched) {
                matchedTerms++;
              }

            }
          );


          /*
           * Bonus when every search term
           * matches somewhere.
           */

          if (
            matchedTerms ===
            terms.length
          ) {

            score += 10;
          }


          return {
            item: item,
            score: score,
            matchedTerms: matchedTerms
          };

        })


        .filter(function (result) {

          return result.score > 0;

        })


        .sort(function (a, b) {

          if (
            b.matchedTerms !==
            a.matchedTerms
          ) {

            return (
              b.matchedTerms -
              a.matchedTerms
            );
          }


          return (
            b.score -
            a.score
          );

        })


        .slice(0, 50);


    if (
      matches.length === 0
    ) {

      statusElement.textContent =
        "No results found.";

      return;
    }


    statusElement.textContent =
      matches.length +
      (
        matches.length === 1
          ? " result"
          : " results"
      );


    matches.forEach(
      function (result) {

        const item =
          result.item;


        const li =
          document.createElement("li");


        li.className =
          "site-search-result";


        li.innerHTML =

          '<span class="site-search-result-type">' +

            escapeHtml(
              item.type
            ) +

          '</span>' +

          '<h2><a href="' +

            escapeHtml(
              item.url
            ) +

          '">' +

            escapeHtml(
              item.title
            ) +

          '</a></h2>' +

          (
            item.excerpt
              ? "<p>" +
                escapeHtml(
                  item.excerpt
                ) +
                "</p>"
              : ""
          );


        resultsElement.appendChild(
          li
        );

      }
    );
  }


  /* --------------------------------------------------
     INITIALIZATION
  -------------------------------------------------- */

  fetch(
    "{{ '/search.json' | relative_url }}"
  )

    .then(function (response) {

      if (!response.ok) {

        throw new Error(
          "Search index could not be loaded."
        );
      }


      return response.json();

    })


    .then(async function (data) {

      searchIndex = data;


      /*
       * Discover PDF and HTML resources
       * referenced by Teaching pages.
       */

      await loadTeachingAssets();


      statusElement.textContent =
        "Search " +
        searchIndex.length +
        " items.";


      input.addEventListener(
        "input",
        function () {

          search(
            input.value
          );

        }
      );


      const params =
        new URLSearchParams(
          window.location.search
        );


      const initialQuery =
        params.get("q");


      if (initialQuery) {

        input.value =
          initialQuery;

        search(
          initialQuery
        );
      }


      input.focus();

    })


    .catch(function () {

      statusElement.textContent =
        "Search is temporarily unavailable.";

    });

})();
</script>