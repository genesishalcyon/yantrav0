import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
let storeHandler = (set, get) => ({
  productIds: [],
});
storeHandler = devtools(storeHandler);
storeHandler = persist(storeHandler, { name: "favorites" });
const store = create(storeHandler);
export default store;
