(function () {
  const galleryImages = [
    {
      src: "assets/recharge-angle.png",
      alt: "The Recharge spa with a light interior, dark slatted cabinet and teal corner lighting"
    },
    {
      src: "assets/recharge-top-sw.jpg",
      alt: "Overhead view of the Recharge spa, showing its round shape, light interior and blue accent lighting"
    },
    {
      src: "assets/recharge-top-mm.jpg",
      alt: "Overhead view of the Recharge spa with a light interior and blue accent lighting"
    },
    {
      src: "assets/recharge-3d-grey.jpg",
      alt: "The Recharge spa with a light interior and a grey slatted cabinet"
    },
    {
      src: "assets/recharge-3d-wood.jpg",
      alt: "The Recharge spa with a light interior and a light wood-look cabinet"
    },
    {
      src: "assets/recharge-features-sw.jpg",
      alt: "Overhead view of the Recharge with Soft Tissue Massage, Lumbar Support, Freestyle Massage, Hybrid Heating and EasyClean Shield callouts"
    },
    {
      src: "assets/recharge-lifestyle-overhead.jpg",
      alt: "Overhead close-up of the Recharge filled with water, set into a textured patio"
    },
    {
      src: "assets/recharge-lifestyle-sunset.jpg",
      alt: "The Recharge spa set into a terrace at sunset, with a covered daybed and pool beyond"
    },
    {
      src: "assets/recharge-lifestyle-dusk.jpg",
      alt: "The Recharge spa on a terrace at dusk, with pools and a covered daybed"
    },
    {
      src: "assets/recharge-lifestyle-deck.jpg",
      alt: "The Recharge spa set into a circular wooden deck beside a swimming pool"
    },
    {
      src: "assets/recharge-top-brochure.png",
      alt: "Overhead studio photograph of the Recharge seating and jet layout"
    },
    {
      src: "assets/recharge-angle-alt.jpg",
      alt: "Three-quarter studio view of the Recharge with a dark cabinet and teal corner lighting"
    }
  ];

  let current = 0;
  const mainImg = document.getElementById("gallery-main");
  const thumbs = document.getElementById("gallery-thumbs");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  function renderThumbs() {
    thumbs.innerHTML = "";
    galleryImages.forEach((img, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("role", "listitem");
      btn.className = i === current ? "is-active" : "";
      btn.setAttribute("aria-label", "View image " + (i + 1));
      btn.innerHTML = '<img src="' + img.src + '" alt="">';
      btn.addEventListener("click", () => show(i));
      thumbs.appendChild(btn);
    });
  }

  function show(index) {
    current = (index + galleryImages.length) % galleryImages.length;
    const img = galleryImages[current];
    mainImg.src = img.src;
    mainImg.alt = img.alt;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    thumbs.querySelectorAll("button").forEach((btn, i) => {
      btn.classList.toggle("is-active", i === current);
    });
  }

  document.querySelectorAll(".gallery .gallery-btn.prev").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      show(current - 1);
    });
  });
  document.querySelectorAll(".gallery .gallery-btn.next").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      show(current + 1);
    });
  });
  lightbox.querySelector(".prev").addEventListener("click", (e) => {
    e.stopPropagation();
    show(current - 1);
  });
  lightbox.querySelector(".next").addEventListener("click", (e) => {
    e.stopPropagation();
    show(current + 1);
  });
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  mainImg.addEventListener("click", openLightbox);
  document.querySelectorAll("#gallery-more button").forEach((btn) => {
    btn.addEventListener("click", () => {
      show(Number(btn.dataset.index));
      openLightbox();
    });
  });

  function openLightbox() {
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("is-open")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    }
  });

  // Simple swipe on the main stage
  let startX = null;
  const stage = document.getElementById("gallery-stage");
  stage.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (startX == null) return;
    const dx = e.changedTouches[0].screenX - startX;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });

  const showMore = document.getElementById("show-more-photos");
  showMore.addEventListener("click", () => {
    const extras = document.querySelectorAll(".gallery-extra");
    const open = extras[0] && extras[0].classList.contains("is-open");
    extras.forEach((el) => el.classList.toggle("is-open", !open));
    showMore.textContent = open ? "Show more" : "Show less";
  });

  renderThumbs();

  // Accordions
  document.querySelectorAll(".acc-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".acc-item");
      const open = item.classList.contains("is-open");
      item.classList.toggle("is-open", !open);
      btn.setAttribute("aria-expanded", String(!open));
    });
  });

  // Feature filters
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      document.querySelectorAll("#feature-cards .feat-card").forEach((card) => {
        card.classList.toggle("is-hidden", filter !== "all" && card.dataset.cat !== filter);
      });
    });
  });

  // Spec tabs
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("is-active"));
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("is-active");
    });
  });

  // Enquiry form
  const form = document.getElementById("enquiry-form");
  const thanks = document.getElementById("enquiry-thanks");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    form.classList.add("is-hidden");
    thanks.classList.add("is-visible");
    thanks.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Mobile nav
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
})();

// 3D / AR viewer: progress bar + hide the desktop note when AR is available
(function () {
  const mv = document.getElementById("recharge-3d");
  if (!mv) return;
  const bar = mv.querySelector(".view3d-progress");
  const fill = bar && bar.querySelector("span");
  mv.addEventListener("progress", function (e) {
    const p = e.detail.totalProgress;
    if (fill) fill.style.width = Math.round(p * 100) + "%";
    if (bar) bar.classList.toggle("hide", p >= 1);
  });
  const note = document.getElementById("view3d-desktop-note");
  mv.addEventListener("load", function () {
    if (mv.canActivateAR && note) note.classList.add("is-hidden");
  });
})();
