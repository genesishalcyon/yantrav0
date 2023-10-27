import { create } from "zustand";
import { devtools } from "zustand/middleware";
import CARTAPI from "@/lib/api/cart/request";
const { toast } = await import("react-toastify");
import { formatProduct, maxQuantity } from "@/lib/services/productService";
import { parseCookies, setCookie } from "nookies";
import { auth } from "@/lib/services/globalService";
const SESSION = process.env.NEXT_PUBLIC_SESSION || "";
let storeHandler = (set, get) => ({
  cartItems: [],
  activeItem: "",
  isActive: (item) => {
    const product = formatProduct(item);
    const remainingStocks =
      product?.allow_stocks === true ? item?.purchasable?.stock : maxQuantity;
    return remainingStocks &&
      item?.purchasable?.status &&
      product.status &&
      product?.minimum_order_quantity <= item.quantity
      ? true
      : false;
  },
  hasStock: (item) => {
    const product = formatProduct(item);
    const remainingStocks =
      product?.allow_stocks === true ? item?.purchasable?.stock : maxQuantity;
    return !!(remainingStocks && item?.purchasable?.status && product.status);
  },
  activeItems: () => {
    return get().cartItems.filter((item) => get().isActive(item));
  },
  cartRefetch: () => {},
  isAllSelected: () => {
    return !get().cartItems.filter((e) => e.selected !== true).length;
  },
  subTotal: () => {
    let total = 0;
    get()
      .cartItems.filter((e) => e.selected)
      .forEach((e) => {
        total += e?.purchasable?.product?.selling_price * e.quantity;
      });
    return total.toFixed(2);
  },
  grandTotal: () => {
    let total = 0;
    get()
      .cartItems.filter((e) => e.selected)
      .forEach((e) => {
        total += e?.purchasable?.product?.selling_price * e.quantity;
      });
    total += get().shippingFee + get().tax - get().discount;
    return total.toFixed(2);
  },
  removeCartItem: (id) => {
    set(() => ({ cartItems: get().cartItems.filter((e) => e.id !== id) }));
  },
  updateQuantity: async (id, quantity) => {
    await CARTAPI.updateQuantity(id, {
      quantity,
      type: "quantity",
    })
      .then(() => {
        get().refetchSummary();
        set(() => ({
          cartItems: get().cartItems.map((e) => {
            if (e.id === id) {
              e.quantity = quantity > 0 ? quantity : 1;
            }
            return e;
          }),
        }));
      })
      .catch((err) => {
        throw err;
      });
  },
  updateRemarks: (item, key, value) => {
    set(() => ({
      cartItems: get().cartItems.map((e) => {
        if (e.id === item.id) {
          e[key] = value;
        }
        return e;
      }),
    }));
  },
  resetRemarks: () => {
    set(() => ({
      remarksForm: {
        notes: "",
        media: [],
      },
    }));
  },
  remarksForm: {
    notes: "",
    media: [],
  },
  onChangeRemarks: (data) => {
    set(() => ({
      remarksForm: { ...get().remarksForm, ...data },
    }));
  },
  updateGlobalSelection: (status) => {
    set(() => ({
      cartItems: get().cartItems.map((e) => {
        e.selected = status;
        return e;
      }),
    }));
  },
  updateSelection: (id, status) => {
    set(() => ({
      cartItems: get().cartItems.map((e) => {
        if (e.id === id) {
          e.selected = status;
        }
        return e;
      }),
    }));
  },
  selectedItems: () => {
    return get().cartItems.filter((e) => e.selected);
  },
  reCount: () => {},
  refetchSummary: () => {},
  addingToCart: false,
  addToCart: async (payload) => {
    set(() => ({ addingToCart: true }));
    await CARTAPI.addToCart(payload)
      .then((res) => {
        toast.success("Added to cart successfully.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (!auth) {
          const cookies = parseCookies();
          if (!cookies?.[SESSION] && res?.session_id) {
            setCookie({}, SESSION, res.session_id, {
              path: "/",
              maxAge: 86400,
            });
          }
        }
        get().reCount();
      })
      .catch((err) => {
        set(() => ({ addingToCart: false }));
        throw err;
      });
    set(() => ({ addingToCart: false }));
  },
  hasSelected: (cartSelectedHandler) => {
    return get().cartItems.some((e) =>
      cartSelectedHandler.some((c) => e.id === c)
    );
  },
  filteredSelectedItems: (cartSelectedHandler) => {
    return (
      get()
        .activeItems()
        ?.filter((n) => cartSelectedHandler.includes(n.id)) || []
    );
  },
});

storeHandler = devtools(storeHandler);
const store = create(storeHandler);

export default store;
