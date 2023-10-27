import dynamic from "next/dynamic";
// import DatePicker from "@/components/forms/DatePicker";
// import DatePickerCustom from "@/components/forms/DatePickerCustom";
import DatePickertw from "@/components/forms/DatePickertw";
import Textarea from "@/components/forms/Textarea";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import ClearDiscountIcon from "@/components/svg/ClearDiscountIcon";
import Visibility from "@/components/svg/Visibility";
import VisibilityOff from "@/components/svg/VisibilityOff";
import { useState } from "react";
export default function FormField(props) {
  const DatePicker = dynamic(() => import("@/components/forms/DatePicker"));
  const DatePickerCustom = dynamic(() =>
    import("@/components/forms/DatePickerCustom")
  );

  const [peek, setPeek] = useState(false);
  const errortype = props?.errortype || "";
  const errors = props?.errors || "";
  const fieldClass = props?.className;
  const datepickerData = props?.datepickerData || "";
  const textClass = props?.textClass || "text-red-600";
  const type =
    props.type === "password" ? (peek ? "text" : "password") : props.type;
  const inputProps = {
    ...props,
  };
  delete inputProps.wrapperclassname;
  delete inputProps.children;
  delete inputProps.errors;
  delete inputProps.errortype;
  delete inputProps.textClass;
  delete inputProps.datepickerData;
  delete inputProps.onClear;
  delete inputProps.peek;
  delete inputProps.errorBorder;
  delete inputProps.helpText;
  delete inputProps.requiredLabel;

  const renderInput = () => {
    switch (props?.type) {
      case "text":
      case "date":
      case "password":
        return (
          <div className={props?.wrapperclassname}>
            {props.children}
            {props?.requiredLabel && (
              <span className="ml-2 text-red-600">*</span>
            )}
            <div className="relative">
              <Input
                {...inputProps}
                type={type}
                className={`${fieldClass} ${
                  errors[props?.name] &&
                  (errortype === "border" || errortype === "bordertext")
                    ? props?.errorBorder
                    : ""
                }`}
              />

              {props.onClear && props.value && (
                <button
                  onClick={() => props.onClear()}
                  className="absolute right-[10px] top-[50%] translate-y-[-50%]"
                >
                  <ClearDiscountIcon fill="#555" />
                </button>
              )}

              {props.required && (
                <span className="absolute right-[-15px] top-[50%] translate-y-[-50%] text-red-600">
                  *
                </span>
              )}

              {props.peek === true && (
                <button
                  onClick={() => setPeek((prev) => !prev)}
                  className="absolute right-[12px] top-[50%] translate-y-[-50%] text-red-600"
                >
                  {peek ? <Visibility /> : <VisibilityOff />}
                </button>
              )}
            </div>
            {errors[props?.name] &&
              (errortype === "text" || errortype === "bordertext") && (
                <div className={`text-[12px] mt-[2px] ${textClass}`}>
                  {errors[props?.name][0].replaceAll("_", " ")}
                </div>
              )}
            {props.helpText && (
              <small className="font-poppins text-[#6B7280] text-[11px] leading-[16px] italic">
                {props.helpText}
              </small>
            )}
          </div>
        );
      case "textarea":
        return (
          <div className={props?.wrapperclassname}>
            {props.children}
            {props?.requiredLabel && (
              <span className="ml-2 text-red-600">*</span>
            )}
            <Textarea
              {...inputProps}
              className={`${fieldClass} ${
                errors[props?.name] &&
                (errortype === "border" || errortype === "bordertext")
                  ? props?.errorBorder
                  : ""
              }`}
            />
            {errors[props?.name] &&
              (errortype === "text" || errortype === "bordertext") && (
                <div className={`text-[12px] mt-[2px] ${textClass}`}>
                  {errors[props?.name][0].replaceAll("_", " ")}
                </div>
              )}
          </div>
        );
      case "select":
        return (
          <div className={props?.wrapperclassname}>
            {props.children}
            {props?.requiredLabel && (
              <span className="ml-2 text-red-600">*</span>
            )}
            <div className="relative">
              <Select
                {...inputProps}
                className={`${fieldClass} ${
                  errors[props?.name] &&
                  (errortype === "border" || errortype === "bordertext")
                    ? props?.errorBorder
                    : ""
                }`}
              />
              {props.required && (
                <span className="absolute right-[-15px] top-[50%] translate-y-[-50%] text-red-600">
                  *
                </span>
              )}
            </div>
            {errors[props?.name] &&
              (errortype === "text" || errortype === "bordertext") && (
                <div className={`text-[12px] mt-[2px] ${textClass}`}>
                  {errors[props?.name][0].replaceAll("_", " ")}
                </div>
              )}
          </div>
        );
      case "datepicker":
        return (
          <div className={props?.wrapperclassname}>
            {props.children}
            {props?.requiredLabel && (
              <span className="ml-2 text-red-600">*</span>
            )}
            {datepickerData ? (
              <DatePickerCustom
                {...inputProps}
                className={`${fieldClass} ${
                  errors[props?.name] &&
                  (errortype === "border" || errortype === "bordertext")
                    ? props?.errorBorder
                    : ""
                }`}
              />
            ) : (
              <DatePicker
                {...inputProps}
                className={`${fieldClass} ${
                  errors[props?.name] &&
                  (errortype === "border" || errortype === "bordertext")
                    ? props?.errorBorder
                    : ""
                }`}
              />
            )}

            {errors[props?.name] &&
              (errortype === "text" || errortype === "bordertext") && (
                <div className={`text-[12px] mt-[2px] ${textClass}`}>
                  {errors[props?.name][0].replaceAll("_", " ")}
                </div>
              )}
          </div>
        );
      case "datepickertw":
        return (
          <div className={props?.wrapperclassname}>
            {props.children}
            {props?.requiredLabel && (
              <span className="ml-2 text-red-600">*</span>
            )}
            <div className="relative">
              <DatePickertw
                {...inputProps}
                className={`${fieldClass} ${
                  errors[props?.name] &&
                  (errortype === "border" || errortype === "bordertext")
                    ? props?.errorBorder
                    : ""
                }`}
              />
              {props.required && (
                <span className="absolute right-[-15px] top-[50%] translate-y-[-50%] text-red-600">
                  *
                </span>
              )}
            </div>
            {errors[props?.name] &&
              (errortype === "text" || errortype === "bordertext") && (
                <div className={`text-[12px] mt-[2px] ${textClass}`}>
                  {errors[props?.name][0].replaceAll("_", " ")}
                </div>
              )}
          </div>
        );
    }
  };

  return <>{renderInput()}</>;
}
