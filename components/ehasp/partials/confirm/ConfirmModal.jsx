import LoadingIcon from "@/components/svg/LoadingIcon";
import globalState from "@/lib/store/globalState";
import { useEffect, useState } from "react";
export default function ConfirmModal({}) {
  const [modalInit, confirm] = globalState((state) => [
    state.modalInit,
    state.confirm,
  ]);
  const [confirmModal, setConfirmModal] = useState();
  const [infoModal, setInfoModal] = useState();
  useEffect(() => {
    const confirmEl = document.getElementById("confirm-modal");
    const infoEl = document.getElementById("confirm-info");
    setConfirmModal(modalInit ? new modalInit(confirmEl) : "");
    setInfoModal(modalInit ? new modalInit(infoEl) : "");
  }, [modalInit]);

  return (
    <div>
      <div  
        data-te-modal-init
        className="fixed left-0 top-20 px-4 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="confirm-modal"
        data-te-backdrop="static"
        // data-te-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div className="font-poppins py-6 min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col md:rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
            <div
              data-te-modal-body-ref
              className="text-[#0A0903] text-center relative p-4"
            >
              {confirm?.icon}
              <p className="text-[24px] leading-[36px] md:text-[40px] md:leading-[60px] font-[600]">
                {confirm.title}
              </p>
              {!!confirm?.message && (
                <p className="text-[14px] leading-[21px] md:text-[16px] md:leading-[23px]">
                  {confirm.message}
                </p>
              )}
            </div>

            <div className="p-4">
              <div className="flex gap-x-4 justify-center font-poppins text-[14px] leading-[21px] font-[500]">
                <button
                  type="button"
                  className={`bg-[#315589] min-w-[100px] justify-center inline-flex items-center px-4 py-2 shadow rounded-[26px] text-white transition ease-in-out duration-150 ${
                    confirm.loading && "cursor-not-allowed"
                  }`}
                  disabled={confirm.loading}
                  onClick={() => {
                    confirm.action().then(() => {
                      confirmModal.hide();
                      if (confirm.info) {
                        infoModal.show();
                      }
                    });
                  }}
                >
                  {confirm.loading && (
                    <LoadingIcon className="mr-3 h-5 w-5 text-white" />
                  )}
                  {confirm.loading ? "Processing..." : confirm.continueLabel}
                </button>

                <button
                  type="button"
                  data-te-modal-dismiss
                  data-te-ripple-init
                  className="bg-[#EE3424] min-w-[100px] justify-center inline-flex items-center px-4 py-2 shadow rounded-[26px] text-white transition ease-in-out duration-150"
                >
                  {confirm.cancelLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        data-te-modal-init
        className="fixed left-0 top-20 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="confirm-info"
        data-te-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[600px]"
        >
          <div className="py-6 min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
            <div data-te-modal-body-ref className="text-center relative p-4">
              {confirm?.info && confirm.info()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
