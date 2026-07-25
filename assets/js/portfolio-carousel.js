document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".portfolio-carousel__track");
  const slides = Array.from(track.children);

  const previous = carousel.querySelector(".portfolio-carousel__prev");
  const next = carousel.querySelector(".portfolio-carousel__next");
  const dots = carousel.querySelector(".portfolio-carousel__dots");

  let current = 0;

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.querySelectorAll("button").forEach((dot, index) => {
      dot.setAttribute(
        "aria-current",
        index === current ? "true" : "false"
      );
    });
  }

  // Create navigation dots
  slides.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "portfolio-carousel__dot";
    dot.setAttribute(
      "aria-label",
      `Go to project ${index + 1}`
    );

    dot.addEventListener("click", () => {
      current = index;
      update();
    });

    dots.appendChild(dot);
  });

  previous.addEventListener("click", () => {
    current = current > 0 ? current - 1 : slides.length - 1;
    update();
  });

  next.addEventListener("click", () => {
    current = current < slides.length - 1 ? current + 1 : 0;
    update();
  });

  // Keyboard navigation
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      current = current > 0 ? current - 1 : slides.length - 1;
      update();
    }

    if (event.key === "ArrowRight") {
      current = current < slides.length - 1 ? current + 1 : 0;
      update();
    }
  });

  carousel.tabIndex = 0;

  update();
});