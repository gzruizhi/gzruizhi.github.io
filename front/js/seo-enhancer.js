(function () {
  "use strict";

  var ORIGIN = "https://www.ruizhipack.com";
  var ORG_NAME = "GUANGZHOU RUIZHI INDUSTRIAL CO., LTD.";
  var LOGO_URL = ORIGIN + "/storage/uploads/images/202308/31/1693468561_SKWv4J0dF7.jpg";
  var DEFAULT_SHARE_IMAGE =
    ORIGIN + "/storage/uploads/images/202309/02/1693636724_9ruC4SNKvx.jpg";

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

  function toAbsUrl(src) {
    if (!src) return "";
    if (/^https?:\/\//i.test(src)) return src;
    if (src.startsWith("//")) return "https:" + src;
    return ORIGIN + (src.startsWith("/") ? src : "/" + src);
  }

  function guessImageTypeFromUrl(url) {
    var clean = (url || "").split("?")[0].split("#")[0].toLowerCase();
    if (clean.endsWith(".png")) return "image/png";
    if (clean.endsWith(".webp")) return "image/webp";
    if (clean.endsWith(".gif")) return "image/gif";
    if (clean.endsWith(".jpg") || clean.endsWith(".jpeg")) return "image/jpeg";
    return "";
  }

  function getMainImageCandidate() {
    var path = normalizePath(window.location.pathname);
    // Index / default home page: force default share image
    if (path === "/") {
      return {
        url: DEFAULT_SHARE_IMAGE,
        width: 0,
        height: 0,
        type: guessImageTypeFromUrl(DEFAULT_SHARE_IMAGE)
      };
    }

    // Prefer any existing OG image set by server templates (if present)
    var og = document.head.querySelector('meta[property="og:image"]');
    var ogUrl = og ? toAbsUrl((og.getAttribute("content") || "").trim()) : "";
    if (ogUrl) {
      return {
        url: ogUrl,
        width: 0,
        height: 0,
        type: guessImageTypeFromUrl(ogUrl)
      };
    }

    var nodes = Array.prototype.slice.call(document.images || []);
    if (!nodes.length) {
      return {
        url: DEFAULT_SHARE_IMAGE,
        width: 0,
        height: 0,
        type: guessImageTypeFromUrl(DEFAULT_SHARE_IMAGE)
      };
    }

    var best = null;
    for (var i = 0; i < nodes.length; i++) {
      var img = nodes[i];
      if (!img) continue;

      var src =
        img.currentSrc ||
        img.getAttribute("src") ||
        img.getAttribute("data-src") ||
        img.getAttribute("data-original") ||
        "";
      src = (src || "").trim();
      if (!src) continue;
      if (/^data:/i.test(src)) continue;

      var abs = toAbsUrl(src);
      if (!abs) continue;
      if (/\.svg(\?|#|$)/i.test(abs)) continue;

      // Prefer larger "real" images; ignore tiny icons/logos
      var w =
        (img.naturalWidth || 0) ||
        parseInt(img.getAttribute("width") || "0", 10) ||
        0;
      var h =
        (img.naturalHeight || 0) ||
        parseInt(img.getAttribute("height") || "0", 10) ||
        0;
      var area = w * h;
      if (area && area < 40000) continue; // e.g. < 200x200

      var cand = {
        url: abs,
        width: w,
        height: h,
        type: guessImageTypeFromUrl(abs),
        area: area
      };

      if (!best) {
        best = cand;
        continue;
      }

      var bestArea = best.area || (best.width || 0) * (best.height || 0) || 0;
      var candArea = cand.area || 0;
      if (candArea > bestArea) {
        best = cand;
      } else if (candArea === bestArea) {
        // tie-breaker: prefer larger width then non-logo-ish paths
        if ((cand.width || 0) > (best.width || 0)) best = cand;
      }
    }

    if (!best || !best.url) {
      return {
        url: DEFAULT_SHARE_IMAGE,
        width: 0,
        height: 0,
        type: guessImageTypeFromUrl(DEFAULT_SHARE_IMAGE)
      };
    }

    return best;
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

  var shareImg = getMainImageCandidate();
  upsertMeta("property", "og:image", shareImg.url);
  // WhatsApp / Facebook-friendly extras
  upsertMeta("property", "og:image:secure_url", shareImg.url);
  if (shareImg.type) upsertMeta("property", "og:image:type", shareImg.type);
  if (shareImg.width) upsertMeta("property", "og:image:width", String(shareImg.width));
  if (shareImg.height) upsertMeta("property", "og:image:height", String(shareImg.height));
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", shareImg.url);

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
