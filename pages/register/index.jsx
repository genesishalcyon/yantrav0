import authStore from "@/lib/store/authStore";
import { shallow } from "zustand/shallow";
import PersonalInformation from "@/components/ehasp/auth/PersonalInformation";
import RegistrationAddress from "@/components/ehasp/auth/RegistrationAddress";
import { useRouter } from "next/router";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
export default function Register() {
  const router = useRouter();
  const [onRegister, submissionLoading] = authStore(
    (state) => [state.onRegister, state.submissionLoading],
    shallow
  );
  const onRegisterTrigger = () => {
    onRegister()
      .then(() => {
        router.replace("/register/success");
      })
      .catch(() => {});
  };
  return (
    <>
      <div className="bg-[#FFF] w-full h-[160px]">
        <div className="flex items-end h-full max-w-xl px-4 py-6 mx-auto xl:px-0">
          <p className="font-poppins text-[#231F20] text-[40px] font-[600] leading-normal tracking-[2px]">
            Create An Account
          </p>
        </div>
      </div>
      <div className="bg-[#FFF]">
        <div className="max-w-xl px-4 py-6 mx-auto xl:px-0">
          <PersonalInformation />
          <RegistrationAddress />
          <div className="flex justify-end gap-x-8">
            <button className="max-w-[285px] w-full h-[51px] bg-[#EE3424] text-[#FFF] text-[16px] leading-normal font-[700] p-2 tracking-[0.8px] rounded-[60px]">
              Cancel
            </button>
            <LoadingButton
              onClick={onRegisterTrigger}
              loading={submissionLoading}
              loadingColor="bg-[#EE3424]"
              label="Register"
              labelLoading="Processing..."
              className={`max-w-[285px] w-full h-[51px] bg-[#315589] text-[#FFF] text-[16px] leading-normal font-[700] p-2 tracking-[0.8px] rounded-[60px]`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
