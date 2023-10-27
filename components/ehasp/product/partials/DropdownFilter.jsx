import { useRouter } from "next/router";
import productStore from "@/lib/store/productStore";
import FilterTaxonomies from "@/components/ehasp/product/partials/FilterTaxonomies";
import FilterCustom from "@/components/ehasp/product/partials/FilterCustom";
import customFilterStatic from "@/lib/constant/customFilter";
import { useEffect } from "react";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
export default function DropdownFilter() {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  const router = useRouter();
  const [categories, brands, selectedBrands, selectedCategories] = productStore(
    (state) => [
      state.categories,
      state.brands,
      state.selectedBrands,
      state.selectedCategories,
    ]
  );

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
    productStore.setState({
      showFilter: false,
    });
  };

  return (
    <div className="md:hidden absolute w-full max-h-screen h-screen overflow-y-scroll z-[899] bg-[#FFFFFF] mt-[1px] pb-[250px]">
      <div className="relative">
        <div className="relative flex flex-col gap-y-4 px-4 py-8">
          <FilterCustom className="border-[1px] border-[#D1DBDB] rounded-lg p-4" />
          {taxonomiesData.map((data, i) => (
            <FilterTaxonomies
              className="border-[1px] border-[#D1DBDB] rounded-lg p-4 flex flex-col gap-y-4"
              data={data}
              key={i}
              params={params}
            />
          ))}
        </div>
        <div className="fixed bottom-0 w-full p-4 flex flex-nowrap justify-center gap-x-3">
          <LoadingButton
            onClick={() => {
              productStore.setState({
                showFilter: false,
              });
            }}
            loading={false}
            loadingColor="bg-[#315589]"
            label="Save"
            labelLoading="Processing..."
            disabled={false}
            className="w-full max-w-[210px] bg-[#315589] p-3.5 rounded-[8px] font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[600]"
          />
          <button
            className="w-full max-w-[210px] text-center bg-[#EE3424] p-3.5 rounded-[8px] font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[600]"
            data-te-modal-dismiss
            aria-label="Close"
            onClick={onResetFilter}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
