import FormField from "@/components/ehasp/partials/forms/FormField";
import orderStatuses from "@/lib/constant/orderStatuses";
import { useRouter } from "next/router";
import { useEffect } from "react";
import purchaseStore from "@/lib/store/purchaseStore";
export default function PurchaseFilter() {
  const router = useRouter();
  const [activeStatus, pagination] = purchaseStore((state) => [
    state.activeStatus,
    state.pagination,
  ]);
  useEffect(() => {
    const queryString = window?.location?.search;
    const urlParams = new URLSearchParams(queryString);
    const status = urlParams.get("status");
    purchaseStore.setState({ activeStatus: status || "" });
  }, []);

  const onChange = (e) => {
    purchaseStore.setState({
      pagination: {
        ...pagination,
        current_page: 1,
      },
    });
    purchaseStore.setState({ activeStatus: e?.value || "" });
    router.replace(`/account/purchases?status=${e?.value || ""}`, undefined, {
      shallow: true,
    });
  };

  return (
    <FormField
      type="select"
      name="orderStatus"
      instanceId="orderStatus"
      wrapperclassname="w-full md:max-w-[309px]"
      className="react-select cursor-pointer border-[1px] border-[#b3b3b3] rounded-md py-1 w-auto"
      isClearable={true}
      value={orderStatuses.find((n) => n.value === activeStatus) || null}
      options={orderStatuses}
      onChange={onChange}
    >
      <p className="text-[14px] leading-[20px] font-[500] mb-1">Order Filter</p>
    </FormField>
  );
}
