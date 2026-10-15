/* Progressive enhancements; the full site remains readable without JavaScript. */
(function () {
  "use strict";
  const root = document.documentElement;
  const menu = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");
  const status = document.querySelector("#site-status");
  const announce = (message) => {
    if (status) status.textContent = message;
  };
  if (menu && navigation) {
    const setMenu = (open) => {
      menu.setAttribute("aria-expanded", String(open));
      navigation.classList.toggle("is-open", open);
    };
    menu.hidden = false;
    root.classList.add("js");
    menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menu.focus();
      }
    });
  }
  const themeButton = document.querySelector(".theme-toggle");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)");
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("shahab-theme");
  } catch {
    /* Storage may be unavailable. */
  }
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeButton) themeButton.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#15241f" : "#f7f5ef");
  };
  applyTheme(["light", "dark"].includes(savedTheme) ? savedTheme : preferredTheme.matches ? "dark" : "light");
  if (themeButton) {
    themeButton.hidden = false;
    themeButton.addEventListener("click", () => {
      savedTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(savedTheme);
      try {
        localStorage.setItem("shahab-theme", savedTheme);
      } catch {
        /* Theme still works for this visit. */
      }
    });
  }
  preferredTheme.addEventListener("change", (event) => {
    if (!["light", "dark"].includes(savedTheme)) applyTheme(event.matches ? "dark" : "light");
  });
  const filters = document.querySelector(".research-filters");
  if (filters) {
    const rows = Array.from(document.querySelectorAll(".research-row"));
    filters.hidden = false;
    filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      filters.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      rows.forEach((row) => {
        row.hidden = button.dataset.filter !== "all" && row.dataset.category !== button.dataset.filter;
      });
      const count = rows.filter((row) => !row.hidden).length;
      announce(`${count} research ${count === 1 ? "experience" : "experiences"} shown.`);
    });
  }
  const copyButton = document.querySelector(".copy-email");
  if (copyButton && navigator.clipboard && window.isSecureContext) {
    copyButton.hidden = false;
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(copyButton.dataset.email);
        copyButton.textContent = "Email copied";
        announce("Email address copied to clipboard.");
      } catch {
        copyButton.textContent = "Select the email address to copy";
        announce("Clipboard unavailable. You can select the email address or use the email link.");
      }
    });
  }
  if ("IntersectionObserver" in window && document.querySelector("#research")) {
    const links = Array.from(document.querySelectorAll('#main-navigation a[href*="#"]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        links.forEach((link) => {
          if (link.hash === `#${visible.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 }
    );
    ["about", "research", "publications", "teaching"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
