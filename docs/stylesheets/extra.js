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