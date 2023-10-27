import BaseModal from "@/components/ehasp/partials/BaseModal";
import FormField from "@/components/ehasp/partials/forms/FormField";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import accountStore from "@/lib/store/accountStore";
import { shallow } from "zustand/shallow";
import genders from "@/lib/constant/genders";
import { toast } from "react-toastify";
import { Fragment, useRef } from "react";
import persistentStore from "@/lib/store/persistentStore";
import {
  validateForm,
  removeFirstSpace,
  stringOnly,
  numberOnly,
} from "@/lib/services/formService";
export default function CustomerInfoModal({ id }) {
  const ref = useRef();
  const profile = persistentStore((state) => state.profile);
  const [
    account,
    informationForm,
    onChangeInfo,
    onUpdateInfo,
    submissionLoading,
    infoError,
    refetchAuth,
  ] = accountStore(
    (state) => [
      state.account,
      state.informationForm,
      state.onChangeInfo,
      state.onUpdateInfo,
      state.submissionLoading,
      state.infoError,
      state.refetchAuth,
    ],
    shallow
  );

  const reset = () => {
    if (profile) {
      accountStore.setState({
        informationForm: {},
      });
    }
  };

  const initialData = {
    first_name: account?.first_name,
    last_name: account?.last_name,
    email: account?.email,
    mobile: account?.mobile,
    birth_date: account?.birth_date,
    gender: account?.gender,
  };

  const triggeronUpdateInfo = async (e) => {
    e.preventDefault();
    if (!profile) {
      // Guest
      accountStore.setState({ infoError: [] });
      const errorsHandler = await validateForm(e, [
        {
          name: "email",
          rules: ["email"],
        },
        {
          name: "first_name",
          rules: ["required"],
        },
        {
          name: "last_name",
          rules: ["required"],
        },
        {
          name: "mobile",
          rules: ["required"],
        },
      ]);
      if (Object.keys(errorsHandler).length) {
        accountStore.setState({ infoError: errorsHandler });
        return;
      }
      persistentStore.setState({ guest: informationForm });
      ref.current.click();
      toast.success("Information Saved", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Authenticated
    const payload = {
      ...initialData,
      ...informationForm,
    };
    onUpdateInfo(payload)
      .then(() => {
        ref.current.click();
        refetchAuth();
        toast.success("Information successfully updated!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch(() => {});
  };

  return (
    <BaseModal id={id} data={{ title: "Customer Information" }}>
      <div className="overflow-auto">
        <form onSubmit={triggeronUpdateInfo}>
          <button
            type="button"
            ref={ref}
            data-te-modal-dismiss
            aria-label="Close"
          ></button>
          <div className="relative overflow-auto md:overflow-visible h-full p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                type="text"
                name="first_name"
                placeholder="First Name"
                className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
                value={
                  typeof informationForm?.first_name !== "undefined"
                    ? informationForm?.first_name
                    : account?.first_name
                }
                onChange={(e) =>
                  onChangeInfo({ first_name: stringOnly(e?.target?.value, 30) })
                }
                errors={infoError}
                errortype="bordertext"
                requiredLabel={true}
              >
                <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
                  First Name
                </label>
              </FormField>

              <FormField
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
                value={
                  typeof informationForm?.last_name !== "undefined"
                    ? informationForm?.last_name
                    : account?.last_name
                }
                onChange={(e) =>
                  onChangeInfo({ last_name: stringOnly(e?.target?.value, 30) })
                }
                errors={infoError}
                errortype="bordertext"
                requiredLabel={true}
              >
                <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
                  Last Name
                </label>
              </FormField>

              <FormField
                type="text"
                name="email"
                placeholder="Email Address"
                className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
                value={
                  typeof informationForm?.email !== "undefined"
                    ? informationForm?.email
                    : account?.email
                }
                onChange={(e) =>
                  onChangeInfo({ email: removeFirstSpace(e?.target?.value) })
                }
                errors={infoError}
                errortype="bordertext"
                requiredLabel={true}
              >
                <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
                  Email Address
                </label>
              </FormField>

              <FormField
                type="text"
                name="mobile"
                placeholder="Mobile"
                className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
                value={
                  typeof informationForm?.mobile !== "undefined"
                    ? informationForm?.mobile
                    : account?.mobile
                }
                onChange={(e) =>
                  onChangeInfo({
                    mobile: numberOnly(e?.target?.value),
                  })
                }
                errors={infoError}
                errortype="bordertext"
                requiredLabel={true}
              >
                <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
                  Mobile Number
                </label>
              </FormField>

              {profile && (
                <Fragment>
                  <FormField
                    type="datepickertw"
                    name="birth_date"
                    instanceId="birth_date"
                    placeholder="Select Birthdate"
                    value={
                      typeof informationForm?.birth_date !== "undefined"
                        ? informationForm?.birth_date
                        : new Date(account?.birth_date)
                    }
                    className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
                    errors={infoError}
                    errortype="bordertext"
                    onChange={(date) => onChangeInfo({ birth_date: date })}
                    requiredLabel={true}
                  >
                    <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
                      Select Birthdate
                    </label>
                  </FormField>

                  <FormField
                    type="select"
                    name="gender"
                    instanceId="gender"
                    className="react-select cursor-pointer border-[1px] border-[#b3b3b3] rounded-md py-2"
                    isClearable={true}
                    placeholder="Select Gender"
                    options={genders}
                    value={
                      typeof informationForm?.gender !== "undefined"
                        ? genders?.find(
                            (e) => e.value === informationForm.gender
                          ) || null
                        : genders?.find((e) => e.value === account.gender) ||
                          null
                    }
                    onChange={(e) =>
                      onChangeInfo({
                        gender: e?.value || "",
                      })
                    }
                    errors={infoError}
                    errortype="bordertext"
                    requiredLabel={true}
                  >
                    <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
                      Gender
                    </label>
                  </FormField>
                </Fragment>
              )}
            </div>
          </div>
          <div className="px-4 py-5 mt-auto flex justify-center md:justify-start gap-x-4 font-poppins text-[#FFFFFF] text-[14px] leading-[20px] font-[500]">
            <LoadingButton
              // onClick={triggeronUpdateInfo}
              loading={submissionLoading}
              loadingColor="bg-[#315589]"
              label="Save"
              labelLoading="Processing..."
              className="flex justify-center items-center bg-[#315589] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
            />

            <button
              className="flex justify-center items-center bg-[#EE3424] py-[14px] md:py-[8px] px-[16px] rounded-[26px] w-full max-w-[190px] md:w-auto md:max-w-auto"
              data-te-modal-dismiss
              aria-label="Close"
              onClick={reset}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
