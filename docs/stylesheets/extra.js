// Open links externally.
var links = document.links;

for (var i = 0, linksLength = links.length; i < linksLength; i++) {
   if (links[i].hostname != window.location.hostname) {
       links[i].target = '_blank';
   }
}

// Countdown to the next #30DayMapChallenge (every November).
(function () {
  var timerId = null;

  function nextChallengeWindow(now) {
    var year = now.getFullYear();
    var start = new Date(year, 10, 1, 0, 0, 0, 0);   // 1 November, local time
    var end   = new Date(year, 11, 1, 0, 0, 0, 0);   // 1 December, local time
    if (now >= end) {
      start = new Date(year + 1, 10, 1, 0, 0, 0, 0);
      end   = new Date(year + 1, 11, 1, 0, 0, 0, 0);
    }
    return { start: start, end: end, live: now >= start && now < end };
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

  function render(root) {
    var now = new Date();
    var win = nextChallengeWindow(now);
    var target = win.live ? win.end : win.start;
    var diff = Math.max(0, target - now);

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    var label = root.querySelector(".challenge-countdown__label");
    var note  = root.querySelector("[data-cd-target]");
    var d = root.querySelector("[data-cd-days]");
    var h = root.querySelector("[data-cd-hours]");
    var m = root.querySelector("[data-cd-minutes]");
    var s = root.querySelector("[data-cd-seconds]");

    if (win.live) {
      root.classList.add("challenge-countdown--live");
      if (label) label.textContent = "The #30DayMapChallenge is live!";
      if (d) d.parentElement.style.display = "none";
      if (h) h.parentElement.style.display = "none";
      if (m) m.parentElement.style.display = "none";
      if (s) {
        s.parentElement.style.display = "";
        s.textContent = "Day " + (Math.floor((now - win.start) / 86400000) + 1) + " of 30";
        var unit = s.parentElement.querySelector(".challenge-countdown__unit");
        if (unit) unit.textContent = "happening now";
      }
      if (note) note.textContent = "Share your maps with #30DayMapChallenge through " + formatDate(new Date(win.end - 1));
    } else {
      root.classList.remove("challenge-countdown--live");
      if (label) label.textContent = "Next challenge starts in";
      if (d) d.textContent = days;
      if (h) h.textContent = String(hours).padStart(2, "0");
      if (m) m.textContent = String(minutes).padStart(2, "0");
      if (s) s.textContent = String(seconds).padStart(2, "0");
      if (note) note.textContent = "Kicks off " + formatDate(win.start);
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