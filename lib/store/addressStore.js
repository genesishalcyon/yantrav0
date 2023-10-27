import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { deserialize } from "@/lib/services/globalService";
import ADDRESSAPI from "@/lib/api/address/request";
let storeHandler = (set, get) => ({
  activeAddress: "",
  dataHandler: {},
  addresses: [],
  reFetchAddress: () => {},
  countries: [],
  regions: [],
  addressForm: {
    address_line_1: "",
    country_id: "",
    state_id: "",
    city: "",
    zip_code: "",
    is_default_billing: false,
    is_default_shipping: false,
    label_as: "home",
  },
  trimAddress: (address) => {
    return {
      country_id: address?.country_id,
      state_id: parseInt(address?.state_id),
      address_line_1: address?.address_line_1,
      zip_code: address?.zip_code,
      city: address?.city,
      label_as: address?.label_as,
    };
  },
  formCompleted: () => {
    const form = get().addressForm;
    return form.address_line_1 &&
      form.country_id &&
      form.state_id &&
      form.state_id &&
      form.city &&
      form.zip_code &&
      form.label_as
      ? true
      : false;
  },
  addressLabel: (address) => {
    return `${address?.address_line_1}, ${address?.city}, ${
      address?.state?.name || address?.state
    }, ${address?.zip_code}, ${
      address?.state?.country?.code ||
      address?.country ||
      address?.country_id ||
      ""
    }`;
  },
  formErrors: "",
  fieldOnChange: (data) => {
    set(() => ({
      addressForm: { ...get().addressForm, ...data },
    }));
  },
  addAddress: async () => {
    set(() => ({ formErrors: "" }));
    const payload = get().addressForm;
    return await ADDRESSAPI.addAddress(payload, "?include=state")
      .then((res) => {
        const address = deserialize(res);
        return address;
      })
      .catch((err) => {
        set(() => ({
          formErrors: err?.data?.errors || "Invalid Address",
        }));
        throw err;
      });
  },
  updateAddress: async (id) => {
    set(() => ({ formErrors: "" }));
    const payload = get().addressForm;
    return await ADDRESSAPI.updateAddress(id, payload)
      .then((res) => {
        const address = deserialize(res);
        return address;
      })
      .catch((err) => {
        set(() => ({
          formErrors: err?.data?.errors || "Invalid Address",
        }));
        throw err;
      });
  },
  modalType: "addressTable",
  addressType: "shipping",
  checkoutAddress: {
    shipping: "",
    billing: "",
  },
  validateAddress: async () => {
    set(() => ({ formErrors: "" }));
    const payload = get().addressForm;
    return await ADDRESSAPI.validateAddress(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        set(() => ({
          formErrors:
            err?.data?.errors || err?.data?.message || "Invalid Address",
        }));
        throw err;
      });
  },
});

storeHandler = devtools(storeHandler);
const store = create(storeHandler);

export default store;
