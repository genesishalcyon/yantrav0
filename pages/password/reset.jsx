import authStore from "@/lib/store/authStore";
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";
import FormField from "@/components/ehasp/partials/forms/FormField";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import GradientLoadingIcon from "@/components/svg/GradientLoadingIcon";
import AuthLayout from "@/components/ehasp/auth/AuthLayout";
import { validateUnix } from "@/lib/services/globalService";
import { useEffect, useState } from "react";
export default function PasswordReset() {
  const [success, setSuccess] = useState(false);
  const [countDown, setCountDown] = useState(5);
  const [
    resetPasswordForm,
    onChangeReset,
    onResetPassword,
    resetPasswordFormError,
    submissionLoading,
  ] = authStore(
    (state) => [
      state.resetPasswordForm,
      state.onChangeReset,
      state.onResetPassword,
      state.resetPasswordFormError,
      state.submissionLoading,
    ],
    shallow
  );
  const router = useRouter();
  const { email, token, expired_at } = router?.query;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 500);
    if (!validateUnix(expired_at) && expired_at) {
      router.replace("/password/expired");
    }
  }, [expired_at, router, setReady]);
  const triggerOnResetPassword = () => {
    onResetPassword(token, email)
      .then(() => {
        setSuccess(true);
        setInterval(() => {
          setCountDown((value) => value - 1);
        }, 1000);
        setTimeout(() => {
          router.replace("/login");
        }, 5000);
      })
      .catch(() => {});
  };
  return (
    <AuthLayout backgroundImage="/images/yantra1.webp">
      {ready && (
        <div className="w-full h-full max-w-[562px] sm:max-h-[412px] border-[1px] border-[#bababa] rounded-[8px] px-8 py-10 sm:py-16 bg-[#FFFFFF] custom-box-shadow  flex justify-center items-center">
          {success ? (
            <div className="text-center flex flex-col gap-y-4">
              <h1 className="text-[40px] leading-[60px] font-[600]">
                Password Changed!
              </h1>
              <p className="text-[16px] leading-[23px]">
                You will now be redirected to the login page in...
              </p>
              <div className="relative flex justify-center">
                <span className="absolute top-[50%] translate-y-[-50%] font-poppins text-[#315589] text-[18px] leading-[23px] font-[600]">
                  {countDown}
                </span>
                <GradientLoadingIcon />
              </div>
            </div>
          ) : (
            <div className="flex flex-col max-w-[368px] w-full gap-y-8">
              <h1 className="text-center w-full text-[#231F20] text-[19px] 2sm:text-[32px] sm:text-[37px] lg:text-[40px] font-[600] leading-[60px] ">
                Set new password
              </h1>
              {resetPasswordFormError &&
                typeof resetPasswordFormError === "string" && (
                  <div className="text-white bg-[#ff9797] p-2 rounded-lg max-w-[368px] w-full mx-auto">
                    <p>{resetPasswordFormError}</p>
                  </div>
                )}
              <div className="flex flex-col gap-y-4">
                <div className="max-w-[368px] w-full ">
                  <FormField
                    type="password"
                    peek={true}
                    name="password"
                    placeholder="Password"
                    className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
                    value={resetPasswordForm.password}
                    onChange={(e) =>
                      onChangeReset({ password: e?.target?.value })
                    }
                    onKeyDown={(e) =>
                      e?.key === "Enter" ? triggerOnResetPassword() : null
                    }
                    errors={resetPasswordFormError}
                    errortype="bordertext"
                    helpText="Password must be at least 8 characters, have 1 special character, 1
                  number, 1 upper case and 1 lower case."
                  />
                </div>
                <div className="max-w-[368px] w-full mx-auto">
                  <FormField
                    type="password"
                    peek={true}
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
                    value={resetPasswordForm.password_confirmation}
                    onChange={(e) =>
                      onChangeReset({ password_confirmation: e?.target?.value })
                    }
                    onKeyDown={(e) =>
                      e?.key === "Enter" ? triggerOnResetPassword() : null
                    }
                    errors={resetPasswordFormError}
                    errortype="bordertext"
                  />
                </div>
              </div>

              <LoadingButton
                disabled={
                  !(
                    resetPasswordForm.password.trim() &&
                    resetPasswordForm.password_confirmation.trim()
                  )
                }
                onClick={triggerOnResetPassword}
                loading={submissionLoading}
                loadingColor="bg-[#315589]"
                label="Proceed"
                labelLoading="Save..."
                className={`max-w-[368px] w-full mx-auto inline-flex justify-center text-center bg-[#315589] font-poppins text-[#FFFFFF] text-[16px] leading-[24px] font-[600] p-2 rounded-lg`}
              />
            </div>
          )}
        </div>
      )}
    </AuthLayout>
  );
}
