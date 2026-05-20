// Open links externally.
var links = document.links;

for (var i = 0, linksLength = links.length; i < linksLength; i++) {
   if (links[i].hostname != window.location.hostname) {
       links[i].target = '_blank';
   }
}

// Countdown to the next #30DayMapChallenge.
// Two milestones: 1 October (themes announced) and 1 November (challenge starts).
(function () {
  var timerId = null;

  function milestonesFor(now) {
    var year = now.getFullYear();
    var themes    = new Date(year, 9, 1, 0, 0, 0, 0);   // 1 October
    var challenge = new Date(year, 10, 1, 0, 0, 0, 0);  // 1 November
    var end       = new Date(year, 11, 1, 0, 0, 0, 0);  // 1 December
    if (now >= end) {
      year += 1;
      themes    = new Date(year, 9, 1, 0, 0, 0, 0);
      challenge = new Date(year, 10, 1, 0, 0, 0, 0);
      end       = new Date(year, 11, 1, 0, 0, 0, 0);
    }
    return { year: year, themes: themes, challenge: challenge, end: end };
  }

  function formatDate(d) {
    try {
      return d.toLocaleDateString(undefined, {
        year: "numeric", month: "long", day: "numeric"
      });
    } catch (e) {
      return d.toDateString();
    }
  }

  function pad(n) { return String(n).padStart(2, "0"); }

  function renderCountdown(block, target) {
    var now = new Date();
    var diff = Math.max(0, target - now);
    var total = Math.floor(diff / 1000);
    var days = Math.floor(total / 86400);
    var hours = Math.floor((total % 86400) / 3600);
    var minutes = Math.floor((total % 3600) / 60);
    var seconds = total % 60;

    block.classList.remove("challenge-countdown__block--done", "challenge-countdown__block--banner");
    var grid = block.querySelector("[data-cd-grid]");
    if (grid) {
      grid.innerHTML =
        '<div class="challenge-countdown__cell"><span class="challenge-countdown__value">' + days + '</span><span class="challenge-countdown__unit">days</span></div>' +
        '<div class="challenge-countdown__cell"><span class="challenge-countdown__value">' + pad(hours) + '</span><span class="challenge-countdown__unit">hours</span></div>' +
        '<div class="challenge-countdown__cell"><span class="challenge-countdown__value">' + pad(minutes) + '</span><span class="challenge-countdown__unit">minutes</span></div>' +
        '<div class="challenge-countdown__cell"><span class="challenge-countdown__value">' + pad(seconds) + '</span><span class="challenge-countdown__unit">seconds</span></div>';
    }
  }

  function renderBanner(block, text) {
    block.classList.add("challenge-countdown__block--banner");
    var grid = block.querySelector("[data-cd-grid]");
    if (grid) {
      grid.innerHTML = '<span class="challenge-countdown__value">' + text + '</span>';
    }
  }

  function setLabel(block, text) {
    var el = block.querySelector("[data-cd-label]");
    if (el) el.textContent = text;
  }

  function setNote(block, text) {
    var el = block.querySelector("[data-cd-target]");
    if (el) el.textContent = text;
  }

  function render(root) {
    var now = new Date();
    var m = milestonesFor(now);
    var themesBlock = root.querySelector('[data-cd-block="themes"]');
    var challengeBlock = root.querySelector('[data-cd-block="challenge"]');
    if (!themesBlock || !challengeBlock) return;

    // Themes block
    if (now < m.themes) {
      setLabel(themesBlock, "Themes announced in");
      renderCountdown(themesBlock, m.themes);
      setNote(themesBlock, formatDate(m.themes));
    } else {
      themesBlock.classList.add("challenge-countdown__block--done");
      setLabel(themesBlock, "Themes for " + m.year);
      renderBanner(themesBlock, "Now available");
      setNote(themesBlock, "Released " + formatDate(m.themes));
    }

    // Challenge block
    if (now < m.challenge) {
      setLabel(challengeBlock, "Challenge starts in");
      renderCountdown(challengeBlock, m.challenge);
      setNote(challengeBlock, formatDate(m.challenge));
    } else if (now < m.end) {
      var day = Math.floor((now - m.challenge) / 86400000) + 1;
      setLabel(challengeBlock, "#30DayMapChallenge is live");
      renderBanner(challengeBlock, "Day " + day + " of 30");
      setNote(challengeBlock, "Runs through " + formatDate(new Date(m.end - 1)));
    }

    root.hidden = false;
  }

  function setup() {
    if (timerId) { clearInterval(timerId); timerId = null; }
    var root = document.getElementById("challenge-countdown");
    if (!root) return;
    render(root);
    timerId = setInterval(function () {
      var el = document.getElementById("challenge-countdown");
      if (!el) { clearInterval(timerId); timerId = null; return; }
      render(el);
    }, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }

  // Material for MkDocs instant navigation: re-run on each page swap.
  if (typeof window.document$ !== "undefined" && window.document$.subscribe) {
    window.document$.subscribe(setup);
  }
})();

// #30DayMapChallenge hashtag preview — pulls recent image posts from Bluesky's
// public (no-auth) AppView. Fails silently if the API is unreachable.
(function () {
  var CACHE_KEY = "hashtagPreview.bsky.v1";
  var CACHE_TTL_MS = 30 * 60 * 1000;
  var TARGET_COUNT = 6;
  var SEARCH_URL = "https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts" +
                   "?q=" + encodeURIComponent("#30DayMapChallenge") +
                   "&limit=30&sort=top";

  function readCache() {
    try {
      var raw = window.localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (!obj || !obj.t || (Date.now() - obj.t) > CACHE_TTL_MS) return null;
      return obj.items;
    } catch (e) { return null; }
  }

  function writeCache(items) {
    try {
      window.localStorage.setItem(CACHE_KEY,
        JSON.stringify({ t: Date.now(), items: items }));
    } catch (e) { /* ignore quota / privacy errors */ }
  }

  function pickImage(post) {
    var e = post && post.embed;
    if (!e) return null;
    var images = e.images || (e.media && e.media.images);
    if (!images || !images.length) return null;
    return images[0];
  }

  function postUrl(post) {
    var uri = post && post.uri;
    var handle = post && post.author && post.author.handle;
    if (!uri || !handle) return null;
    var rkey = uri.split("/").pop();
    if (!rkey) return null;
    return "https://bsky.app/profile/" + encodeURIComponent(handle) +
           "/post/" + encodeURIComponent(rkey);
  }

  function shape(posts) {
    var out = [];
    for (var i = 0; i < posts.length && out.length < TARGET_COUNT; i++) {
      var p = posts[i];
      var img = pickImage(p);
      if (!img || !img.thumb) continue;
      var url = postUrl(p);
      if (!url) continue;
      var handle = (p.author && p.author.handle) || "";
      var name = (p.author && p.author.displayName) || handle;
      out.push({
        thumb: img.thumb,
        alt: img.alt || "",
        url: url,
        handle: handle,
        name: name
      });
    }
    return out;
  }

  function render(grid, items) {
    grid.innerHTML = "";
    items.forEach(function (item) {
      var a = document.createElement("a");
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "hashtag-preview__card";
      a.title = item.alt
        ? item.name + " — " + item.alt
        : "Post by " + item.name;

      var img = document.createElement("img");
      img.src = item.thumb;
      img.alt = item.alt ||
        ("Map by " + item.name + " (#30DayMapChallenge on Bluesky)");
      img.loading = "lazy";
      img.referrerPolicy = "no-referrer";

      var meta = document.createElement("span");
      meta.className = "hashtag-preview__meta";
      meta.textContent = "@" + item.handle;

      a.appendChild(img);
      a.appendChild(meta);
      grid.appendChild(a);
    });
  }

  function reveal(container, grid, items) {
    if (!items || !items.length) return;
    render(grid, items);
    container.hidden = false;
  }

  function init() {
    var container = document.getElementById("hashtag-preview");
    if (!container) return;
    var grid = container.querySelector("[data-hashtag-grid]");
    if (!grid || grid.dataset.loaded === "1") return;
    grid.dataset.loaded = "1";

    var cached = readCache();
    if (cached && cached.length) {
      reveal(container, grid, cached);
      return;
    }

    if (typeof window.fetch !== "function") return;

    window.fetch(SEARCH_URL, { headers: { "Accept": "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        if (!data || !Array.isArray(data.posts)) return;
        var items = shape(data.posts);
        if (!items.length) return;
        writeCache(items);
        reveal(container, grid, items);
      })
      .catch(function () { /* leave the section hidden */ });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  if (typeof window.document$ !== "undefined" && window.document$.subscribe) {
    window.document$.subscribe(init);
  }
})();