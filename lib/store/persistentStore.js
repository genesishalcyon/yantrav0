import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
let storeHandler = (set, get) => ({
  profile: "",
  guest: {
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
  },
  shipping: "",
  billing: "",
  cartSelectedHandler: [],
  paymentMethod: "",
  shippingMethod: "",
  rateId: "",
  reference: "",
  discountForm: {
    discountCodeHandler: "",
    discountCode: "",
  },
  onChangeCode: (data) => {
    set(() => ({
      discountForm: { ...get().discountForm, ...data },
    }));
  },
  locale: "en",
});
storeHandler = devtools(storeHandler);
storeHandler = persist(storeHandler, { name: "persistent" });
const store = create(storeHandler);
export default store;
