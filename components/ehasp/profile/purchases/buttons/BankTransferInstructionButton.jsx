import ModalButton from "@/components/ehasp/partials/ModalButton";
import BankTransferInstructionModal from "@/components/ehasp/profile/purchases/modal/BankTransferInstructionModal";
export default function BankTransferInstructionButton({}) {
  return (
    <div>
      <ModalButton
        id="instruction"
        className="underline text-left text-[#F05769] text-[14px] leading-[20px] font-[500]"
      >
        Instruction for Bank Transfer
      </ModalButton>
      <BankTransferInstructionModal id="instruction" />
    </div>
  );
}
