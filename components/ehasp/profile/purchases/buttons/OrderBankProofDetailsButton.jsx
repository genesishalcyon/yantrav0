import ModalButton from "@/components/ehasp/partials/ModalButton";
import BankTransferDetailsModal from "@/components/ehasp/profile/purchases/modal/BankTransferDetailsModal";
export default function OrderBankProofDetailsButton({}) {
  return (
    <div>
      <ModalButton
        id="view-proof"
        className="w-full lg:min-w-[180px] bg-[#315589] px-6 py-3 rounded-[26px] text-center text-[#FFFFFF] text-[14px] leading-[24px] font-[600]"
      >
        View Bank Transfer Proof
      </ModalButton>
      <BankTransferDetailsModal id="view-proof" />
    </div>
  );
}
