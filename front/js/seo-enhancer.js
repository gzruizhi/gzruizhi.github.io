(function () {
  "use strict";

  var ORIGIN = "https://www.ruizhipack.com";
  var ORG_NAME = "GUANGZHOU RUIZHI INDUSTRIAL CO., LTD.";
  var LOGO_URL = ORIGIN + "/storage/uploads/images/202308/31/1693468561_SKWv4J0dF7.jpg";

  function normalizePath(pathname) {
    var path = pathname || "/";
    if (!path.startsWith("/")) path = "/" + path;
    path = path.replace(/\/index\.html$/i, "/");
    if (path !== "/" && path.endsWith("/")) path = path.slice(0, -1);
    return path;
  }

  function upsertMeta(attr, key, content) {
    if (!content) return;
    var selector = 'meta[' + attr + '="' + key + '"]';
    var node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute(attr, key);
      document.head.appendChild(node);
    }
    node.setAttribute("content", content);
  }

  function ensureCanonical(url) {
    var canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }

  function getMainImage() {
    var preferred = document.querySelector(".proleft img, .detail img, .content img, .product img");
    var any = preferred || document.querySelector("img");
    if (!any) return LOGO_URL;
    var src = any.getAttribute("src") || "";
    if (!src) return LOGO_URL;
    if (/^https?:\/\//i.test(src)) return src;
    if (src.startsWith("//")) return "https:" + src;
    return ORIGIN + (src.startsWith("/") ? src : "/" + src);
  }

  function getBreadcrumbJsonLd(canonicalUrl) {
    var path = normalizePath(window.location.pathname);
    var slug = path === "/" ? "Home" : path.split("/").pop().replace(/\.html$/i, "").replace(/-/g, " ");
    var pageName = slug.replace(/\b\w/g, function (c) {
      return c.toUpperCase();
    });
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: ORIGIN + "/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: pageName,
          item: canonicalUrl
        }
      ]
    };
  }

  function injectJsonLd(id, data) {
    var node = document.getElementById(id);
    if (!node) {
      node = document.createElement("script");
      node.type = "application/ld+json";
      node.id = id;
      document.head.appendChild(node);
    }
    node.text = JSON.stringify(data);
  }

  var canonicalUrl = ORIGIN + normalizePath(window.location.pathname);
  if (canonicalUrl !== ORIGIN + "/") canonicalUrl += ".html";
  canonicalUrl = canonicalUrl.replace(/\.html\.html$/i, ".html").replace(/\/$/, "/");

  var title = (document.title || "").trim();
  var descNode = document.head.querySelector('meta[name="description"]');
  var description = descNode ? (descNode.getAttribute("content") || "").trim() : "";
  if (!description) {
    description = "Custom cosmetic packaging manufacturer for global brands: tubes, bottles, applicators, and OEM/ODM solutions.";
    upsertMeta("name", "description", description);
  }

  ensureCanonical(canonicalUrl);
  upsertMeta("name", "robots", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
  upsertMeta("property", "og:site_name", "Ruizhi Packaging");
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", canonicalUrl);
  upsertMeta("property", "og:type", normalizePath(window.location.pathname) === "/" ? "website" : "product");
  upsertMeta("property", "og:image", getMainImage());
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", getMainImage());

  injectJsonLd("rz-org-jsonld", {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORIGIN + "/#organization",
    name: ORG_NAME,
    url: ORIGIN + "/",
    logo: LOGO_URL,
    email: "info@ruizhipack.com",
    telephone: "+86 13560168895",
    areaServed: "Worldwide",
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Cosmetic Tube and Bottle Packaging OEM/ODM"
      }
    }
  });

  injectJsonLd("rz-website-jsonld", {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ORIGIN + "/#website",
    url: ORIGIN + "/",
    name: "Ruizhi Packaging",
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: ORIGIN + "/product/search?search_keyword={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });

  injectJsonLd("rz-breadcrumb-jsonld", getBreadcrumbJsonLd(canonicalUrl));
})();
