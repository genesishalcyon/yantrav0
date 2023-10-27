import PurchaseSummary from "@/components/ehasp/profile/purchases/PurchaseSummary";
import PurchaseStatus from "@/components/ehasp/profile/purchases/PurchaseStatus";
import PurchaseItems from "@/components/ehasp/profile/purchases/PurchaseDetailsItems";
import AccordionPanel from "@/components/ehasp/partials/AccordionPanel";
import PurchaseActions from "@/components/ehasp/profile/purchases/PurchaseActions";
import PurchaseAddress from "@/components/ehasp/profile/purchases/PurchaseAddress";
import PurchasePaymentAndShippingMethod from "@/components/ehasp/profile/purchases/PurchasePaymentAndShippingMethod";
import { Fragment } from "react";
import ORDERAPI from "@/lib/api/order/request";
import { useRouter } from "next/router";
import orderStore from "@/lib/store/orderStore";
import { deserialize } from "@/lib/services/globalService";
import PageLoading from "@/components/page/PageLoading";
import ChevronIcon from "@/components/svg/ChevronIcon";
import persistentStore from "@/lib/store/persistentStore";
export default function PurchaseDetails() {
  const router = useRouter();
  const { reference } = router?.query;
  const profile = persistentStore((state) => state.profile);
  const { data, mutate: refetchOrder } = ORDERAPI.getOrdersSwr(
    `/${reference}?include=orderLines,payments,shippingMethod`,
    {
      render: reference,
      onSuccess: (res) => {
        const order = deserialize(res.data);
        orderStore.setState({ order, refetchOrder });
      },
    }
  );
  const order = data ? deserialize(data) : [];
  const shippingAddress = order?.shipping_address;
  const billingAddress = order?.billing_address;
  const addresses = [
    {
      title: "Shipping Address",
      address: shippingAddress,
    },
    {
      title: "Billing Address",
      address: billingAddress,
    },
  ];

  return (
    <Fragment>
      {order ? (
        <div className="lg:py-12">
          <div className="m-auto max-w-xl">
            <div className="flex flex-col gap-y-1 mb-5 text-[#0A0903] text-[16px] leading-[24px] md:text-[32px] md:leading-[48px] lg:text-[40px] lg:leading-[60px] font-[700]">
              <div className="flex flex-wrap justify-between items-center">
                <div className="w-[70%] lg:w-full flex flex-nowrap items-center gap-x-2">
                  {profile && (
                    <button
                      className="rounded-full w-[25px] h-[25px] bg-[#315589]"
                      onClick={() => {
                        if (router?.query?.index) {
                          router.back();
                        } else {
                          router.push("/account/purchases");
                        }
                      }}
                    >
                      <ChevronIcon
                        width={22}
                        height={22}
                        fill="#FFFFFF"
                        className="rotate-[-180deg]"
                      />
                    </button>
                  )}
                  <p className="hidden lg:inline whitespace-nowrap">Order</p>
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                    #{order?.id}
                  </p>
                </div>
                <div className="w-[30%] lg:hidden flex justify-end">
                  <PurchaseStatus status={order.status} />
                </div>
              </div>
              <div className="lg:hidden text-[14px] leading-[18px] ml-[30px]">
                <p>Order ID</p>
              </div>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap gap-4">
              <div className="w-full lg:w-2/3 flex flex-col gap-y-4">
                <PurchaseItems refetchOrder={refetchOrder} />
                {addresses?.map((address, i) => (
                  <AccordionPanel
                    key={i}
                    data={{
                      id: address?.address?.id,
                      title: address?.title,
                    }}
                  >
                    <PurchaseAddress address={address} />
                  </AccordionPanel>
                ))}
                <AccordionPanel
                  data={{
                    id: "others",
                    title: "Others",
                  }}
                >
                  <PurchasePaymentAndShippingMethod order={order} />
                </AccordionPanel>
              </div>
              <div className="w-full lg:w-1/3">
                <PurchaseSummary order={order} />
                <PurchaseActions
                  order={order}
                  className="flex flex-col gap-y-4"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageLoading className="!bg-transparent relative !h-[500px]" />
      )}
    </Fragment>
  );
}
