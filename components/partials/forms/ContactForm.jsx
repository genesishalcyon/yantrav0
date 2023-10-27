import FormField from "@/components/forms/FormField";
import LoadingButton from "@/components/ehasp/partials/LoadingButton";
import { Fragment, useState } from "react";
import { formSubmit, isError, RenderCaptcha } from "@/lib/services/formService";
import formStore from "@/lib/store/formStore";
import { shallow } from "zustand/shallow";
const { toast } = await import("react-toastify");
export default function ContactForm({ form }) {
  const formData = formStore((state) => state);
  const [uploading, captcha, submitLoading] = formStore(
    (state) => [state.uploading, state.captcha, state.submitLoading],
    shallow
  );
  const sections = form?.fields?.blueprint?.schema?.sections || [];
  const [errors, setErrors] = useState([]);
  const findClass = (field) => {
    switch (field) {
      case "subject":
        return "border outline-0 border-[#ADADAD] rounded-[8px] h-[42px] p-[10px] w-[100%]";
      case "message":
        return "w-full outline-0 rounded-[8px] border-[1px] border-[#ADADAD] py-[8.5px] px-3 min-h-[177px] col-span-2 resize-none";
      case "inquiry_type":
        return "react-select border border-[#ADADAD] rounded-[8px] h-[42px] pt-[1px]";
      default:
        return "border outline-0 border-[#ADADAD] rounded-[8px] h-[42px] p-[10px] w-[100%]";
    }
  };
  const findWrapperClass = (field) => {
    switch (field) {
      case "message":
      case "subject":
        return "col-span-2";
      default:
        return "col-span-2 sm:col-span-1";
    }
  };
  const [token, setToken] = useState();

  const successCallback = () => {
    toast.success(
      "Thank you for messaging us. We will get back to you in a while.",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  };
  return (
    <>
      {sections.map((section) => {
        const fields = section?.fields || [];
        return (
          <Fragment key={section?.state_name}>
            <form
              onSubmit={(e) =>
                formSubmit({
                  e,
                  formId: form.id,
                  setToken,
                  token,
                  captcha,
                  sections,
                  setErrors,
                  formData,
                  successCallback,
                })
              }
            >
              <div className="font-poppins text-[#555555] text-[16px] leading-[23px] grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fields.map((field, index) => (
                  <Fragment key={field?.state_name}>
                    <div
                      className={`flex flex-col ${
                        index >= fields.length - 2
                          ? "grid grid-cols-2 col-span-5 sm:col-span-2"
                          : "col-span-5 sm:col-span-1"
                      }`}
                    >
                      <label className="font-[500]">{field.title}</label>
                      <FormField
                        {...field}
                        className={findClass(field?.state_name)}
                        wrapperclassname={findWrapperClass(field?.state_name)}
                        error={isError(
                          errors,
                          section?.state_name,
                          field?.state_name
                        )}
                      >
                        <p className="font-[500]">{field.title}</p>
                      </FormField>
                    </div>
                  </Fragment>
                ))}
              </div>

              {form?.attributes?.uses_captcha && (
                <RenderCaptcha setToken={setToken} />
              )}
              <p className="mt-10 font-poppins text-[#555555] text-[10px] leading-[18px] text-center tracking-[0.3px]">
                This site is protected by reCAPTCHA and the Google{" "}
                <span className="text-[#F05769] font-[700] cursor-pointer">
                  Privacy Policy
                </span>{" "}
                and{" "}
                <span className="text-[#F05769] font-[700] cursor-pointer">
                  Terms of Service
                </span>{" "}
                apply.
              </p>
              <div className="flex flex-col mt-[18px] items-center">
                <LoadingButton
                  onClick={() => {}}
                  loading={uploading || submitLoading}
                  loadingColor="bg-[#EB8CAF] w-full 2sm:w-[40%]"
                  label="Submit"
                  labelLoading="Submitting..."
                  className={`bg-[#315589] text-[#FFFFFF] text-[16px] leading-[23px] font-[700] w-full 2sm:w-[40%] py-[16px] rounded-[70px] sm:rounded-[60px]`}
                />
              </div>
            </form>
          </Fragment>
        );
      })}
    </>
  );
}
