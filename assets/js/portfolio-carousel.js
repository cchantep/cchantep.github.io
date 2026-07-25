document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".portfolio-carousel__track");
  const slides = Array.from(track.children);

  const previous = carousel.querySelector(".portfolio-carousel__prev");
  const next = carousel.querySelector(".portfolio-carousel__next");

  let current = 0;

  function visibleSlides() {
    const containerWidth = track.parentElement.clientWidth;
    const slideWidth = slides[0].getBoundingClientRect().width;

    return Math.max(1, Math.floor(containerWidth / slideWidth));
  }

  function maxIndex() {
    return Math.max(0, slides.length - visibleSlides());
  }

  function updateNavigation() {
    const max = maxIndex();

    // Hide navigation if everything fits
    const hasOverflow = max > 0;

    previous.classList.toggle("is-hidden", !hasOverflow);
    next.classList.toggle("is-hidden", !hasOverflow);

    if (!hasOverflow) {
      return;
    }

    // Disable unavailable directions
    previous.disabled = current === 0;
    next.disabled = current === max;
  }

  function update() {
    const slideWidth = slides[0].getBoundingClientRect().width;

    track.style.transform =
      `translateX(-${current * slideWidth}px)`;

    updateNavigation();
  }

  previous.addEventListener("click", () => {
    if (current > 0) {
      current--;
      update();
    }
  });

  next.addEventListener("click", () => {
    if (current < maxIndex()) {
      current++;
      update();
    }
  });

  window.addEventListener("resize", () => {
    current = Math.min(current, maxIndex());
    update();
  });

  update();
});