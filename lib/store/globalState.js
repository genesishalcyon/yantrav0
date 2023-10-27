import { create } from "zustand";
export default create((set, get) => ({
  submitLoading: false,
  uploading: false,
  captcha: {},
  ready: false,
  showLazy: false,
  formSuccessInfo: false,
  dialog: false,
  sessionExpired: false,
  authModalTrigger: "",
  closeAuthModalTrigger: "",
  authModal: {
    type: "",
  },
  modalInit: "",
  showAuthModal: (type) => {
    set(() => ({
      authModal: {
        type,
      },
    }));
    get().authModalTrigger?.current?.click();
  },
  closeAuthModal: () => {
    get().closeAuthModalTrigger?.current?.click();
  },
  closeSideBarTrigger: "",
  closeSideBar: () => {
    get().closeSideBarTrigger?.current?.click();
  },
  confirm: {
    icon: "",
    title: "",
    message: "",
    continueLabel: "Continue",
    cancelLabel: "Cancel",
    loading: false,
    info: "",
    onContinue: async () => {},
    onCancel: () => {},
    action: async () => {
      set(() => ({ confirm: { ...get().confirm, loading: true } }));
      await get().confirm.onContinue();
      set(() => ({ confirm: { ...get().confirm, loading: false } }));
    },
  },
  sidebar: {
    open: "",
    type: "",
    title: "",
  },
  showMenu: false,
}));
