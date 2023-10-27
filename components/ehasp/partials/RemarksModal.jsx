import BaseModal from "@/components/ehasp/partials/BaseModal";
import MediaUploadCustom from "@/components/ehasp/partials/MediaUploadCustom";
import cartStore from "@/lib/store/cartStore";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import globalState from "@/lib/store/globalState";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import formStore from "@/lib/store/formStore";
export default function RemarksModal({
  id,
  onSave = async () => {},
  onCancel = () => {},
  callBack = () => {},
}) {
  const [loading, setLoading] = useState(false);
  const [remarksForm, onChangeRemarks] = cartStore(
    (state) => [state.remarksForm, state.onChangeRemarks],
    shallow
  );
  const uploading = formStore((state) => state.uploading);
  const [modal, setModal] = useState();
  const [modalInit] = globalState((state) => [state.modalInit]);
  useEffect(() => {
    const infoEl = document.getElementById(`modal-${id}`);
    setModal(modalInit ? new modalInit(infoEl) : "");
  }, [id, modalInit]);

  const triggerOnSave = () => {
    setLoading(true);
    onSave().then(() => {
      callBack();
      modal.hide();
      setLoading(false);
    });
  };
  return (
    <BaseModal id={id} data={{ title: "Add Remarks" }}>
      <div className="relative overflow-auto p-4 h-full flex flex-col justify-between">
        <div>
          <textarea
            className="p-4 w-full h-[200px] border-[1px] border-[#555555] rounded-lg"
            value={remarksForm?.notes || ""}
            onChange={(e) => {
              onChangeRemarks({ notes: e?.target?.value });
            }}
          ></textarea>
          <MediaUploadCustom
            // accept="image/*,video/*"
            multiple={true}
            media={remarksForm.media}
            onAdd={(allMedia) => {
              onChangeRemarks({ media: allMedia });
            }}
            onRemove={(index) => {
              const allMedia = remarksForm.media;
              const currentMedia = allMedia.filter((_, i) => index !== i);
              onChangeRemarks({
                media: currentMedia,
              });
            }}
          />
        </div>
      </div>
      <div className="px-4 py-5 mt-auto flex justify-center md:justify-start gap-x-4 font-poppins text-[#FFFFFF] text-[14px] leading-[20px] font-[500]">
        <LoadingButton
          onClick={triggerOnSave}
          loading={loading}
          loadingColor="bg-[#315589]"
          label="Save"
          labelLoading="Processing..."
          disabled={uploading}
          className="flex justify-center items-center bg-[#315589] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
        />
        <button
          className="flex justify-center items-center bg-[#EE3424] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
          data-te-modal-dismiss
          aria-label="Close"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </BaseModal>
  );
}
