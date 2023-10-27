import { create } from "zustand";
import { devtools } from "zustand/middleware";
let storeHandler = (set, get) => ({
  pagination: {
    current_page: 1,
    per_page: 5,
  },
  sort: "",
  selected: [],
  accountParams: () => {
    return {
      "page[size]": get().pagination?.per_page,
      "page[number]": get().pagination?.current_page,
      sort: get().sort,
    };
  },
  onPaginate: (page) => {
    set(() => ({
      pagination: page,
    }));
  },
  onSort: (data) => {
    set(() => ({
      sort: data,
    }));
  },
  onSelect: (data) => {
    set(() => ({ selected: data }));
  },
});

storeHandler = devtools(storeHandler);
const store = create(storeHandler);

export default store;
