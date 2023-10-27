import productStore from "@/lib/store/productStore";
import {
  paramsToString,
  removeEmptyAttribute,
} from "@/lib/services/globalService";
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";
import customFilterStatic from "@/lib/constant/customFilter";
export default function FilterCustom({ className }) {
  const router = useRouter();
  const [selectedBrands, selectedCategories, customFilter, search] =
    productStore(
      (state) => [
        state.selectedBrands,
        state.selectedCategories,
        state.customFilter,
        state.search,
      ],
      shallow
    );

  const isChecked = (id) => {
    return customFilter.some((n) => n === id);
  };

  const onUpdate = (value, data) => {
    productStore.setState({
      parametersInit: {
        "page[number]": 1, // Reset pagination
      },
    });
    let newValue = [];
    if (value) {
      newValue = [...customFilter, data.id];
      productStore.setState({ customFilter: newValue });
    } else {
      newValue = customFilter.filter((n) => n !== data.id);
      productStore.setState({ customFilter: newValue });
    }
    const dataParams = {};
    newValue.forEach((n) => {
      dataParams[n] = 1;
    });
    const newParams = {
      ...dataParams,
      brands: selectedBrands.join(","),
      categories: selectedCategories.join(","),
      search,
    };
    removeEmptyAttribute(newParams);
    router.replace(`/products?${paramsToString(newParams)}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className={className}>
      <div className="flex flex-col gap-y-2">
        {customFilterStatic.map((n, i) => (
          <div key={i} className="flex items-center gap-x-2">
            <input
              id={n.id}
              type="checkbox"
              className="cursor-pointer"
              checked={isChecked(n.id)}
              onChange={(e) => onUpdate(e?.target?.checked, n)}
            />
            <label
              htmlFor={n.id}
              className="cursor-pointer font-poppins text-[#555555] text-[14px] leading-[24px] font-[500]"
            >
              {n.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
