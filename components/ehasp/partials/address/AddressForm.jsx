import HomeAddressIcon from "@/components/svg/HomeAddressIcon";
import OfficeAddressIcon from "@/components/svg/OfficeAddressIcon";
import addressStore from "@/lib/store/addressStore";
import { shallow } from "zustand/shallow";
import FormField from "@/components/ehasp/partials/forms/FormField";
import COUNTRYAPI from "@/lib/api/country/request";
import { deserialize } from "@/lib/services/globalService";
import persistentStore from "@/lib/store/persistentStore";
export default function AddressForm({
  className = "grid grid-cols-1 p-4 md:grid-cols-2 md:gap-x-4 gap-y-6",
}) {
  const profile = persistentStore((state) => state.profile);
  const [
    addressForm,
    countries,
    regions,
    fieldOnChange,
    formErrors,
    addressType,
  ] = addressStore(
    (state) => [
      state.addressForm,
      state.countries,
      state.regions,
      state.fieldOnChange,
      state.formErrors,
      state.addressType,
    ],
    shallow
  );

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
      addressStore.setState({ regions });
    },
  });

  return (
    <>
      <div className={className}>
        <div className="flex flex-col md:col-span-2">
          {formErrors && typeof formErrors === "string" && (
            <div className="text-white bg-[#ff9797] p-2 rounded-lg w-full mx-auto mb-4">
              <p>{formErrors}</p>
            </div>
          )}
          <div>
            <p className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
              Address Label <span className="ml-2 text-red-600">*</span>
            </p>
            <div className="flex justify-between gap-4">
              <label
                htmlFor="home"
                className={`
              w-full flex justify-center items-center gap-x-2 px-[12px] py-[6px] rounded-[8px] text-[14px] leading-[20px] cursor-pointer
              ${
                addressForm.label_as === "home"
                  ? "bg-[#315589] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#1F2937] border-[1px] border-[#D1D5DB]"
              }
            `}
              >
                <input
                  id="home"
                  type="radio"
                  name="label_as"
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
                htmlFor="office"
                className={`
              w-full flex justify-center items-center gap-x-2 px-[12px] py-[6px] rounded-[8px] text-[14px] leading-[20px] cursor-pointer
              ${
                addressForm.label_as === "office"
                  ? "bg-[#315589] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#1F2937] border-[1px] border-[#D1D5DB]"
              }
            `}
              >
                <input
                  id="office"
                  type="radio"
                  name="label_as"
                  defaultChecked={addressForm.label_as === "office"}
                  value="office"
                  className="hidden"
                  onClick={(e) => fieldOnChange({ label_as: e.target.value })}
                />
                <OfficeAddressIcon
                  fill={
                    addressForm.label_as === "office" ? "#FFFFFF" : "#0F172A"
                  }
                />
                Office
              </label>
            </div>
          </div>
        </div>
        <FormField
          type="text"
          name={`address_line_1`}
          placeholder="House/Unit/Flr #, Bldg Name, Blk or Lot #"
          wrapperclassname="md:col-span-2"
          className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
          value={addressForm.address_line_1}
          onChange={(e) => fieldOnChange({ address_line_1: e?.target?.value })}
          errors={formErrors}
          errortype="bordertext"
          requiredLabel={true}
        >
          <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
            House/Unit/Flr #, Bldg Name, Blk or Lot #
          </label>
        </FormField>
        <FormField
          type="select"
          name={`country_id`}
          instanceId={`countries`}
          className="react-select cursor-pointer border-[1px] border-[#b3b3b3] rounded-md py-2"
          isClearable={true}
          placeholder="Select Country"
          options={countries}
          value={
            countries?.find((e) => e.value === addressForm.country_id) || null
          }
          onChange={(e) => {
            fieldOnChange({
              country_id: e?.value || "",
              state_id: "",
              city: "",
              zip_code: "",
            });
          }}
          errors={formErrors}
          errortype="bordertext"
          requiredLabel={true}
        >
          <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
            Country
          </label>
        </FormField>
        <FormField
          type="select"
          name={`state_id`}
          instanceId={`regions`}
          className="react-select cursor-pointer border-[1px] border-[#b3b3b3] rounded-md py-2"
          isClearable={true}
          placeholder="Select State / Region"
          options={regions}
          value={regions?.find((e) => e.value === addressForm.state_id) || null}
          onChange={(e) => {
            fieldOnChange({
              state_id: e?.value || "",
              state: regions?.find((n) => n.value === e?.value)?.label || null,
              city: "",
              zip_code: "",
            });
          }}
          errors={formErrors}
          errortype="bordertext"
          requiredLabel={true}
        >
          <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
            State
          </label>
        </FormField>
        <FormField
          type="text"
          name={`city`}
          placeholder="Province / City / Town"
          className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
          value={addressForm.city}
          onChange={(e) => fieldOnChange({ city: e?.target?.value })}
          errors={formErrors}
          errortype="bordertext"
          requiredLabel={true}
        >
          <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
            City
          </label>
        </FormField>
        <FormField
          type="text"
          name={`zip_code`}
          placeholder="Zip Code"
          className="p-2 border-[1px] border-[#bababa] rounded-lg w-full"
          value={addressForm.zip_code}
          onChange={(e) => fieldOnChange({ zip_code: e?.target?.value })}
          errors={formErrors}
          errortype="bordertext"
          requiredLabel={true}
        >
          <label className="font-poppins text-[#555555] text-[14px] leading-[20px] font-[500]">
            Zip
          </label>
        </FormField>
        {!profile && addressType === "shipping" && (
          <div className="flex items-center gap-x-2">
            <input
              id="shippingIsbilling"
              type="checkbox"
              onChange={(e) =>
                fieldOnChange({ shippingIsbilling: e.target.checked })
              }
            />
            <label
              className="cursor-pointer text-[#374151] text-[14px] leading-[20px] font-[500]"
              htmlFor="shippingIsbilling"
            >
              Set this as billing address as well
            </label>
          </div>
        )}
      </div>
    </>
  );
}
