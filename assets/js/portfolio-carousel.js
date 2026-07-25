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
    const hasOverflow = slides.length > visibleSlides();

    previous.classList.toggle("is-hidden", !hasOverflow);
    next.classList.toggle("is-hidden", !hasOverflow);

    current = Math.min(current, maxIndex());
  }

  function update() {
    const slideWidth = slides[0].getBoundingClientRect().width;

    track.style.transform =
      `translateX(-${current * slideWidth}px)`;

    updateNavigation();
  }

  previous.addEventListener("click", () => {
    current = Math.max(0, current - 1);
    update();
  });

  next.addEventListener("click", () => {
    current = Math.min(maxIndex(), current + 1);
    update();
  });

  window.addEventListener("resize", update);

  update();
});