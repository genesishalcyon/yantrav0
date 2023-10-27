import EmailIcon from "@/components/svg/EmailIcon";
import React from "react";
import { shallow } from "zustand/shallow";
import authStore from "@/lib/store/authStore";
// import dynamic from "next/dynamic";

// const authStore = dynamic(() => import("../../../lib/store/authStore/"));

const AccountNotVerified = ({ profile }) => {
  const [submissionLoading, onVerify] = authStore(
    (state) => [state.submissionLoading, state.onVerify],
    shallow
  );

  return (
    <>
      <div className="py-2 w-full bg-[#D81B60] sticky top-[83px] md:top-[138px] xl:top-[140px] -z-10">
        <div className="flex flex-wrap items-center justify-center w-full h-full max-w-xl px-4 mx-auto sm:justify-between gap-x-2 gap-y-2 xl:px-0">
          <p className="font-poppins text-[#FFFFFF] text-[16px] leading-[24px]">
            Your account is not yet verified
          </p>
          <div className="flex items-center flex-nowrap">
            <EmailIcon width={21} height={17} fill="#fff" />
            <button
              className="font-poppins text-[#FFFFFF] text-[14px] leading-[21px] font-[700] ml-2"
              onClick={() => {
                onVerify()
                  .then(() => {
                    showAuthModal("verification-sent");
                  })
                  .catch(() => {});
              }}
              disabled={submissionLoading}
            >
              {submissionLoading
                ? "Sending..."
                : "Resend Verification Link Now"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountNotVerified;
