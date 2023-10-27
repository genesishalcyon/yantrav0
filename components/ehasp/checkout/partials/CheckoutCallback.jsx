import Link from "next/link";
import OrderCancelledIcon from "@/components/svg/OrderCancelledIcon";
import CheckoutSuccessIcon from "@/components/svg/CheckoutSuccessIcon";
import { useRouter } from "next/router";
import persistentStore from "@/lib/store/persistentStore";
export default function CheckoutCallback({ title, type }) {
  const profile = persistentStore((state) => state.profile);
  const router = useRouter();
  const { reference } = router?.query;

  const redirection = profile
    ? `/account/purchases?reference=${reference}`
    : `/guest/order?reference=${reference}`;

  return (
    <div className="px-4 py-12 md:p-12">
      <div className="w-full max-w-xl h-full max-h-[452px] mx-auto px-4 md:px-0 pt-16 pb-24 bg-[#FFFFFF] rounded-[8px] custom-box-shadow ">
        <div className="flex flex-col justify-center items-center">
          {type === "success" ? (
            <CheckoutSuccessIcon />
          ) : type === "cancelled" ? (
            <OrderCancelledIcon />
          ) : (
            <></>
          )}
          <h1 className="text-[24px] leading-[36px] md:text-[40px] md:leading-[60px] font-[600] my-4">
            {title}
          </h1>
          <Link
            href={redirection}
            className="mt-2 mb-4 w-full max-w-[367px] h-[51px] flex justify-center items-center rounded-[26px] bg-[#315589] text-[#FFFFFF] text-[16px] leading-[24px] font-[600]"
          >
            View Order Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
