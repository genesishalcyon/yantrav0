import { useRouter } from "next/router";
import productStore from "@/lib/store/productStore";
import FilterTaxonomies from "@/components/ehasp/product/partials/FilterTaxonomies";
import FilterCustom from "@/components/ehasp/product/partials/FilterCustom";
import DropdownFilter from "@/components/ehasp/product/partials/DropdownFilter";
import customFilterStatic from "@/lib/constant/customFilter";
import FilterIcon from "@/components/svg/FilterIcon";
import CloseIcon from "@/components/svg/CloseIcon";
import { useEffect } from "react";
export default function Filter() {
  const router = useRouter();
  const [categories, brands, selectedBrands, selectedCategories, showFilter] =
    productStore((state) => [
      state.categories,
      state.brands,
      state.selectedBrands,
      state.selectedCategories,
      state.showFilter,
    ]);

  const taxonomiesData = [
    {
      id: "brands",
      keyword: "selectedBrands",
      selected: selectedBrands.join(","),
      title: "Brands",
      taxonomies: brands,
    },
    {
      id: "categories",
      keyword: "selectedCategories",
      selected: selectedCategories.join(","),
      title: "Categories",
      taxonomies: categories,
    },
  ];

  const params = {
    brands: selectedBrands.join(","),
    categories: selectedCategories.join(","),
  };

  useEffect(() => {
    const queryString = window?.location?.search;
    const urlParams = new URLSearchParams(queryString);
    [
      { id: "selectedBrands", key: "brands" },
      { id: "selectedCategories", key: "categories" },
    ].forEach((e) => {
      const selectedHandler = urlParams.get(e.key);
      if (selectedHandler) {
        const selected = selectedHandler?.split(",");
        productStore.setState({ [e.id]: selected });
      }
    });

    const customFilter = customFilterStatic
      .filter((e) => urlParams.get(e.id))
      .map((n) => n.id);
    productStore.setState({ customFilter });
  }, []);

  const onResetFilter = () => {
    productStore.setState({
      selectedBrands: [],
      selectedCategories: [],
      customFilter: [],
    });
    router.replace(`/products`, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <div className="md:hidden w-full flex flex-wrap justify-center max-w-xl mx-auto px-4 xl:px-0 py-4 bg-[#FFFFFF] shadow-md">
        <div className="w-full flex flex-wrap justify-between items-center gap-x-4">
          <p className="text-[16px] leading-[20px] font-[500]">Categories</p>
          <div className="relative ">
            <div
              onClick={() => {
                productStore.setState({ showFilter: !showFilter });
              }}
            >
              {showFilter ? (
                <div className="cursor-pointer">
                  <CloseIcon width={24} height={24} />
                </div>
              ) : (
                <div className="cursor-pointer">
                  <FilterIcon />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden relative">
        {showFilter && <DropdownFilter />}
      </div>
      <div className="hidden md:flex flex-col gap-y-4">
        <FilterCustom className="flex flex-col gap-y-4 p-5 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB]" />
        {taxonomiesData.map((data, i) => (
          <FilterTaxonomies
            className="flex flex-col gap-y-4 p-5 rounded-[8px] bg-[#FFFFFF] border border-[#CBCBCB]"
            data={data}
            key={i}
            params={params}
          />
        ))}
        <button
          className="text-center py-3 font-poppins text-[#ffffff] text-[14px] leading-[21px] font-[500] w-full bg-[#EE3424] rounded-[21px]"
          onClick={onResetFilter}
        >
          Reset Filter
        </button>
      </div>
    </>
  );
}
