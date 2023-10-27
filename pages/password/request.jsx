import authStore from "@/lib/store/authStore";
import { shallow } from "zustand/shallow";
import FormField from "@/components/ehasp/partials/forms/FormField";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import { useState } from "react";
import AuthLayout from "@/components/ehasp/auth/AuthLayout";
import EmailStrokeIcon from "@/components/svg/EmailStrokeIcon";
export default function PasswordRequest() {
  const [success, setSuccess] = useState(false);
  const [
    forgotPasswordForm,
    onChangeForgot,
    onForgotPassword,
    forgotFormError,
    submissionLoading,
  ] = authStore(
    (state) => [
      state.forgotPasswordForm,
      state.onChangeForgot,
      state.onForgotPassword,
      state.forgotFormError,
      state.submissionLoading,
    ],
    shallow
  );

  const triggerOnForgotPassword = () => {
    onForgotPassword()
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {});
  };

  return (
    <AuthLayout backgroundImage="/images/yantra1.webp">
      <div className="w-full h-auto max-w-[562px] border-[1px] rounded-[8px] px-8 py-10 sm:py-16 bg-[#FFFFFF] custom-box-shadow flex justify-center items-center">
        {success ? (
          <div className="flex flex-col justify-center items-center gap-y-6">
            <EmailStrokeIcon />
            <h1 className="font-poppins text-[#555555] text-[40px] leading-[60px] font-[600]">
              Please check your email
            </h1>
            <p className="font-poppins text-[#555555] text-[16px] leading-[23px]">
              Password reset link has been sent to your email!
            </p>
          </div>
        ) : (
          <div className="flex flex-col max-w-[368px] w-full gap-y-8">
            <h1 className="text-center  text-[#231F20] text-[25px] 2sm:text-[34px] sm:text-[37px] md:text-[35px] lg:text-[40px] leading-[60px] font-[600]">
              Forgot Password
            </h1>
            <div className="max-w-[368px] w-full">
              <FormField
                type="text"
                name="email"
                placeholder="Email Address"
                className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
                value={forgotPasswordForm.email}
                onChange={(e) => onChangeForgot({ email: e?.target?.value })}
                onKeyDown={(e) =>
                  e?.key === "Enter" ? triggerOnForgotPassword() : null
                }
                errors={forgotFormError}
                errortype="bordertext"
              />
            </div>
            <LoadingButton
              onClick={triggerOnForgotPassword}
              loading={submissionLoading}
              loadingColor="bg-[#EE3424]"
              label="Proceed"
              labelLoading="Processing..."
              className={`max-w-[258px] w-full mx-auto bg-[#315589] text-[#FFFFFF] text-[16px] leading-[24px] font-[700] p-3 rounded-[1.5rem]`}
              disabled={!forgotPasswordForm.email.trim()}
            />
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
