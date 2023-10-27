import { create } from "zustand";
import { devtools } from "zustand/middleware";
import PRODUCTAPI from "@/lib/api/product/request";
import { deserialize } from "@/lib/services/globalService";
let storeHandler = (set, get) => ({
  parametersInit: {
    "page[number]": 1,
  },
  allProducts: [],
  productMeta: {},
  search: "",
  isLoading: false,
  brands: [],
  categories: [],
  quantity: 1,
  totalSold: 0,
  totalReviews: 0,
  findPrice: (profile, product, sellingPrice) => {
    if (profile?.tier_id && product?.productTier) {
      const tiers = product.productTier;
      const discountTier = tiers.find((n) => n?.tier_id == profile.tier_id);
      if (discountTier && discountTier.discount) {
        if (discountTier.discount_amount_type === "percentage") {
          const percentValue = discountTier.discount / 100;
          const discount = sellingPrice * percentValue;
          const newSellingPrice = sellingPrice - discount;
          return newSellingPrice.toFixed(2);
        } else {
          const newSellingPrice = sellingPrice - discountTier.discount;
          return newSellingPrice.toFixed(2);
        }
      }
    }
    return sellingPrice;
  },
  updateAllProducts: (id, key, value) => {
    const products = get().allProducts.map((p) => {
      if (id === p.id) {
        p[key] = value;
      }
      return p;
    });
    set(() => ({ allProducts: products }));
  },
  loadMore: (params) => {
    if (get().productMeta?.current_page < get().productMeta?.last_page) {
      set(() => ({ isLoading: true }));
      PRODUCTAPI.getProducts(params).then((res) => {
        const newItems = deserialize(res);
        const mergedItems = [...get().allProducts, ...newItems];
        set(() => ({ allProducts: mergedItems, isLoading: false }));
        if (res?.meta) {
          set(() => ({ productMeta: res.meta }));
        }
      });
    }
  },
  selectAttributes: {},
  selectedCategories: [],
  selectedBrands: [],
  customFilter: [],
  showFilter: false,
});

storeHandler = devtools(storeHandler);
const store = create(storeHandler);

export default store;
