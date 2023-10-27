import { useRouter } from "next/router";
import productStore from "@/lib/store/productStore";
import {
  paramsToString,
  removeEmptyAttribute,
} from "@/lib/services/globalService";
import { shallow } from "zustand/shallow";
import ChevronIcon from "@/components/svg/ChevronIcon";
import AccordionArrowIcon from "@/components/svg/AccordionArrowIcon";
import { useState } from "react";
export default function ProductTaxonomies({ className, data, params }) {
  const router = useRouter();
  const [dataHandler, customFilter, search] = productStore(
    (state) => [state[data.keyword], state.customFilter, state.search],
    shallow
  );
  const onUpdate = (taxononyId, status) => {
    productStore.setState({
      parametersInit: {
        "page[number]": 1, // Reset pagination
      },
    });
    let newValue = [];
    if (status) {
      newValue = [...dataHandler, taxononyId];
      productStore.setState({ [data.keyword]: newValue });
    } else {
      newValue = dataHandler.filter((e) => e !== taxononyId);
      productStore.setState({ [data.keyword]: newValue });
    }

    let customFilterParams = {};
    customFilter.forEach((n) => {
      customFilterParams[n] = 1;
    });
    const newParams = {
      ...params,
      [data.id]: newValue.join(","),
      ...customFilterParams,
      search,
    };
    removeEmptyAttribute(newParams);
    router.replace(`/products?${paramsToString(newParams)}`, undefined, {
      shallow: true,
    });
  };

  const isChecked = (id) => {
    return dataHandler?.some((e) => e === id);
  };
  const [showAccordion, setShowAccordion] = useState(true);
  const [openFilters, setOpenFilters] = useState([]);
  const openFilter = (id) => {
    if (openFilters.includes(id)) {
      let updatedOpenFilters = openFilters.filter((d) => d !== id);
      setOpenFilters(updatedOpenFilters);
    } else if (!openFilters.includes(id)) {
      setOpenFilters([...openFilters, id]);
    }
  };

  const Item = ({ className, data, taxonomy }) => (
    <div className={className}>
      <div className="flex items-center gap-x-2">
        <input
          id={`${data.id}-${taxonomy.id}`}
          type="checkbox"
          className="cursor-pointer"
          checked={isChecked(taxonomy.id)}
          onChange={(e) => onUpdate(taxonomy.id, e.target.checked)}
        />
        <label
          htmlFor={`${data.id}-${taxonomy.id}`}
          className="cursor-pointer font-poppins text-[#555555] text-[14px] leading-[24px] font-[500]"
        >
          {taxonomy.name}
        </label>
        {taxonomy?.children?.length > 0 && (
          <span onClick={() => openFilter(taxonomy.id)}>
            <ChevronIcon
              fill="#555"
              className={`cursor-pointer ${
                openFilters.includes(taxonomy.id)
                  ? "rotate-[270deg]"
                  : "rotate-[90deg]"
              }`}
            />
          </span>
        )}
      </div>
      {openFilters.includes(taxonomy.id) &&
        taxonomy?.children?.map((childTaxonomy, childIndex) => (
          <Item
            key={childIndex}
            className="flex flex-col gap-y-1 ml-3"
            data={data}
            taxonomy={childTaxonomy}
          />
        ))}
    </div>
  );

  return (
    <div className={className}>
      <div
        className="flex justify-between"
        onClick={() => setShowAccordion((prev) => !prev)}
      >
        <p className="text-[16px] leading-[24px] font-[700]">{data.title}</p>
        <AccordionArrowIcon
          className={`cursor-pointer ${
            showAccordion ? "rotate-[180deg]" : "rotate-[0deg]"
          }`}
          fill="#315589"
        />
      </div>
      {showAccordion && (
        <div className="flex flex-col gap-y-2">
          {data.taxonomies.map((taxonomy, i) => (
            <Item
              key={i}
              className="flex flex-col gap-y-1"
              data={data}
              taxonomy={taxonomy}
            />
          ))}
        </div>
      )}
    </div>
  );
}
