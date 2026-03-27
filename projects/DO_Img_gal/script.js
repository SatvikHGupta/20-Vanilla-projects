const images = [
  { id: 1, category: "nature", title: "Misty Forest", src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80" },
  { id: 2, category: "city", title: "Urban Skyline", src: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1400&q=80" },
  { id: 3, category: "people", title: "Smiling Portrait", src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1400&q=80" },
  { id: 4, category: "animals", title: "Playful Fox", src: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=1400&q=80" },
  { id: 5, category: "architecture", title: "Modern Building", src: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?q=80&w=1170&auto=format&fit=crop" },
  { id: 6, category: "nature", title: "Mountain Lake", src: "https://images.unsplash.com/photo-1603979649806-5299879db16b?q=80&w=1171&auto=format&fit=crop" }
];

const gallery = document.getElementById("gallery");
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const resetBtn = document.getElementById("resetBtn");
const themeToggle = document.getElementById("themeToggle");
const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lbImage");
const lbCaption = document.getElementById("lbCaption");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");

let currentFilter = "all";
let currentIndex = -1;
const placeholder = "https://via.placeholder.com/1400x900?text=Image+unavailable";

// IntersectionObserver for smooth reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

function renderGallery(items) {
  gallery.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No images for this category.";
    gallery.appendChild(empty);
    return;
  }

  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;

    const inner = document.createElement("a");
    inner.className = "card-inner";
    inner.href = "#";
    inner.setAttribute("aria-label", `${item.title}, open viewer`);

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title;
    img.loading = "lazy";
    img.onerror = () => { img.src = placeholder; img.alt = item.title + " (unavailable)"; };

    const overlay = document.createElement("div");
    overlay.className = "card-overlay";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = item.title;

    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.textContent = item.category;

    overlay.append(title, meta);
    inner.append(img, overlay);
    card.appendChild(inner);
    gallery.appendChild(card);

    // Lightbox open
    inner.addEventListener("click", e => {
      e.preventDefault();
      openLightboxByItem(item);
    });

    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightboxByItem(item);
      }
    });

    observer.observe(card);
  });
}

function getFilteredItems() {
  return currentFilter === "all" ? images.slice() : images.filter(i => i.category === currentFilter);
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach(btn => {
    btn.setAttribute("aria-pressed", btn.dataset.filter === filter ? "true" : "false");
  });
  renderGallery(getFilteredItems());
}

function resetFilter() {
  setFilter("all");
  gallery.scrollIntoView({ behavior: "smooth" });
}

function openLightboxByItem(item) {
  const list = getFilteredItems();
  currentIndex = list.findIndex(i => i.id === item.id);
  showLightbox(list);
}

function showLightbox(list) {
  const item = list[currentIndex];
  lbImage.src = item.src;
  lbImage.alt = item.title;
  lbImage.onerror = () => { lbImage.src = placeholder; lbImage.alt = "Unavailable"; };
  lbCaption.textContent = `${item.title} — ${item.category}`;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  trapFocus(lightbox);
  lbClose.focus();
}

function closeLightbox() {
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lbImage.src = "";
  currentIndex = -1;
}

function stepLightbox(dir) {
  const list = getFilteredItems();
  if (!list.length) return;
  currentIndex = (currentIndex + dir + list.length) % list.length;
  showLightbox(list);
}

// Focus trap inside lightbox
function trapFocus(modal) {
  const focusable = modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  modal.addEventListener("keydown", e => {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

function attachEvents() {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter));
    btn.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setFilter(btn.dataset.filter);
      }
    });
  });

  resetBtn.addEventListener("click", resetFilter);

  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      themeToggle.setAttribute("aria-pressed", "false");
      themeToggle.textContent = "Light";
      localStorage.setItem("gallery_theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      themeToggle.setAttribute("aria-pressed", "true");
      themeToggle.textContent = "Dark";
      localStorage.setItem("gallery_theme", "light");
    }
  });

  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", () => stepLightbox(-1));
  lbNext.addEventListener("click", () => stepLightbox(1));

  document.addEventListener("keydown", e => {
    const open = lightbox.getAttribute("aria-hidden") === "false";
    if (open) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    }
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
}

function loadTheme() {
  const saved = localStorage.getItem("gallery_theme") || "dark";
  if (saved === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.setAttribute("aria-pressed", "true");
    themeToggle.textContent = "Dark";
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.setAttribute("aria-pressed", "false");
    themeToggle.textContent = "Light";
  }
}

loadTheme();
attachEvents();
setFilter("all");
