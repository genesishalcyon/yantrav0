import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import AccountNotVerifiedIcon from "@/components/svg/AccountNotVerifiedIcon";
import globalState from "@/lib/store/globalState";
import authStore from "@/lib/store/authStore";
import { shallow } from "zustand/shallow";

export default function NotVerifiedAccount() {
  const [showAuthModal, closeAuthModal] = globalState((state) => [
    state.showAuthModal,
    state.closeAuthModal,
  ]);
  const [submissionLoading, onVerify] = authStore(
    (state) => [state.submissionLoading, state.onVerify],
    shallow
  );

  return (
    <div className="relative w-full h-full max-w-[715px] max-h-[458px] bg-[#FFFFFF] rounded-[8px] z-[150] mx-auto py-16 px-14">
      <div className="flex flex-col justify-center items-center gap-y-6">
        <AccountNotVerifiedIcon />
        <h1 className="text-[#555555] text-[40px] leading-[60px] font-[600] text-center">
          Your account is not yet verified
        </h1>
        <p className="text-[#555555] text-[16px] ">
          Kindly verify your account by following the link below.
        </p>
        <LoadingButton
          onClick={() => {
            onVerify()
              .then(() => {
                closeAuthModal();
                setTimeout(() => {
                  showAuthModal("verification-sent");
                }, 500);
              })
              .catch(() => {});
          }}
          loading={submissionLoading}
          loadingColor="bg-[#EE3424] "
          label="Resend Verification Link"
          labelLoading="Sending..."
          className={`max-w-[368px] w-full mx-auto inline-flex justify-center text-center bg-[#315589] font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[700] p-3 rounded-[1.5rem]`}
        />
      </div>
    </div>
  );
}
