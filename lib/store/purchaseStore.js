import { create } from "zustand";
import { devtools } from "zustand/middleware";
let storeHandler = () => ({
  pages: [5, 10, 25, 50],
  activeStatus: "",
  sort: "-created_at",
  pagination: {
    current_page: 1,
    per_page: 5,
  },
});
storeHandler = devtools(storeHandler);
const store = create(storeHandler);

export default store;
