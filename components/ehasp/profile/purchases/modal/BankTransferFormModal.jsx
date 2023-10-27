import { shallow } from "zustand/shallow";
import { useRef, useState } from "react";
const { toast } = await import("react-toastify");
import orderStore from "@/lib/store/orderStore";
import BaseModal from "@/components/ehasp/partials/BaseModal";
import MediaUploadCustom from "@/components/ehasp/partials/MediaUploadCustom";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import formStore from "@/lib/store/formStore";
export default function BankTransferFormModal({ id, callback = () => {} }) {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const uploading = formStore((state) => state.uploading);
  const [
    order,
    bankTransferProofForm,
    onChangeProofForm,
    onUpdateStatus,
    refetchOrder,
  ] = orderStore(
    (state) => [
      state.order,
      state.bankTransferProofForm,
      state.onChangeProofForm,
      state.onUpdateStatus,
      state.refetchOrder,
    ],
    shallow
  );

  const triggerOnUploadProof = () => {
    if (bankTransferProofForm.proof_of_payment?.[0]?.src) {
      setLoading(true);
      const payload = {
        ...bankTransferProofForm,
        proof_of_payment: bankTransferProofForm.proof_of_payment[0].src,
      };
      onUpdateStatus(order.reference, payload)
        .then(() => {
          refetchOrder();
          toast.success("Proof uploaded!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          ref.current.click();
          setLoading(false);
          callback();
        })
        .catch();
    }
  };

  return (
    <BaseModal id={id} data={{ title: "Upload Proof" }}>
      <div className="relative overflow-auto p-4">
        <div className="flex flex-col gap-y-4">
          <textarea
            className="p-4 w-full h-[200px] border-[1px] border-[#555555] rounded-lg"
            value={bankTransferProofForm?.notes || ""}
            onChange={(e) => onChangeProofForm({ notes: e?.target?.value })}
          ></textarea>
          <MediaUploadCustom
            media={bankTransferProofForm?.proof_of_payment || []}
            onAdd={(allMedia) => {
              onChangeProofForm({ proof_of_payment: allMedia });
            }}
            onRemove={(index) => {
              const allMedia = bankTransferProofForm?.proof_of_payment;
              const currentMedia = allMedia.filter((_, i) => index !== i);
              onChangeProofForm({ proof_of_payment: currentMedia });
            }}
          />
        </div>
      </div>
      <div className="px-4 py-5 mt-auto flex justify-center md:justify-start gap-x-4 text-[#FFFFFF] text-[14px] leading-[20px] font-[500]">
        <LoadingButton
          onClick={triggerOnUploadProof}
          loading={loading}
          loadingColor="bg-[#315589]"
          label="Save"
          labelLoading="Processing..."
          disabled={uploading}
          className={`flex justify-center items-center bg-[#315589] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto ${
            !bankTransferProofForm.proof_of_payment[0] && "cursor-not-allowed"
          } ${uploading && "cursor-not-allowed bg-[#6983a9]"}`}
        />

        <button
          ref={ref}
          className="flex justify-center items-center bg-[#EE3424] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
          data-te-modal-dismiss
          aria-label="Close"
        >
          Cancel
        </button>
      </div>
    </BaseModal>
  );
}
