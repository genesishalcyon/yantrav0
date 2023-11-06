// import { props } from "@/lib/props/products";
// export const getStaticProps = props;
// import { paramsToString, deserialize } from "@/lib/services/globalService";
// import productStore from "@/lib/store/productStore";
// import Filter from "@/components/ehasp/product/Filter";
// import Search from "@/components/ehasp/product/Search";
// import Pagination from "@/components/ehasp/product/Pagination";
// import List from "@/components/ehasp/product/List";
// import PRODUCTAPI from "@/lib/api/product/request";
// import customFilterStatic from "@/lib/constant/customFilter";
// import TextBanner from "@/components/ehasp/partials/TextBanner";
// import { useEffect } from "react";
// export default function Products({ brands = {}, categories = {} }) {
//   useEffect(() => {
//     productStore.setState({ brands: brands?.parentTerms || [] });
//     productStore.setState({ categories: categories?.parentTerms || [] });
//   }, [brands, categories]);
//   const [
//     parametersInit,
//     selectedBrands,
//     selectedCategories,
//     search,
//     customFilter,
//   ] = productStore((state) => [
//     state.parametersInit,
//     state.selectedBrands,
//     state.selectedCategories,
//     state.search,
//     state.customFilter,
//   ]);

//   const findKey = (id) => {
//     return customFilterStatic.find((n) => n.id === id)?.value || "";
//   };
//   let customFilterParams = {};
//   customFilter.forEach((n) => {
//     const handler = findKey(n);
//     if (handler) customFilterParams[handler] = 1;
//   });

//   const parameters = {
//     ...parametersInit,
//     ...customFilterParams,
//     include: "media,productTier",
//     "filter[name]": search,
//     "page[size]": 9,
//     "filter[taxonomies][brand]": selectedBrands,
//     "filter[taxonomies][categories]": selectedCategories,
//   };

//   const { data: products, isValidating: productLoading } =
//     PRODUCTAPI.getProductsSwr(`/products?${paramsToString(parameters)}`, {
//       keepPreviousData: true,
//       revalidateOnFocus: false,
//       onSuccess: (res) => {
//         const products = deserialize(res.data);
//         productStore.setState({
//           allProducts: products,
//           productMeta: res?.data?.meta || {},
//         });
//       },
//     });

//   return (
//     <>
//       <TextBanner
//         title="Seed Bank"
//         className="max-w-xl mx-auto md:py-16 px-0 md:px-4 xl:px-0 hidden md:block"
//       />
//       <div className="max-w-xl mx-auto md:py-16 px-0 md:px-4 xl:px-0 ">
//         <div className="flex flex-wrap md:flex-nowrap gap-x-4 gap-y-4">
//           <div className="w-full md:w-1/3 ">
//             <Search className="md:hidden flex items-center gap-x-2 p-4 bg-[#FFFFFF] shadow-md" />
//             <hr className="border-[1px] border-[#CBCBCB] block md:hidden" />
//             <Filter />
//           </div>
//           <div className="w-full md:w-2/3 flex flex-col gap-y-4 pt-6 pb-4 md:py-0 px-4 md:px-0">
//             <Search className="hidden md:flex items-center gap-x-2 p-4 rounded-[8px] border border-[#CBCBCB] bg-[#FFFFFF]" />
//             {productLoading && !products ? (
//               <div className="py-12">
//                 <div className="w-fit m-auto text-sm">Loading...</div>
//               </div>
//             ) : (
//               <div>
//                 <List />
//                 <Pagination />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// import Products from "./Products";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Products = dynamic(() =>
  import("./Products").then((module) => module.default)
);

const index = ({ brands = {}, categories = {} }) => {
  const { asPath } = useRouter();
  // return <Products brands={brands} categories={categories} />;
  // console.log(asPath.includes("/products"));
  if (asPath.includes("/products")) {
    return <Products brands={brands} categories={categories} />;
  } else {
    return null;
  }

  // {asPath.includes(
  //   "/products" ?
  //     return <Products brands={brands} categories={categories} />
  //    :
  //     return <div>Loading</div>

  // )}
};

export default index;
