const searchInput = document.querySelector("#search");
const sections = Array.from(document.querySelectorAll("[data-search-section]"));
const navLinks = Array.from(document.querySelectorAll(".nav a"));

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

searchInput?.addEventListener("input", (event) => {
  const query = normalize(event.target.value);

  sections.forEach((section) => {
    if (!query) {
      section.classList.remove("hidden");
      return;
    }

    const text = normalize(section.textContent || "");
    section.classList.toggle("hidden", !text.includes(query));
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) {
      return;
    }

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.25, 0.5] }
);

sections.forEach((section) => observer.observe(section));
