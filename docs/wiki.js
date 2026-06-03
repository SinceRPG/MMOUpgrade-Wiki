const searchInput = document.querySelector("#search");
const sections = Array.from(document.querySelectorAll("[data-search-section]"));
const navLinks = Array.from(document.querySelectorAll(".nav a"));
const currentPage = window.location.pathname.split("/").pop() || "index.html";

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
      const href = link.getAttribute("href") || "";
      if (href.startsWith("#")) {
        link.classList.toggle("active", href === `#${visible.target.id}`);
      }
    });
  },
  { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.25, 0.5] }
);

sections.forEach((section) => observer.observe(section));

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href")?.split("#")[0].replace("./", "") || "";
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});
