import { create } from "zustand";
import { devtools } from "zustand/middleware";
import CUSTOMERAPI from "@/lib/api/customer/request";
let storeHandler = (set, get) => ({
  account: {},
  submissionLoading: false,
  infoError: "",
  informationForm: {},
  onChangeInfo: (data) => {
    set(() => ({
      informationForm: { ...get().informationForm, ...data },
    }));
  },
  onUpdateInfo: async (payload) => {
    set(() => ({ submissionLoading: true, infoError: "" }));
    return await CUSTOMERAPI.updateProfile(payload)
      .then(() => {
        set(() => ({ submissionLoading: false, infoError: "" }));
        return;
      })
      .catch((err) => {
        set(() => ({
          submissionLoading: false,
          infoError: err?.data?.errors || "Update info successfully failed",
        }));
        throw err;
      });
  },
  passwordError: "",
  passwordForm: {
    current_password: "",
    password: "",
    password_confirmation: "",
  },
  onChangePaswword: (data) => {
    set(() => ({
      passwordForm: { ...get().passwordForm, ...data },
    }));
  },
  onUpdatePassword: async () => {
    const payload = get().passwordForm;
    set(() => ({ submissionLoading: true, passwordError: "" }));
    return await CUSTOMERAPI.updatePassword(payload)
      .then(() => {
        set(() => ({ submissionLoading: false, passwordError: "" }));
        return;
      })
      .catch((err) => {
        set(() => ({
          submissionLoading: false,
          passwordError: err?.data?.errors || "Update password failed",
        }));
        throw err;
      });
  },
});

storeHandler = devtools(storeHandler);
const store = create(storeHandler);

export default store;
