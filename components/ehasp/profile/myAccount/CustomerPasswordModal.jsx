import BaseModal from "@/components/ehasp/partials/BaseModal";
import FormField from "@/components/ehasp/partials/forms/FormField";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import accountStore from "@/lib/store/accountStore";
import { shallow } from "zustand/shallow";
const { toast } = await import("react-toastify");
import { useRef } from "react";
export default function CustomerInfoModal({ id }) {
  const ref = useRef();
  const [
    passwordForm,
    onChangePaswword,
    onUpdatePassword,
    submissionLoading,
    passwordError,
  ] = accountStore(
    (state) => [
      state.passwordForm,
      state.onChangePaswword,
      state.onUpdatePassword,
      state.submissionLoading,
      state.passwordError,
    ],
    shallow
  );

  const reset = () => {
    accountStore.setState({
      passwordForm: {
        current_password: "",
        password: "",
        password_confirmation: "",
      },
    });
  };

  const triggeronUpdatePassword = () => {
    onUpdatePassword()
      .then(() => {
        ref.current.click();
        toast.success("Password successfully updated!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch(() => {});
  };

  return (
    <BaseModal id={id} data={{ title: "Change Password" }}>
      <button ref={ref} data-te-modal-dismiss aria-label="Close"></button>

      <div className="relative overflow-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            type="password"
            peek={true}
            name="current_password"
            placeholder="Current Password"
            className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
            value={passwordForm?.current_password}
            onChange={(e) =>
              onChangePaswword({ current_password: e?.target?.value })
            }
            errors={passwordError}
            errortype="bordertext"
            requiredLabel={true}
          >
            <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
              Current Password
            </label>
          </FormField>

          <div className="hidden md:inline-block"></div>

          <FormField
            type="password"
            peek={true}
            name="password"
            placeholder="New Password"
            className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
            value={passwordForm.password}
            onChange={(e) => onChangePaswword({ password: e?.target?.value })}
            errors={passwordError}
            errortype="bordertext"
            requiredLabel={true}
            helpText="Password must be at least 8 characters, have 1 special character, 1
            number, 1 upper case and 1 lower case."
          >
            <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
              New Password
            </label>
          </FormField>

          <FormField
            type="password"
            peek={true}
            name="password_confirmation"
            placeholder="Confirm Password"
            className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
            value={passwordForm.password_confirmation}
            onChange={(e) =>
              onChangePaswword({ password_confirmation: e?.target?.value })
            }
            errors={passwordError}
            errortype="bordertext"
            requiredLabel={true}
          >
            <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
              Confirm Password
            </label>
          </FormField>
        </div>
      </div>
      <div className="px-4 py-5 mt-auto flex justify-center md:justify-start gap-x-4 font-poppins text-[#FFFFFF] text-[14px] leading-[20px] font-[500]">
        <LoadingButton
          onClick={triggeronUpdatePassword}
          loading={submissionLoading}
          loadingColor="bg-[#C1DD8A]"
          label="Save"
          labelLoading="Processing..."
          className="flex justify-center items-center bg-[#315589] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
        />
        <button
          className="flex justify-center items-center bg-[#EE3424] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
          data-te-modal-dismiss
          aria-label="Close"
          onClick={reset}
        >
          Close
        </button>
      </div>
    </BaseModal>
  );
}
