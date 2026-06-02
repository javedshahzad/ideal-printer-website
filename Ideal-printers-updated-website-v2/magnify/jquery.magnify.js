(() => {
  const selector = 'a[data-lightbox], area[data-lightbox], a[rel^="lightbox"], area[rel^="lightbox"]';
  const links = () => Array.from(document.querySelectorAll(selector)).filter((link) => link.getAttribute("href"));

  let overlay;
  let image;
  let caption;
  let counter;
  let prevButton;
  let nextButton;
  let closeButton;
  let currentGroup = [];
  let currentIndex = 0;

  function groupName(link) {
    return link.getAttribute("data-lightbox") || link.getAttribute("rel") || "__single__";
  }

  function groupLinks(link) {
    const name = groupName(link);
    return links().filter((item) => groupName(item) === name);
  }

  function titleFor(link) {
    return link.getAttribute("data-title") || link.getAttribute("title") || "";
  }

  function ensureOverlay() {
    if (overlay) {
      return;
    }

    overlay = document.createElement("div");
    overlay.className = "custom-lightbox is-hidden";
    overlay.innerHTML = `
      <div class="custom-lightbox-backdrop" data-close="true"></div>
      <div class="custom-lightbox-stage">
        <button type="button" class="custom-lightbox-close" aria-label="Close image viewer">&times;</button>
        <button type="button" class="custom-lightbox-nav prev" aria-label="Previous image">&#10094;</button>
        <div class="custom-lightbox-content">
          <img class="custom-lightbox-image" alt="">
          <div class="custom-lightbox-meta">
            <div class="custom-lightbox-caption"></div>
            <div class="custom-lightbox-counter"></div>
          </div>
        </div>
        <button type="button" class="custom-lightbox-nav next" aria-label="Next image">&#10095;</button>
      </div>
    `;

    document.body.appendChild(overlay);

    image = overlay.querySelector(".custom-lightbox-image");
    caption = overlay.querySelector(".custom-lightbox-caption");
    counter = overlay.querySelector(".custom-lightbox-counter");
    prevButton = overlay.querySelector(".custom-lightbox-nav.prev");
    nextButton = overlay.querySelector(".custom-lightbox-nav.next");
    closeButton = overlay.querySelector(".custom-lightbox-close");

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay || event.target.dataset.close === "true") {
        closeLightbox();
      }
    });

    closeButton.addEventListener("click", closeLightbox);
    prevButton.addEventListener("click", () => showIndex(currentIndex - 1));
    nextButton.addEventListener("click", () => showIndex(currentIndex + 1));

    document.addEventListener("keydown", (event) => {
      if (!overlay || overlay.classList.contains("is-hidden")) {
        return;
      }

      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showIndex(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        showIndex(currentIndex + 1);
      }
    });
  }

  function showIndex(index) {
    if (!currentGroup.length) {
      return;
    }

    currentIndex = (index + currentGroup.length) % currentGroup.length;
    const link = currentGroup[currentIndex];

    image.src = link.getAttribute("href");
    image.alt = titleFor(link);
    caption.textContent = titleFor(link);
    counter.textContent = currentGroup.length > 1 ? `${currentIndex + 1} / ${currentGroup.length}` : "";
    prevButton.disabled = currentGroup.length < 2;
    nextButton.disabled = currentGroup.length < 2;
  }

  function openLightbox(link) {
    ensureOverlay();
    currentGroup = groupLinks(link);
    currentIndex = Math.max(0, currentGroup.indexOf(link));
    showIndex(currentIndex);
    overlay.classList.remove("is-hidden");
    document.body.classList.add("lb-disable-scrolling");
  }

  function closeLightbox() {
    if (!overlay) {
      return;
    }

    overlay.classList.add("is-hidden");
    document.body.classList.remove("lb-disable-scrolling");
    image.removeAttribute("src");
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest(selector);
    if (!link) {
      return;
    }

    event.preventDefault();
    openLightbox(link);
  });
})();

