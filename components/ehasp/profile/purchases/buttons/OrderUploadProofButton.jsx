import BankTransferFormModal from "@/components/ehasp/profile/purchases/modal/BankTransferFormModal";
import ModalButton from "@/components/ehasp/partials/ModalButton";
export default function OrderUploadProofButton({}) {
  return (
    <div>
      <ModalButton
        id="upload-proof"
        className="w-full lg:min-w-[180px] bg-[#315589] px-6 py-3 rounded-[26px] text-center text-[#FFFFFF] text-[14px] leading-[24px] font-[600]"
      >
        Upload Bank Transfer Proof
      </ModalButton>
      <BankTransferFormModal id="upload-proof" />
    </div>
  );
}
