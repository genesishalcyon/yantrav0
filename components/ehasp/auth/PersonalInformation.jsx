import authStore from "@/lib/store/authStore";
import { shallow } from "zustand/shallow";
import FormField from "@/components/ehasp/partials/forms/FormField";
import genders from "@/lib/constant/genders";
import TIERSAPI from "@/lib/api/tier/request";
import { deserialize } from "@/lib/services/globalService";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { stringOnly } from "@/lib/services/formService";
export default function PersonalInformation() {
  const [registrationForm, onChangeInfo, registrationError] = authStore(
    (state) => [
      state.registrationForm,
      state.onChangeInfo,
      state.registrationError,
    ],
    shallow
  );
  const router = useRouter();
  useEffect(() => {
    const { email = "", first_name = "", last_name = "" } = router?.query;
    if (email && first_name && last_name) {
      onChangeInfo({
        email,
        first_name,
        last_name,
      });
    }
  }, [onChangeInfo, router]);

  const { data } = TIERSAPI.getTiersSwr("", {
    revalidateOnFocus: false,
  });

  const tiers =
    deserialize(data || {})?.map((n) => {
      return {
        value: n.id,
        label: n.name,
      };
    }) || [];

  return (
    <div className="flex flex-col gap-y-4 bg-[#FFFFFF] rounded-[8px] p-12 my-4 border-[1px] border-solid border-[#CBCBCB]">
      <p className="text-[#231F20] text-[20px] font-[700] leading-normal tracking-[1px]">
        Personal Information
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
        <FormField
          type="text"
          name="first_name"
          placeholder="First Name"
          className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
          value={registrationForm.first_name}
          onChange={(e) =>
            onChangeInfo({
              first_name: stringOnly(e?.target?.value, 30),
            })
          }
          // onKeyDown={(e) => (e?.key === "Enter" ? triggerOnRegister() : null)}
          errors={registrationError}
          errortype="bordertext"
          errorBorder="border-[red]"
          requiredLabel={true}
        >
          <label className="text-[#555555] text-[14px] leading-[20px] font-[500]">
            First Name
          </label>
        </FormField>
        <FormField
          type="text"
          name="last_name"
          placeholder="Last Name"
          className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
          value={registrationForm.last_name}
          onChange={(e) =>
            onChangeInfo({ last_name: stringOnly(e?.target?.value, 30) })
          }
          // onKeyDown={(e) => (e?.key === "Enter" ? triggerOnRegister() : null)}
          errors={registrationError}
          errortype="bordertext"
          errorBorder="border-[red]"
          requiredLabel={true}
        >
          <label className="text-[#555555] text-[14px] leading-[20px] font-[500]">
            Last Name
          </label>
        </FormField>

        <FormField
          type="text"
          name="email"
          placeholder="Email Address"
          className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
          value={registrationForm.email}
          onChange={(e) => onChangeInfo({ email: e?.target?.value })}
          // onKeyDown={(e) => (e?.key === "Enter" ? triggerOnRegister() : null)}
          errors={registrationError}
          errortype="bordertext"
          errorBorder="border-[red]"
          requiredLabel={true}
        >
          <label className="text-[#555555] text-[14px] leading-[20px] font-[500]">
            Email Address
          </label>
        </FormField>

        <FormField
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
          value={registrationForm.mobile}
          onChange={(e) =>
            onChangeInfo({ mobile: e?.target?.value.replace(/[A-Za-z]/g, "") })
          }
          // onKeyDown={(e) => (e?.key === "Enter" ? triggerOnRegister() : null)}
          errors={registrationError}
          errortype="bordertext"
          errorBorder="border-[red]"
          requiredLabel={true}
        >
          <label className="text-[#555555] text-[14px] leading-[20px] font-[500]">
            Mobile Number
          </label>
        </FormField>

        <FormField
          type="datepickertw"
          name="birth_date"
          instanceId="birth_date"
          placeholder="Select Birthdate"
          value={registrationForm.birth_date}
          className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
          errors={registrationError}
          errortype="bordertext"
          errorBorder="border-[red]"
          onChange={(date) => onChangeInfo({ birth_date: date })}
          datepickerData={{}}
          // onKeyDown={(e) => (e?.key === "Enter" ? triggerOnRegister() : null)}
          requiredLabel={true}
        >
          <label className="text-[#555555] text-[14px] leading-[20px] font-[500]">
            Select Birthdate
          </label>
        </FormField>

        <FormField
          type="select"
          name="gender"
          instanceId="gender"
          className="react-select cursor-pointer border-[1px] border-[#b3b3b3] rounded-md py-1"
          placeholder="Gender"
          options={genders}
          value={
            genders?.find((e) => e.value === registrationForm.gender) || null
          }
          onChange={(e) =>
            onChangeInfo({
              gender: e?.value || "",
            })
          }
          errors={registrationError}
          errortype="bordertext"
          errorBorder="border-[red]"
          requiredLabel={true}
        >
          <label className="text-[#555555] text-[14px] leading-[20px] font-[500]">
            Gender
          </label>
        </FormField>

        <FormField
          type="password"
          peek={true}
          name="password"
          placeholder="Password"
          className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
          value={registrationForm.password}
          onChange={(e) => onChangeInfo({ password: e?.target?.value })}
          // onKeyDown={(e) => (e?.key === "Enter" ? triggerOnRegister() : null)}
          errors={registrationError}
          errortype="bordertext"
          errorBorder="border-[red]"
          requiredLabel={true}
          helpText="Password must be at least 8 characters, have 1 special character, 1
          number, 1 upper case and 1 lower case."
        >
          <label className="text-[#555555] text-[14px] leading-[20px] font-[500]">
            Password
          </label>
        </FormField>

        <FormField
          type="password"
          peek={true}
          name="password_confirmation"
          placeholder="Confirm Password"
          className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
          value={registrationForm.password_confirmation}
          onChange={(e) =>
            onChangeInfo({ password_confirmation: e?.target?.value })
          }
          // onKeyDown={(e) => (e?.key === "Enter" ? triggerOnRegister() : null)}
          errors={registrationError}
          errortype="bordertext"
          errorBorder="border-[red]"
          requiredLabel={true}
        >
          <label className="text-[#555555] text-[14px] leading-[20px] font-[500]">
            Confirm Password
          </label>
        </FormField>

        <FormField
          type="select"
          name="tier_id"
          instanceId="tier_id"
          className="react-select cursor-pointer border-[1px] border-[#b3b3b3] rounded-md py-1"
          placeholder="Account Type"
          options={tiers}
          value={
            tiers?.find((e) => e.value == registrationForm.tier_id) || null
          }
          onChange={(e) =>
            onChangeInfo({
              tier_id: e?.value || "",
            })
          }
          errors={registrationError}
          errortype="bordertext"
          errorBorder="border-[red]"
          requiredLabel={true}
        >
          <label className="text-[#555555] text-[14px] leading-[20px] font-[500]">
            Account Type
          </label>
        </FormField>
      </div>
    </div>
  );
}
