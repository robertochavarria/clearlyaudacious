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
})();
