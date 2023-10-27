import { create } from "zustand";
import { devtools } from "zustand/middleware";
import SHIPPINGMETHODAPI from "@/lib/api/shippingMethod/request";
let storeHandler = (set, get) => ({
  paymentMethods: [],
  shippingMethods: [],
  showRate: false,
  paymentMethod: "",
  shippingMethod: "",
  serviceMethod: "",
  paymentMethodHandler: "",
  shippingMethodHandler: "",
  serviceMethodHandler: "",
  bankTransferInstruction: {},
  rates: {},
  fetchRates: false,
  getShippingRates: (method, shippingAddress, cart_line_ids) => {
    SHIPPINGMETHODAPI.getShippingRates(
      method.id,
      shippingAddress.id,
      `?cart_line_ids=${cart_line_ids}`
    )
      .then((res) => {
        set(() => ({ [method.attributes.driver.replace(/-/g, "")]: res }));
      })
      .catch((err) => {
        const { message = "" } = err?.data || {};
        set(() => ({
          [`${method.attributes.driver.replace(/-/g, "")}Error`]: message,
        }));
      });
  },
  postShippingRates: (method, cart_line_ids, shipping) => {
    const payload = {
      cart_line_ids: cart_line_ids.split(",") || [],
      courier: method.id,
      receiver: {
        first_name: "Halcyon",
        last_name: "Developer",
      },
      destination_address: {
        address: shipping?.address_line_1,
        country: shipping?.country_id,
        state: shipping?.state_id,
        city: shipping?.city,
        zipcode: shipping?.zip_code,
      },
    };
    SHIPPINGMETHODAPI.postShippingRates(payload)
      .then((res) => {
        set(() => ({ [method.attributes.driver.replace(/-/g, "")]: res }));
      })
      .catch((err) => {
        const { message = "" } = err?.data || {};
        set(() => ({
          [`${method.attributes.driver.replace(/-/g, "")}Error`]: message,
        }));
      });
  },
  resetShipping: () => {
    set({
      shippingMethod: "",
      serviceMethod: "",
      shippingMethodHandler: "",
      serviceMethodHandler: "",
    });
  },
});
storeHandler = devtools(storeHandler);
const store = create(storeHandler);

export default store;
