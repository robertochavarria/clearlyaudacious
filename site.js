/* Clearly Audacious — shared site behaviour */
(function () {
  // nav border on scroll
  var nav = document.getElementById("nav");
  if (nav) {
    addEventListener(
      "scroll",
      function () {
        nav.classList.toggle("scrolled", scrollY > 30);
      },
      { passive: true },
    );
  }

  // mobile menu
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // mark active nav link by normalized route
  function route(path) {
    path = (path || "/").replace(/index\.html$/i, "").replace(/\/+$/, "");
    return path || "/";
  }
  var here = route(location.pathname.toLowerCase());
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = route(new URL(a.href, location.href).pathname.toLowerCase());
    if (href === here) {
      a.classList.add("active");
    }
  });

  // close mobile navigation with Escape and keep its accessible name current
  addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
      document.body.classList.remove("menu-open");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.focus();
      }
    }
  });

  // reveal on scroll
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.04, rootMargin: "0px 0px 8% 0px" },
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    io.observe(el);
  });

  // A fast scroll or anchor jump can pass an element between observer frames.
  // Reveal anything the reader has already reached so content never stays hidden.
  function revealReached() {
    document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
      if (el.getBoundingClientRect().top < innerHeight * 1.08) {
        el.classList.add("in");
        io.unobserve(el);
      }
    });
  }
  addEventListener("scroll", revealReached, { passive: true });
  addEventListener("load", revealReached);
  revealReached();

  // stagger delays within groups
  function stagger(scope) {
    document
      .querySelectorAll(scope + " [data-stagger]")
      .forEach(function (el, i) {
        el.style.setProperty("--d", i * 0.08 + "s");
      });
  }
  stagger(".problems");
  stagger(".cards");
  stagger(".outcomes");

  // ---- the climbing line: draw a path threading the four dots ----
  var climb = document.getElementById("climb");
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  if (climb) {
    var svg = document.getElementById("climbline");
    var path = document.getElementById("climbPath");
    var glow = document.getElementById("climbGlow");
    var shell = document.getElementById("climbShell");
    var drawn = false;

    function buildClimb() {
      if (window.matchMedia("(max-width:860px)").matches) return;
      var box = climb.getBoundingClientRect();
      svg.setAttribute("viewBox", "0 0 " + box.width + " " + box.height);
      svg.setAttribute("width", box.width);
      svg.setAttribute("height", box.height);
      var dots = [].slice.call(climb.querySelectorAll(".step .dot"));
      var pts = dots.map(function (d) {
        var r = d.getBoundingClientRect();
        return {
          x: r.left - box.left + r.width / 2,
          y: r.top - box.top + r.height / 2,
        };
      });
      if (pts.length < 2) return;
      var d = "M0," + pts[0].y + " L" + pts[0].x + "," + pts[0].y;
      for (var i = 0; i < pts.length - 1; i++) {
        var a = pts[i],
          b = pts[i + 1],
          mx = (a.x + b.x) / 2;
        d +=
          " C" + mx + "," + a.y + " " + mx + "," + b.y + " " + b.x + "," + b.y;
      }
      var last = pts[pts.length - 1];
      d += " L" + box.width + "," + last.y;
      path.setAttribute("d", d);
      glow.setAttribute("d", d);
      var len = path.getTotalLength();
      path.style.strokeDasharray = len;
      glow.style.strokeDasharray = len;
      if (!drawn) {
        path.style.strokeDashoffset = len;
        glow.style.strokeDashoffset = len;
      }
    }
    function drawClimb() {
      if (drawn) return;
      drawn = true;
      if (reduce) {
        path.style.strokeDashoffset = 0;
        glow.style.strokeDashoffset = 0;
        return;
      }
      path.style.transition = "stroke-dashoffset 2.4s cubic-bezier(.16,1,.3,1)";
      glow.style.transition = "stroke-dashoffset 2.6s cubic-bezier(.16,1,.3,1)";
      requestAnimationFrame(function () {
        path.style.strokeDashoffset = 0;
        glow.style.strokeDashoffset = 0;
      });
    }
    var cio = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            buildClimb();
            drawClimb();
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    if (shell) cio.observe(shell);

    var rt;
    addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        drawn = false;
        path.style.transition = "none";
        glow.style.transition = "none";
        buildClimb();
        if (shell && shell.getBoundingClientRect().top < innerHeight) {
          drawn = false;
          drawClimb();
        }
      }, 160);
    });
    window.addEventListener("load", buildClimb);
  }
})();
