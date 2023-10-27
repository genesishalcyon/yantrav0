const initializeLazyLoading = () => {
  const lazyImages = Array.from(document.querySelectorAll(".lazy"));

  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          // lazyImage.srcSet = lazyImage.dataset.srcSet;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to event handlers here
  }
};

export default initializeLazyLoading;
