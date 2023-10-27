import { create } from "zustand";
import { devtools } from "zustand/middleware";
import REVIEWAPI from "@/lib/api/review/request";
import ORDERAPI from "@/lib/api/order/request";
let storeHandler = (set, get) => ({
  order: "",
  refetchOrder: () => {},
  reviewForm: {
    rating: 5,
    comment: "",
    media: [],
    order_line_id: "",
    is_anonymous: false,
  },
  reviewOnChange: (data) => {
    set(() => ({
      reviewForm: { ...get().reviewForm, ...data },
    }));
  },
  onReview: async (item) => {
    const payload = {
      ...get().reviewForm,
      product_id: item?.purchasable_data?.product_id,
      order_id: get().order?.id,
      order_line_id: item?.id,
      data: item?.purchasable_data?.combination || [],
    };
    return await REVIEWAPI.addReview(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  },
  bankTransferProofForm: {
    proof_of_payment: [],
    type: "bank-transfer",
    notes: "",
  },
  onChangeProofForm: (data) => {
    set(() => ({
      bankTransferProofForm: { ...get().bankTransferProofForm, ...data },
    }));
  },
  orderStatusForm: {
    type: "status",
    status: "",
    notes: "",
  },
  orderStatusFormOnChanged: (data) => {
    set(() => ({
      orderStatusForm: { ...get().orderStatusForm, ...data },
    }));
  },
  onUpdateStatus: async (reference, payload) => {
    return await ORDERAPI.updateOrderStatus(reference, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  },
});

storeHandler = devtools(storeHandler);
const store = create(storeHandler);

export default store;
