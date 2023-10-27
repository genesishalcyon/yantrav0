// import { paramsToString, deserialize } from "@/lib/services/globalService";
// import PRODUCTAPI from "@/lib/api/product/request";
import SuggestionProductThumbnail from "@/components/ehasp/product/partials/SuggestionProductThumbnail";
import relatedProducts from "@/lib/preBuildScripts/static/relatedProducts.json";
export default function RelatedProducts({ item }) {
  // get categories
  const categories = item.taxonomyTerms
    ?.map((category) => category.id)
    .splice(1, item.taxonomyTerms.length);

  // const parameters = {
  //   "page[number]": 1,
  //   "page[size]": 4,
  //   "filter[taxonomies][categories]": categories,
  //   include: "media",
  //   // include: "media,productTier",
  // };

  // const { data } = PRODUCTAPI.getProductsSwr(
  //   `/products?${paramsToString(parameters)}`,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );

  // const products = deserialize(data || {});

  const products = relatedProducts?.products?.[categories] || [];

  return (
    <div className="flex flex-col pb-8 gap-y-8">
      <p className="text-[24px] md:text-[35px] leading-[24px] md:leading-[60px] font-[700] md:font-[700] text-[#0A0903]">
        Related Products
      </p>
      <div className="grid w-full grid-cols-2 gap-y-8 gap-x-6 lg:grid-cols-4">
        {products?.map((product, i) => (
          <SuggestionProductThumbnail key={i} product={product} />
        ))}
      </div>
    </div>
  );
}
