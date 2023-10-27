import Link from "next/link";
import authStore from "@/lib/store/authStore";
import { shallow } from "zustand/shallow";
import FormField from "@/components/ehasp/partials/forms/FormField";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import { useRouter } from "next/router";
import globalState from "@/lib/store/globalState";
export default function LoginForm({ route = "" }) {
  const router = useRouter();
  const closeAuthModal = globalState((state) => state.closeAuthModal);
  const [loginForm, onChangeLogin, onLogin, loginError, submissionLoading] =
    authStore(
      (state) => [
        state.loginForm,
        state.onChangeLogin,
        state.onLogin,
        state.loginError,
        state.submissionLoading,
      ],
      shallow
    );

  const onLoginTrigger = () => {
    onLogin()
      .then(() => {
        if (route !== "") {
          // Logged in from login page
          // router.replace(route);
          window.location.href = route;
        } else {
          // Logged in from ! login page
          closeAuthModal();
          window.location.reload();
        }
      })
      .catch(() => {});
  };

  return (
    <div className="w-full max-w-[562px] h-auto custom-box-shadow rounded-[8px] px-8 py-16 bg-[#FFFFFF]">
      <h1 className="text-center font-poppins text-[#231F20] text-[24px] md:text-[40px] font-[600] pb-12">
        Login to your account
      </h1>
      <div className="flex flex-col gap-y-4">
        {loginError && typeof loginError === "string" && (
          <div className="text-white bg-[#EE3424] p-2 rounded-lg max-w-[368px] w-full mx-auto">
            <p>{loginError}</p>
          </div>
        )}

        <div className="max-w-[368px] w-full mx-auto">
          <span className="text-[14px] text-[#0A0903] font-medium">
            Email Address
          </span>
          <FormField
            type="text"
            name="email"
            placeholder="Email Address"
            className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
            value={loginForm.email}
            onChange={(e) => onChangeLogin({ email: e?.target?.value })}
            onKeyDown={(e) => (e?.key === "Enter" ? onLoginTrigger() : null)}
            errors={loginError}
            errortype="bordertext"
          />
        </div>

        <div className="max-w-[368px] w-full mx-auto">
          <span className="text-[14px] text-[#0A0903] font-medium">
            Password
          </span>
          <FormField
            type="password"
            peek={true}
            name="password"
            placeholder="Password"
            className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
            value={loginForm.password}
            onChange={(e) => onChangeLogin({ password: e?.target?.value })}
            onKeyDown={(e) => (e?.key === "Enter" ? onLoginTrigger() : null)}
            errors={loginError}
            errortype="bordertext"
          />
        </div>

        <div className="max-w-[368px] w-full mx-auto">
          <button
            className="font-poppins text-[#F05769] text-[16px] leading-[23px] text-center w-full"
            onClick={() => {
              closeAuthModal();
              router.push("/password/request");
            }}
          >
            {`Forgot Password?`}
          </button>
        </div>

        <LoadingButton
          onClick={onLoginTrigger}
          loading={submissionLoading}
          loadingColor="bg-[#315589]"
          label="Login"
          labelLoading="Logging In..."
          className={`max-w-[258px] w-full mx-auto bg-[#315589] text-[#FFFFFF] text-[16px] leading-[24px] font-[700] p-3 rounded-[1.5rem]`}
        />

        <div className="text-center mt-4">
          <button
            className="font-poppins text-[#F05769] text-[16px] leading-[23px]"
            onClick={() => {
              closeAuthModal();
              router.push("/register");
            }}
          >
            New user? Register Here
          </button>
        </div>
      </div>
    </div>
  );
}
