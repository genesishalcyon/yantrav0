import {
  paramsToString,
  removeEmptyAttribute,
} from "@/lib/services/globalService";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import ChevronIcon from "@/components/svg/ChevronIcon";
import productStore from "@/lib/store/productStore";
import ReactPaginate from "react-paginate";
export default function Pagination() {
  const router = useRouter();
  const [
    productMeta,
    selectedBrands,
    selectedCategories,
    customFilter,
    search,
  ] = productStore((state) => [
    state.productMeta,
    state.selectedBrands,
    state.selectedCategories,
    state.customFilter,
    state.search,
  ]);
  useEffect(() => {
    const queryString = window?.location?.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get("page");
    productStore.setState({
      parametersInit: {
        "page[number]": page || 1,
      },
    });
  }, []);

  const onChange = (e) => {
    const pageNumber = e.selected + 1;
    productStore.setState({
      parametersInit: {
        "page[number]": pageNumber,
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
      page: pageNumber,
    };
    removeEmptyAttribute(params);
    router.replace(`/products?${paramsToString(params)}`, undefined, {
      shallow: true,
    });
  };

  return (
    <Fragment>
      {productMeta?.total > 0 && productMeta?.last_page !== 1 && (
        <ReactPaginate
          className="flex flex-nowrap justify-center items-center my-4 md:my-6"
          breakLabel="..."
          nextLabel={<ChevronIcon />}
          nextClassName="mx-[5px]"
          onPageChange={onChange}
          forcePage={(productMeta?.current_page || 1) - 1}
          pageRangeDisplayed={9}
          pageCount={productMeta?.last_page || 1}
          previousLabel={<ChevronIcon className="rotate-[-180deg]" />}
          previousClassName="mx-[5px]"
          renderOnZeroPageCount={null}
          disabledClassName="hidden"
          breakClassName="text-[#9E9E9E] text-[14px] leading-[20px] font-[500] flex justify-center items-center"
          pageClassName="text-[#9E9E9E] text-[14px] leading-[20px] font-[500] w-[32px] h-[32px] flex justify-center items-center"
          activeClassName="text-[#D81B60] border-[2px] rounded-[8px] border-[#D81B60] bg-[#FFF3F7]"
        />
      )}
    </Fragment>
  );
}
