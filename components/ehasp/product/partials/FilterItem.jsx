import productStore from "@/lib/store/productStore";
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";
import {
  paramsToString,
  removeEmptyAttribute,
} from "@/lib/services/globalService";
export default function FilterItem({ id, taxonomy }) {
  const router = useRouter();
  const [x, y] = productStore((state) => [state["x"], state["y"]], shallow);

  const params = {};
  const onUpdate = (taxononyId, status) => {
    let newValue = [];
    if (status) {
      newValue = [...x, taxononyId];
      productStore.setState({ x: newValue });
    } else {
      newValue = x.filter((e) => e !== taxononyId);
      productStore.setState({ x: newValue });
    }

    removeEmptyAttribute(params);
    router.replace(`/products?${paramsToString(params)}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="flex items-center gap-x-2">
      <input
        id={`${id}-${taxonomy.id}`}
        type="checkbox"
        className="cursor-pointer"
        // checked={!!taxonomy.selected}
        onChange={(e) => onUpdate(taxonomy.id, e.target.checked)}
      />
      <label
        htmlFor={`${id}-${taxonomy.id}`}
        className="cursor-pointer text-[16px] leading-[24px] font-[500]"
      >
        {taxonomy.name}
      </label>
    </div>
  );
}
