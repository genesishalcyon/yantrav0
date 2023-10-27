import AddRemarksIcon from "@/components/svg/AddRemarksIcon";
import ChevronIcon from "@/components/svg/ChevronIcon";
import RemarksModal from "@/components/ehasp/partials/RemarksModal";
import ModalButton from "@/components/ehasp/partials/ModalButton";
import cartStore from "@/lib/store/cartStore";
import persistentStore from "@/lib/store/persistentStore";
import globalState from "@/lib/store/globalState";
import { useEffect } from "react";
import { useRouter } from "next/router";
const GUEST_FEATURE = process.env.NEXT_PUBLIC_GUEST_FEATURE;
export default function ProductRemarksButton({}) {
  const router = useRouter();
  const profile = persistentStore((state) => state.profile);
  const showAuthModal = globalState((state) => state.showAuthModal);
  const [remarksForm, resetRemarks] = cartStore((state) => [
    state.remarksForm,
    state.resetRemarks,
  ]);
  useEffect(() => {
    resetRemarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const hasRemarks =
    remarksForm?.notes?.length > 0 || remarksForm?.media?.length > 0;
  return (
    <div>
      {profile || GUEST_FEATURE === "true" ? (
        ""
      ) : (
        // <ModalButton
        //   id="remarks"
        //   className={`flex justify-between items-center w-full p-4 border-[1px] rounded-[8px] ${
        //     hasRemarks ? "border-[#EE3424]" : "border-[#555555]"
        //   }`}
        // >
        //   <div className="flex items-center gap-x-4">
        //     <div className="scale-75">
        //       <AddRemarksIcon fill={hasRemarks ? "#EE3424" : "#555"} />
        //     </div>
        //     <div className="font-poppins text-[#555555] text-[14px] leading-[23px]">
        //       <p
        //         className={`font-[600] text-left ${
        //           hasRemarks ? "text-[#EE3424]" : ""
        //         }`}
        //       >
        //         Personalize your order
        //       </p>
        //       {hasRemarks ? (
        //         <p className="text-left">Remarks Added</p>
        //       ) : (
        //         <p className="text-left">
        //           Add remarks to personalize your order
        //         </p>
        //       )}
        //     </div>
        //   </div>
        //   <ChevronIcon fill={hasRemarks ? "#EE3424" : "#6B7280"} />
        // </ModalButton>
        <button
          className={`flex justify-between items-center w-full p-4 border-[1px] rounded-[8px] "border-[#555555]"`}
          onClick={() => showAuthModal("login")}
        >
          <div className="flex items-center gap-x-4">
            <div className="scale-75">
              <AddRemarksIcon fill="#555" />
            </div>
            <div className="text-[14px] leading-[23px]">
              <p className={`font-[600] text-left`}>Personalize your order</p>
            </div>
          </div>
          <ChevronIcon fill="#EE3424" />
        </button>
      )}
      <RemarksModal id="remarks" onCancel={resetRemarks} />
    </div>
  );
}
