import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * Loads images when the user starts interacting to page through scroll, mousemove, or touchstart
 *
 * Add to image targets:
 * - classname: load-on-interaction
 * - src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
 * - data-src: actual_image_source
 */
const useLazyInteractions = () => {
  const QUERY_SELECTOR = "img.load-on-interaction";
  const { asPath } = useRouter();

  useEffect(() => {
    const addListeners = () => {
      document.addEventListener("scroll", loadImages, { passive: true });
      document.addEventListener("mousemove", loadImages, { passive: true });
      document.addEventListener("touchstart", loadImages, { passive: true });
    };

    const removeListeners = () => {
      document.removeEventListener("scroll", loadImages, { passive: true });
      document.removeEventListener("mousemove", loadImages, {
        passive: true,
      });
      document.removeEventListener("touchstart", loadImages, {
        passive: true,
      });
    };

    const loadImages = () => {
      const lazyImages = Array.from(document.querySelectorAll(QUERY_SELECTOR));
      if (lazyImages) {
        lazyImages.forEach((lazyImage, index) => {
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImage.classList.add("lazyloaded");
        });
      }

      removeListeners();
    };

    addListeners();

    return () => {
      removeListeners();
    };
  }, [asPath]);
};

export default useLazyInteractions;
