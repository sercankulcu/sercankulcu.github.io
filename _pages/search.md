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
 placeholder="Search posts, courses, apps, games, PDFs, and interactive content..."
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
     TEXT HELPERS
  -------------------------------------------------- */

  function normalize(value) {
    return (value || "")
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ı/g, "i");
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
        new URL(
          url,
          window.location.origin
        ).pathname;

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


  function isSearchableAsset(url) {

    try {

      const parsed =
        new URL(
          url,
          window.location.origin
        );

      /*
       * Only local files are indexed.
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


  function getAssetType(
    url,
    title,
    sourceType
  ) {

    const pathname =
      new URL(
        url,
        window.location.origin
      )
        .pathname
        .toLowerCase();

    const text =
      normalize(title);


    /*
     * Apps and Games have priority
     * over generic HTML classification.
     */

    if (sourceType === "Apps") {
      return "App";
    }

    if (sourceType === "Games") {
      return "Game";
    }


    /*
     * PDF resources referenced by courses.
     */

    if (pathname.endsWith(".pdf")) {

      if (
        text.includes("sunum") ||
        text.includes("slide")
      ) {
        return "Slides";
      }

      if (
        text.includes("lecture note") ||
        text.includes("lecture notes") ||
        text.includes("notes")
      ) {
        return "Lecture Notes";
      }

      if (
        text.includes("vize") ||
        text.includes("final") ||
        text.includes("but") ||
        text.includes("butunleme") ||
        text.includes("exam")
      ) {
        return "Exam PDF";
      }

      return "PDF";
    }


    /*
     * HTML resources referenced by courses.
     */

    if (
      pathname.endsWith(".html") ||
      pathname.endsWith(".htm")
    ) {

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


  /* --------------------------------------------------
     PAGE CONTEXT
  -------------------------------------------------- */

  function getNearestHeading(link) {

    let element = link;

    while (
      element &&
      element.tagName !== "BODY"
    ) {

      let sibling =
        element.previousElementSibling;

      while (sibling) {

        if (
          /^H[1-4]$/.test(
            sibling.tagName
          )
        ) {

          return cleanText(
            sibling.textContent
          );
        }

        sibling =
          sibling.previousElementSibling;
      }

      element =
        element.parentElement;
    }

    return "";
  }


  function getNearbyDescription(link) {

    /*
     * First try the current list item.
     */

    const listItem =
      link.closest("li");

    if (listItem) {

      const text =
        cleanText(
          listItem.textContent
        );

      const title =
        cleanText(
          link.textContent
        );

      if (
        text &&
        text !== title &&
        text.length > title.length
      ) {

        return text
          .replace(title, "")
          .replace(/^[\s\-–—:|]+/, "")
          .trim();
      }
    }


    /*
     * Then try nearby paragraphs.
     */

    let element =
      link.parentElement;

    while (
      element &&
      element.tagName !== "BODY"
    ) {

      let sibling =
        element.previousElementSibling;

      while (sibling) {

        if (
          sibling.tagName === "P"
        ) {

          const text =
            cleanText(
              sibling.textContent
            );

          if (text.length > 30) {

            return text;
          }
        }


        if (
          /^H[1-4]$/.test(
            sibling.tagName
          )
        ) {
          break;
        }


        sibling =
          sibling.previousElementSibling;
      }


      element =
        element.parentElement;
    }


    return "";
  }


  /* --------------------------------------------------
     EXTRACT LINKED ASSETS
  -------------------------------------------------- */

  function extractAssets(
    html,
    sourcePage
  ) {

    const parser =
      new DOMParser();

    const page =
      parser.parseFromString(
        html,
        "text/html"
      );

    const links =
      Array.from(
        page.querySelectorAll(
          "a[href]"
        )
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
            sourcePage.url.startsWith("http")
              ? sourcePage.url
              : window.location.origin +
                sourcePage.url
          );

      } catch (e) {

        return;
      }


      if (
        !isSearchableAsset(
          url.href
        )
      ) {
        return;
      }


      const title =
        cleanText(
          link.textContent
        ) ||
        readableFileName(
          url.href
        );


      const heading =
        getNearestHeading(
          link
        );


      const nearbyDescription =
        getNearbyDescription(
          link
        );


      const filename =
        readableFileName(
          url.href
        );


      const type =
        getAssetType(
          url.href,
          title,
          sourcePage.sourceType
        );


      /*
       * Short visible description.
       */

      let excerpt = "";

      if (
        nearbyDescription &&
        nearbyDescription !== title
      ) {

        excerpt =
          nearbyDescription.length > 220
            ? nearbyDescription.slice(
                0,
                217
              ) + "..."
            : nearbyDescription;

      } else if (
        heading &&
        heading !== title
      ) {

        excerpt = heading;

      } else {

        excerpt =
          sourcePage.title;
      }


      /*
       * Searchable text.
       *
       * Includes:
       * - visible link title
       * - file name
       * - section/chapter heading
       * - nearby description
       * - source page title
       * - resource type
       */

      const content = [
        title,
        filename,
        heading,
        nearbyDescription,
        sourcePage.title,
        sourcePage.sourceType,
        type
      ]
        .filter(Boolean)
        .join(" ");


      assets.push({

        title: title,

        url:
          url.pathname +
          url.search +
          url.hash,

        type: type,

        excerpt: excerpt,

        content: content

      });

    });


    return assets;
  }


  /* --------------------------------------------------
     LOAD TEACHING / APPS / GAMES ASSETS
  -------------------------------------------------- */

  async function loadLinkedAssets() {

    /*
     * Teaching pages are already present
     * in search.json.
     */

    const sourcePages =
      searchIndex

        .filter(function (item) {

          return (
            item.type ===
            "Teaching"
          );

        })

        .map(function (item) {

          return {

            title:
              item.title,

            url:
              item.url,

            sourceType:
              "Teaching"

          };

        });


    /*
     * Additional index pages.
     */

    sourcePages.push(

      {
        title: "Apps",
        url: "{{ '/apps/' | relative_url }}",
        sourceType: "Apps"
      },

      {
        title: "Games",
        url: "{{ '/games/' | relative_url }}",
        sourceType: "Games"
      }

    );


    const requests =
      sourcePages.map(
        async function (
          sourcePage
        ) {

          try {

            const response =
              await fetch(
                sourcePage.url
              );


            if (!response.ok) {

              return [];
            }


            const html =
              await response.text();


            return extractAssets(
              html,
              sourcePage
            );


          } catch (e) {

            return [];
          }

        }
      );


    const groups =
      await Promise.all(
        requests
      );


    const assets =
      groups.flat();


    /*
     * Avoid duplicate URLs.
     *
     * The same PDF may be referenced
     * several times from a course page.
     */

    const knownUrls =
      new Set();


    searchIndex.forEach(
      function (item) {

        try {

          const url =
            new URL(
              item.url,
              window.location.origin
            );

          knownUrls.add(
            url.pathname +
            url.search +
            url.hash
          );

        } catch (e) {

          knownUrls.add(
            item.url
          );
        }

      }
    );


    const uniqueAssets = [];


    assets.forEach(
      function (asset) {

        if (
          !knownUrls.has(
            asset.url
          )
        ) {

          knownUrls.add(
            asset.url
          );

          uniqueAssets.push(
            asset
          );
        }

      }
    );


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
      normalize(
        query
      ).trim();


    resultsElement.innerHTML =
      "";


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
            normalize(
              item.title
            );

          const content =
            normalize(
              item.content
            );

          const type =
            normalize(
              item.type
            );

          const excerpt =
            normalize(
              item.excerpt
            );


          let score = 0;

          let matchedTerms = 0;


          terms.forEach(
            function (term) {

              let matched =
                false;


              /*
               * Title relevance.
               */

              if (
                title === term
              ) {

                score += 30;

                matched = true;

              } else if (
                title.startsWith(
                  term
                )
              ) {

                score += 20;

                matched = true;

              } else if (
                title.includes(
                  term
                )
              ) {

                score += 12;

                matched = true;
              }


              /*
               * Type relevance.
               */

              if (
                type.includes(
                  term
                )
              ) {

                score += 4;

                matched = true;
              }


              /*
               * Description relevance.
               */

              if (
                excerpt.includes(
                  term
                )
              ) {

                score += 3;

                matched = true;
              }


              /*
               * General content.
               */

              if (
                content.includes(
                  term
                )
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
           * Prefer results matching
           * every search term.
           */

          if (
            matchedTerms ===
            terms.length
          ) {

            score += 10;
          }


          return {

            item:
              item,

            score:
              score,

            matchedTerms:
              matchedTerms

          };

        })


        .filter(
          function (result) {

            return (
              result.score > 0
            );
          }
        )


        .sort(
          function (a, b) {

            /*
             * First prefer results
             * matching more query terms.
             */

            if (
              b.matchedTerms !==
              a.matchedTerms
            ) {

              return (
                b.matchedTerms -
                a.matchedTerms
              );
            }


            /*
             * Then sort by relevance.
             */

            return (
              b.score -
              a.score
            );

          }
        )


        .slice(
          0,
          50
        );


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
          document.createElement(
            "li"
          );


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

    .then(
      function (response) {

        if (!response.ok) {

          throw new Error(
            "Search index could not be loaded."
          );
        }


        return response.json();

      }
    )


    .then(
      async function (data) {

        searchIndex =
          data;


        /*
         * Discover linked resources from:
         *
         * - Teaching pages
         * - Apps
         * - Games
         */

        await loadLinkedAssets();


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


        /*
         * Support:
         *
         * /search/?q=dijkstra
         */

        const params =
          new URLSearchParams(
            window.location.search
          );


        const initialQuery =
          params.get("q");


        if (
          initialQuery
        ) {

          input.value =
            initialQuery;

          search(
            initialQuery
          );
        }


        input.focus();

      }
    )


    .catch(
      function () {

        statusElement.textContent =
          "Search is temporarily unavailable.";

      }
    );

})();
</script>
