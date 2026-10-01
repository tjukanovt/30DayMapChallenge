// Open links externally.
var links = document.links;

for (var i = 0, linksLength = links.length; i < linksLength; i++) {
   if (links[i].hostname != window.location.hostname) {
       links[i].target = '_blank';
   }
}

// Countdown to the next #30DayMapChallenge.
// Two milestones: 1 October (themes announced) and 1 November (challenge starts).
// Hidden from the themes announcement until the challenge ends (1 December),
// when the home page shows the themes instead.
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

    var grid = block.querySelector("[data-cd-grid]");
    if (grid) {
      grid.innerHTML =
        '<div class="challenge-countdown__cell"><span class="challenge-countdown__value">' + days + '</span><span class="challenge-countdown__unit">days</span></div>' +
        '<div class="challenge-countdown__cell"><span class="challenge-countdown__value">' + pad(hours) + '</span><span class="challenge-countdown__unit">hours</span></div>';
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

    // Themes are out: hide the countdown until the challenge is over.
    if (now >= m.themes) {
      root.hidden = true;
      return;
    }

    setLabel(themesBlock, "Themes announced in");
    renderCountdown(themesBlock, m.themes);
    setNote(themesBlock, formatDate(m.themes));

    setLabel(challengeBlock, "Challenge starts in");
    renderCountdown(challengeBlock, m.challenge);
    setNote(challengeBlock, formatDate(m.challenge));

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
    }, 60000);
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