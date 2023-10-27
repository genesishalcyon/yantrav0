import HomeAddressIcon from "@/components/svg/HomeAddressIcon";
import OfficeAddressIcon from "@/components/svg/OfficeAddressIcon";
import addressStore from "@/lib/store/addressStore";
import { shallow } from "zustand/shallow";
import FormField from "@/components/ehasp/partials/forms/FormField";
import COUNTRYAPI from "@/lib/api/country/request";
import { deserialize } from "@/lib/services/globalService";
import { useState } from "react";
export default function Address({
  addressForm,
  title,
  titleClassName,
  id,
  fieldOnChange,
  errors,
}) {
  COUNTRYAPI.getCountriesSwr("", {
    revalidateOnFocus: false,
    onSuccess: (res) => {
      const handler = deserialize(res.data);
      const countries = handler.map((e) => {
        return {
          value: e.id,
          label: e.name,
        };
      });
      addressStore.setState({ countries });
    },
  });

  COUNTRYAPI.getCountriesSwr(`/${addressForm?.country_id}?include=states`, {
    render: addressForm?.country_id,
    revalidateOnFocus: false,
    onSuccess: (res) => {
      const handler = deserialize(res.data);
      const regions = handler.states.map((e) => {
        return {
          value: e.id,
          label: e.name,
        };
      });
      // addressStore.setState({ regions });
      setRegions(regions);
    },
  });

  const [regions, setRegions] = useState([]);

  const countries = addressStore((state) => state.countries, shallow);

  return (
    <div className="flex flex-col gap-y-10">
      <p className={titleClassName}>{title}</p>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <label className="text-[#555] text-[14px] font-[500] leading-[20px]">
            Address Label <span className="ml-2 text-red-600">*</span>
          </label>
          <div className="flex flex-wrap gap-4">
            <label
              htmlFor={`${id}.home`}
              className={`
            w-full flex justify-center items-center gap-x-2 sm:max-w-[209px] lg:max-w-[309px] px-[12px] py-[6px] rounded-[8px] text-[14px] leading-[20px] cursor-pointer
            ${
              addressForm.label_as === "home"
                ? "bg-[#315589] text-[#FFFFFF]"
                : "bg-[#FFFFFF] text-[#1F2937] border-[1px] border-[#D1D5DB]"
            }
          `}
            >
              <input
                id={`${id}.home`}
                type="radio"
                name={`${id}.label_as`}
                defaultChecked={addressForm.label_as === "home"}
                value="home"
                className="hidden"
                onClick={(e) => fieldOnChange({ label_as: e.target.value })}
              />
              <HomeAddressIcon
                fill={addressForm.label_as === "home" ? "#FFFFFF" : "#0F172A"}
              />
              Home
            </label>
            <label
              htmlFor={`${id}.office`}
              className={`
            w-full flex justify-center items-center gap-x-2 sm:max-w-[209px] lg:max-w-[309px] px-[12px] py-[6px] rounded-[8px] text-[14px] leading-[20px] cursor-pointer
            ${
              addressForm.label_as === "office"
                ? "bg-[#EE3424] text-[#FFFFFF]"
                : "bg-[#FFFFFF] text-[#1F2937] border-[1px] border-[#D1D5DB]"
            }
          `}
            >
              <input
                id={`${id}.office`}
                type="radio"
                name={`${id}.label_as`}
                defaultChecked={addressForm.label_as === "office"}
                value="office"
                className="hidden"
                onClick={(e) => fieldOnChange({ label_as: e.target.value })}
              />
              <OfficeAddressIcon
                fill={addressForm.label_as === "office" ? "#FFFFFF" : "#0F172A"}
              />
              Office
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
          <div className="flex flex-col col-span-1 sm:col-span-2 gap-y-[6px]">
            <FormField
              type="text"
              name={`${id}.address_line_1`}
              placeholder="House/Unit/Flr #, Bldg Name, Blk or Lot #"
              className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
              value={addressForm.address_line_1}
              onChange={(e) =>
                fieldOnChange({ address_line_1: e?.target?.value })
              }
              errors={errors}
              errortype="bordertext"
              errorBorder="border-[red]"
              requiredLabel={true}
            >
              <label className="text-[#555] text-[14px] font-[500] leading-[20px]">
                House/Unit/Flr #, Bldg Name, Blk or Lot #
              </label>
            </FormField>
          </div>
          <div className="flex flex-col gap-y-[6px]">
            <FormField
              type="select"
              name={`${id}.country_id`}
              instanceId={`countries-${id}`}
              className="react-select cursor-pointer border-[1px] border-[#b3b3b3] rounded-md py-1"
              isClearable={true}
              placeholder="Select Country"
              options={countries}
              value={
                countries?.find((e) => e.value === addressForm.country_id) ||
                null
              }
              onChange={(e) => {
                fieldOnChange({
                  country_id: e?.value || "",
                  state_id: "",
                  town: "",
                  zip_code: "",
                });
              }}
              errors={errors}
              errortype="bordertext"
              errorBorder="border-[red]"
              requiredLabel={true}
            >
              <label className="text-[#555] text-[14px] font-[500] leading-[20px]">
                Country
              </label>
            </FormField>
          </div>
          <div className="flex flex-col gap-y-[6px]">
            <FormField
              type="select"
              name={`${id}.state_id`}
              instanceId={`regions-${id}`}
              className="react-select cursor-pointer border-[1px] border-[#b3b3b3] rounded-md py-1"
              isClearable={true}
              placeholder="Select State / Region"
              options={regions}
              value={
                regions?.find((e) => e.value === addressForm.state_id) || null
              }
              onChange={(e) => {
                fieldOnChange({
                  state_id: e?.value || "",
                  town: "",
                  zip_code: "",
                });
              }}
              errors={errors}
              errortype="bordertext"
              errorBorder="border-[red]"
              requiredLabel={true}
            >
              <label className="text-[#555] text-[14px] font-[500] leading-[20px]">
                State
              </label>
            </FormField>
          </div>
          <div className="flex flex-col gap-y-[6px]">
            <FormField
              type="text"
              name={`${id}.city`}
              placeholder="Province / City / Town"
              className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
              value={addressForm.city}
              onChange={(e) => fieldOnChange({ city: e?.target?.value })}
              errors={errors}
              errortype="bordertext"
              errorBorder="border-[red]"
              requiredLabel={true}
            >
              <label className="text-[#555] text-[14px] font-[500] leading-[20px]">
                City
              </label>
            </FormField>
          </div>
          <div className="flex flex-col gap-y-[6px]">
            <FormField
              type="text"
              name={`${id}.zip_code`}
              placeholder="Zip Code"
              className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
              value={addressForm.zip_code}
              onChange={(e) => fieldOnChange({ zip_code: e?.target?.value })}
              errors={errors}
              errortype="bordertext"
              errorBorder="border-[red]"
              requiredLabel={true}
            >
              <label className="text-[#555] text-[14px] font-[500] leading-[20px]">
                Zip
              </label>
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );
}
