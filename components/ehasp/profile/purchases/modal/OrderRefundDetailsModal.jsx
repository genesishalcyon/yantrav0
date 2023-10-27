import Image from "next/image";
import BaseModal from "@/components/ehasp/partials/BaseModal";
import orderStore from "@/lib/store/orderStore";
export default function OrderRefundDetailsModal({ id }) {
  const order = orderStore((state) => state.order);
  return (
    <BaseModal id={id} data={{ title: "Order Refund Details" }}>
      {/* <div className="flex flex-col gap-y-4">
        <div>
          <p>{remarks?.data?.notes}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {media.map((image, i) => (
            <div
              key={i}
              className="relative w-[200px] h-[200px] border-[1px] border-[cecece] rounded-lg"
            >
              <Image
                alt="Remarks Details"
                src={image}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div> */}
    </BaseModal>
  );
}
