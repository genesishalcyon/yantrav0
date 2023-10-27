import ProductVariants from "@/components/ehasp/product/partials/ProductVariants";
import ProductMedia from "@/components/ehasp/partials/ProductMedia";
import productStore from "@/lib/store/productStore";
import PRODUCTAPI from "@/lib/api/product/request";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import AddtoCartButton from "@/components/ehasp/cart/partials/AddtoCartButton";
import PageLoading from "@/components/page/PageLoading";
import ProductRemarksButton from "@/components/ehasp/product/partials/ProductRemarksButton";
import ProductQuantity from "@/components/ehasp/product/partials/ProductQuantity";
import FavoriteButton from "@/components/ehasp/product/partials/FavoriteButton";
import ProductReviews from "@/components/ehasp/product/review/ProductReviews";
import RelatedProducts from "@/components/ehasp/product/partials/RelatedProducts";
import ProductDiscountIcon from "@/components/svg/ProductDiscountIcon";
import persistentStore from "@/lib/store/persistentStore";
import { deserialize } from "@/lib/services/globalService";
import { currency } from "@/lib/services/currencyService";
import { shallow } from "zustand/shallow";
export default function Products() {
  const router = useRouter();
  const { slug = null } = router?.query || {};
  const profile = persistentStore((state) => state.profile);
  const { data } = PRODUCTAPI.findProductCustomSwr(
    `/products/${slug}?include=media,productVariants,productOptions,taxonomyTerms,productTier`,
    {
      render: slug,
    }
  );
  const item = data ? deserialize(data) : "";
  const [selectAttributes, findPrice] = productStore(
    (state) => [state.selectAttributes, state.findPrice],
    shallow
  );
  const variants = item?.productVariants || [];
  const selectedVariant = useMemo(() => {
    // Idea - selected attributes is === to variant combination attributes
    const selectAttributesKeys = Object.keys(selectAttributes).sort();
    const formattesAttribute = {};
    selectAttributesKeys.forEach((e) => {
      formattesAttribute[e] = selectAttributes[e];
    });
    return variants.find((variant) => {
      let combination = {};
      variant.combination.forEach((c) => {
        combination[c.option] = c.option_value;
      });
      const combinationKeys = Object.keys(combination).sort();
      const formattedCombination = {};
      combinationKeys.forEach((e) => {
        formattedCombination[e] = combination[e];
      });
      return (
        JSON.stringify(formattesAttribute) ===
        JSON.stringify(formattedCombination)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAttributes]);

  useEffect(() => {
    // Reset attributes and quantity
    productStore.setState({
      quantity: 1,
      selectAttributes: {},
    });
  }, [router]);

  const PriceDisplay = () => {
    const sellingPrice = selectedVariant?.selling_price || item.selling_price;
    const discountedSellingPrice = findPrice(profile, item, sellingPrice);
    const retailPrice = selectedVariant?.retail_price || item.retail_price;
    return (
      <div className="flex flex-nowrap items-center gap-x-[2px] md:gap-x-4 leading-[20px] text-[18px] md:leading-[27px]">
        {Number(retailPrice) > Number(discountedSellingPrice) && (
          <ProductDiscountIcon />
        )}
        <div className="flex gap-x-3">
          <p className="text-[#F05769] font-[600]">
            {`${currency} ${discountedSellingPrice}`}
            {Number(retailPrice) > Number(discountedSellingPrice) && (
              <span className="text-[#AAAAAA] line-through font-[400] ml-3">{`${currency} ${retailPrice}`}</span>
            )}
          </p>
        </div>
      </div>
    );
  };

  // const htmlText =
  //   "<p>This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text. This is fill in text. It is here temporarily, and will be replaced with the proper text shortly. It is repeated many times so we will see what the website will look like with text.</p><ul><li>This is fill in text. It is here temporarily, and will be replaced with the proper text shortly.</li><li>This is fill in text. It is here temporarily, and will be replaced with the proper text shortly.</li><li>This is fill in text. It is here temporarily, and will be replaced with the proper text shortly.</li><li>This is fill in text. It is here temporarily, and will be replaced with the proper text shortly.</li><li>This is fill in text. It is here temporarily, and will be replaced with the proper text shortly.</li></ul>";

  return (
    <>
      {item ? (
        <div className="max-w-xl mx-auto py-8 px-4 xl:px-0">
          <div className="flex flex-col gap-y-8">
            <div className="p-4 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB]">
              <div className="flex flex-wrap lg:flex-nowrap gap-x-8 gap-y-2">
                <div className="w-full lg:w-[50%]">
                  <ProductMedia item={item} />
                </div>
                <div className="w-full md:w-[50%] flex flex-col gap-y-5 md:gap-y-6 md:p-6">
                  <div className="flex flex-col gap-y-2 md:gap-y-4">
                    <h1 className="text-[24px] leading-[26px] md:text-[32px] md:leading-[48px] font-[600] line-clamp-2 text-[#231F20]">
                      {item.name}
                    </h1>
                    <PriceDisplay />
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>

                  <ProductVariants product={item} />

                  {!!item.allow_customer_remarks && <ProductRemarksButton />}

                  <div className="flex flex-col gap-y-8">
                    <div className="flex justify-between">
                      <ProductQuantity
                        item={item}
                        selectedVariant={selectedVariant}
                      />
                      {!!(
                        item?.allow_stocks &&
                        (selectedVariant ? selectedVariant.stock : item.stock)
                      ) && (
                        <div className="flex items-center text-[#555555] text-sm">
                          <p>
                            Stocks:
                            {selectedVariant
                              ? selectedVariant.stock
                              : item.stock}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-x-8">
                      <AddtoCartButton
                        selectedVariant={selectedVariant}
                        product={item}
                      />

                      <FavoriteButton
                        product={item}
                        className="w-[55px] h-full border-[1px] border-[#0F172A] rounded-full flex justify-center items-center"
                        favoriteColor="#EE3424"
                        unfavoriteColor="#555555"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className=" px-10 py-8 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB]">
              <p className="text-[32px] leading-[48px] font-[600] text-[#231F20]">
                Description
              </p>
              <div
                className="product-description w-full py-6 text-[#555555]"
                dangerouslySetInnerHTML={{ __html: htmlText }}
              ></div>
            </div> */}
            <ProductReviews product={item} />
            <RelatedProducts item={item} />
          </div>
        </div>
      ) : (
        <PageLoading className="!bg-transparent relative !h-[500px]" />
      )}
    </>
  );
}
