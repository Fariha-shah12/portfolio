// mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // hero terminal typing effect
  var term = document.getElementById('terminal-text');
  if (term) {
    var queries = [
      "SELECT * FROM experience WHERE impact > avg(impact);",
      "UPDATE fariha_shah SET status = 'open_to_work';",
      "SELECT skill FROM toolkit ORDER BY curiosity DESC;"
    ];
    var qi = 0, ci = 0, deleting = false;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function tick() {
      var full = queries[qi];
      if (prefersReduced) {
        term.textContent = full;
        return;
      }
      if (!deleting) {
        ci++;
        term.textContent = full.slice(0, ci);
        if (ci === full.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
        setTimeout(tick, 34);
      } else {
        ci--;
        term.textContent = full.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          qi = (qi + 1) % queries.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, 16);
      }
    }
    tick();
  }
});
