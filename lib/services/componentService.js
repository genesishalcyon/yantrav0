import dynamic from "next/dynamic";
// import MainBanner from "@/components/blocks/MainBanner";
// import WholeSalePromotion from "@/components/blocks/WholeSalePromotion";
// import FeaturedProducts from "@/components/blocks/FeaturedProducts";
// import SpecialOffer from "@/components/blocks/SpecialOffer";
// import Categories from "@/components/blocks/Categories";
// import AboutUs from "@/components/blocks/AboutUs";
// import Gallery from "@/components/blocks/Gallery";
// import OurReasons from "@/components/blocks/OurReasons";
// import OurResults from "@/components/blocks/OurResults";
// import Articles from "@/components/blocks/Articles";
// import Contact from "@/components/blocks/Contact";
export const components = {
  // MainBanner,
  // WholeSalePromotion,
  // FeaturedProducts,
  // SpecialOffer,
  // Categories,
  // AboutUs,
  // Gallery,
  // OurReasons,
  // OurResults,
  // Articles,
  // Contact,
  MainBanner: dynamic(() =>
    import("../../components/blocks/MainBanner").then(
      (module) => module.default
    )
  ),
  WholeSalePromotion: dynamic(() =>
    import("../../components/blocks/WholeSalePromotion").then(
      (module) => module.default
    )
  ),
  FeaturedProducts: dynamic(() =>
    import("../../components/blocks/FeaturedProducts").then(
      (module) => module.default
    )
  ),
  SpecialOffer: dynamic(() =>
    import("../../components/blocks/SpecialOffer").then(
      (module) => module.default
    )
  ),
  Categories: dynamic(() =>
    import("../../components/blocks/Categories").then(
      (module) => module.default
    )
  ),
  AboutUs: dynamic(() =>
    import("../../components/blocks/AboutUs").then((module) => module.default)
  ),
  Gallery: dynamic(() =>
    import("../../components/blocks/Gallery").then((module) => module.default)
  ),
  OurReasons: dynamic(() =>
    import("../../components/blocks/OurReasons").then(
      (module) => module.default
    )
  ),
  OurResults: dynamic(() =>
    import("../../components/blocks/OurResults").then(
      (module) => module.default
    )
  ),
  Articles: dynamic(() =>
    import("../../components/blocks/Articles").then((module) => module.default)
  ),
  Contact: dynamic(() =>
    import("../../components/blocks/Contact").then((module) => module.default)
  ),
};
