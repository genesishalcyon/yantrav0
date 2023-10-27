import { create } from "zustand";
import { devtools } from "zustand/middleware";
let storeHandler = () => ({});
storeHandler = devtools(storeHandler);
const store = create(storeHandler);
export default store;
