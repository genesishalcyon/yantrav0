import Link from "next/link";
import { paramsToString, deserialize } from "@/lib/services/globalService";
import PRODUCTAPI from "@/lib/api/product/request";
import SuggestionProductThumbnail from "@/components/ehasp/product/partials/SuggestionProductThumbnail";
export default function RecommendedProducts() {
  const parameters = {
    "page[number]": 1,
    "page[size]": 4,
    include: "media,productTier",
  };

  const { data } = PRODUCTAPI.getProductsSwr(
    `/products?${paramsToString(parameters)}`,
    {
      revalidateOnFocus: false,
    }
  );

  const products = deserialize(data || {});

  return (
    <div className="pt-10 pb-12 bg-[#FFFFFF]">
      <div className="max-w-xl mx-auto px-4 xl:px-0 flex flex-col gap-y-8 items-center">
        <p className="text-[24px] md:text-[40px] leading-[24px] md:leading-[60px] font-[700] md:font-[600] px-4 xl:px-0 text-center">
          Here Are Some Products You Might Like
        </p>
        <div className="w-full gap-y-8 gap-x-6 grid grid-cols-2 lg:grid-cols-4">
          {products?.map((product, i) => (
            <SuggestionProductThumbnail key={i} product={product} />
          ))}
        </div>
        <Link
          href="/products"
          className="flex justify-center items-center bg-[#EE3424] px-8 py-3 rounded-[26px] w-full max-w-[367px] text-[#FFFFFF] text-[16px] leading-[24px] font-[600]"
        >
          Browse Our Catalogue
        </Link>
      </div>
    </div>
  );
}
