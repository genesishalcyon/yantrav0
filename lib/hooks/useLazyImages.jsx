import { useRouter } from "next/router";
import { useEffect } from "react";
import globalState from "../store/globalState";

/**
 * Loads images when the image is in the user viewport
 *
 * Add to image targets:
 * - classname: load-on-interaction
 * - src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
 * - data-src: actual_image_source
 */
const useLazyImages = () => {
  const { asPath } = useRouter();
  const showLazy = globalState((state) => state.showLazy);
  useEffect(() => {
    const lazyImages = Array.from(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
      const lazyImageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              // lazyImage.srcSet = lazyImage.dataset.srcSet;
              lazyImage.classList.remove("lazy");
              lazyImage.classList.add("lazyloaded");
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        }
      );

      lazyImages.forEach((lazyImage) => {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Possibly fall back to event handlers here
    }
  }, [asPath, showLazy]);
};

export default useLazyImages;
