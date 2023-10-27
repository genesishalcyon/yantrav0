import { create } from "zustand";
import { devtools } from "zustand/middleware";
import AUTHAPI from "@/lib/api/auth/request";
import CUSTOMERAPI from "@/lib/api/customer/request";
import FAVORITEAPI from "@/lib/api/favorites/request";
import persistentStore from "@/lib/store/persistentStore";
import favoriteStore from "@/lib/store/favoriteStore";
import { deserialize } from "@/lib/services/globalService";
import registrationForm from "@/lib/constant/registrationForm";
let storeHandler = (set, get) => ({
  ...registrationForm,
  loginForm: {
    email: "",
    password: "",
  },
  resetPasswordForm: {
    password: "",
    password_confirmation: "",
  },
  forgotPasswordForm: {
    email: "",
  },
  registrationError: "",
  loginError: "",
  forgotFormError: "",
  resetPasswordFormError: "",
  verifyFormError: "",
  submissionLoading: false,
  onChangeLogin: (data) => {
    set(() => ({
      loginForm: { ...get().loginForm, ...data },
    }));
  },
  onLogin: async () => {
    set(() => ({ submissionLoading: true, loginError: "" }));
    await Promise.all([
      await AUTHAPI.login(get().loginForm).catch((err) => {
        set(() => ({
          submissionLoading: false,
          loginError: err?.data?.errors || "Incorrect email or password",
        }));
        throw err;
      }),
      await CUSTOMERAPI.profile().then((res) => {
        const profile = deserialize(res);
        persistentStore.setState({ profile });
      }),
      await FAVORITEAPI.getFavorites("?sort=-updated_at").then((res) => {
        const favorites = deserialize(res) || [];
        favoriteStore.setState({
          productIds: favorites.map((n) => n.product_id),
        });
      }),
    ]);
    set(() => ({ submissionLoading: false }));
  },
  onChangeInfo: (data) => {
    set(() => ({
      registrationForm: { ...get().registrationForm, ...data },
    }));
  },
  onChangeShippingAddress: (data) => {
    set(() => ({
      shippingAddress: { ...get().shippingAddress, ...data },
    }));
  },
  onChangeBillingAddress: (data) => {
    set(() => ({
      billingAddress: { ...get().billingAddress, ...data },
    }));
  },
  onRegister: async () => {
    const personalInfo = get().registrationForm;
    const shipping = get().shippingAddress;
    const billing = get().billingAddress;
    let payload = {};
    if (billing.same_as_shipping) {
      payload = {
        ...personalInfo,
        shipping,
        billing: {
          same_as_shipping: 1,
        },
      };
    } else {
      payload = {
        ...personalInfo,
        shipping,
        billing,
      };
    }
    set(() => ({ submissionLoading: true, registrationError: "" }));
    return await AUTHAPI.register(payload)
      .then(() => {
        // Reset form
        set(() => ({
          submissionLoading: false,
          ...registrationForm,
        }));
      })
      .catch((err) => {
        set(() => ({
          submissionLoading: false,
          registrationError: err?.data?.errors || "Registration Failed",
        }));
        throw err;
      });
  },
  onChangeForgot: (data) => {
    set(() => ({
      forgotPasswordForm: { ...get().forgotPasswordForm, ...data },
    }));
  },
  onForgotPassword: async () => {
    set(() => ({ submissionLoading: true, forgotFormError: "" }));
    return await AUTHAPI.forgotPassword(get().forgotPasswordForm)
      .then(() => {
        set(() => ({
          submissionLoading: false,
        }));
      })
      .catch((err) => {
        set(() => ({
          submissionLoading: false,
          forgotFormError:
            err?.data?.errors || err?.data?.message || "Forgot password failed",
        }));
        throw err;
      });
  },
  onChangeReset: (data) => {
    set(() => ({
      resetPasswordForm: { ...get().resetPasswordForm, ...data },
    }));
  },
  onResetPassword: async (token, email) => {
    const payload = {
      ...get().resetPasswordForm,
      token,
      email,
    };
    set(() => ({ submissionLoading: true, resetPasswordFormError: "" }));
    return await AUTHAPI.resetPassword(payload)
      .then(() => {
        set(() => ({
          submissionLoading: false,
        }));
      })
      .catch((err) => {
        set(() => ({
          submissionLoading: false,
          resetPasswordFormError:
            err?.data?.errors || err?.data?.message || "Reset password failed",
        }));
        throw err;
      });
  },
  onVerify: async () => {
    set(() => ({ submissionLoading: true }));
    return await AUTHAPI.verifyAccount()
      .then(() => {
        set(() => ({
          submissionLoading: false,
        }));
      })
      .catch((err) => {
        set(() => ({
          submissionLoading: false,
        }));
        throw err;
      });
  },
});

storeHandler = devtools(storeHandler);
const store = create(storeHandler);

export default store;
