import {
  paramsToString,
  removeEmptyAttribute,
} from "@/lib/services/globalService";
import { useRouter } from "next/router";
import SearchIcon from "@/components/svg/SearchIcon";
import productStore from "@/lib/store/productStore";
import debounce from "lodash.debounce";
import { useEffect } from "react";
export default function Search({
  className = "flex items-center gap-x-2 p-4 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB]",
}) {
  const router = useRouter();
  const [selectedBrands, selectedCategories, customFilter] = productStore(
    (state) => [
      state.selectedBrands,
      state.selectedCategories,
      state.customFilter,
    ]
  );

  useEffect(() => {
    const queryString = window?.location?.search;
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get("search");
    productStore.setState({
      search: search || "",
    });
  }, []);

  const onSearch = (e) => {
    const search = e?.target?.value || "";
    productStore.setState({
      search,
      parametersInit: {
        "page[number]": 1, // Reset pagination
      },
    });

    let customFilterParams = {};
    customFilter.forEach((n) => {
      customFilterParams[n] = 1;
    });

    const params = {
      brands: selectedBrands.join(","),
      categories: selectedCategories.join(","),
      ...customFilterParams,
      search,
    };
    removeEmptyAttribute(params);
    router.replace(`/products?${paramsToString(params)}`, undefined, {
      shallow: true,
    });
  };

  const debounceHandler = debounce(onSearch, 1000);

  useEffect(() => {
    return () => {
      debounceHandler.cancel();
    };
  }, [debounceHandler]);
  return (
    <div className={className}>
      <SearchIcon />
      <input
        type="text"
        className="outline-none w-full font-poppins text-[#555555] text-[14px] leading-[24px] font-[500]"
        placeholder="Search"
        // value={search}
        onChange={(e) => debounceHandler(e)}
      />
    </div>
  );
}
