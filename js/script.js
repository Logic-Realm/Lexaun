(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const year = document.querySelector("#year");

  if (year) year.textContent = String(new Date().getFullYear());

  const backToTop = document.querySelector("#back-to-top");

  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      history.replaceState(null, "", "#top");
    });
  }

  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    nav.classList.toggle("is-open", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) closeMenu();
  });
})();
