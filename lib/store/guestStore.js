import { create } from "zustand";
import { devtools } from "zustand/middleware";
import ORDERAPI from "@/lib/api/order/request";
let storeHandler = (set, get) => ({
  trackOrderForm: {
    reference: "",
  },
  trackOrderFormError: "",
  submissionLoading: false,
  onChangeReference: (data) => {
    set(() => ({
      trackOrderForm: { ...get().trackOrderForm, ...data },
    }));
  },
  onTrack: async () => {
    set(() => ({ submissionLoading: true, trackOrderFormError: "" }));
    return await ORDERAPI.getOrderDetails(get().trackOrderForm.reference)
      .then(() => {
        setTimeout(() => {
          set(() => ({ submissionLoading: false }));
        }, 1000);
      })
      .catch((err) => {
        set(() => ({
          submissionLoading: false,
          trackOrderFormError:
            err?.data?.errors || "Unable to get order details.",
        }));
        throw err;
      });
  },
});

storeHandler = devtools(storeHandler);
const store = create(storeHandler);

export default store;
