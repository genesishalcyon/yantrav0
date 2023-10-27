import BankTransferProcessIcon from "@/components/svg/BankTransferProcessIcon";
import BaseModal from "@/components/ehasp/partials/BaseModal";
import orderStore from "@/lib/store/orderStore";
export default function BankTransferInstructionModal({ id }) {
  const order = orderStore((state) => state.order);
  return (
    <BaseModal id={id} data={{ title: "Bank Transfer Instruction" }}>
      <div className="relative overflow-auto flex flex-col justify-center items-center px-6 py-10">
        <div className="w-[120px] h-[124px]">
          <BankTransferProcessIcon />
        </div>
        <h1 className="text-center text-[40px] leading-[60px] font-[600] my-4">
          Bank Transfer Process
        </h1>
        <div
          className="checkout-instruction w-full max-w-[753px] text-[16px] leading-[23px]"
          dangerouslySetInnerHTML={{
            __html: order?.payments?.payment_method?.data?.instruction,
          }}
        ></div>
      </div>
    </BaseModal>
  );
}
