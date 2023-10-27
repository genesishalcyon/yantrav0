import { currency } from "@/lib/services/currencyService";
import productStore from "@/lib/store/productStore";
import persistentStore from "@/lib/store/persistentStore";
export default function ProductPrice({ product }) {
  const profile = persistentStore((state) => state.profile);
  const findPrice = productStore((state) => state.findPrice);
  const discountedSellingPrice = findPrice(
    profile,
    product,
    product.selling_price
  );
  return (
    <p className="text-[14px] leading-[16px] md:text-[16px] md:leading-[24px] font-[600]">
      <span className="text-[#555555]">
        {`${currency} ${discountedSellingPrice}`}
      </span>
      {Number(product.retail_price) > Number(discountedSellingPrice) && (
        <span className="text-[#AAAAAA] line-through font-[400] ml-3">{`${currency} ${product.retail_price}`}</span>
      )}
    </p>
  );
}
