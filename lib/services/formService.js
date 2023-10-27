import FORMAPI from "@/lib/api/forms/request";
import formStore from "@/lib/store/formStore";
import globalData from "@/lib/preBuildScripts/static/globalData.json";
import CloudFlareRecaptcha from "@/components/partials/CloudFlareRecaptcha";
import GoogleRecaptcha from "@/components/partials/GoogleRecaptcha";
export async function formSubmit({
  e,
  formId,
  setToken,
  token,
  captcha,
  sections,
  setErrors,
  formData = {},
  successCallback = () => {},
  errorCallback = () => {},
}) {
  e.preventDefault();
  formStore.setState({
    formSuccessInfo: false,
    submitLoading: true,
  });
  setErrors([]);
  const payload = {};
  const findValue = (field) => {
    switch (field.type) {
      case "file":
      case "checkbox":
        return formData?.[field.state_name] || "";
      case "select":
        if (field.multiple) return formData?.[field.state_name] || [];
      default:
        return e.target[field.state_name]?.value;
    }
  };

  sections.forEach((section) => {
    let sectionPayload = {};
    let fields = section?.fields || [];
    fields.forEach((field) => {
      sectionPayload[field.state_name] = findValue(field);
    });
    payload[section?.state_name] = sectionPayload;
  });

  payload["captcha_token"] = token;

  await FORMAPI.submitForm(formId, payload)
    .then(() => {
      e.target.reset();
      formStore.setState({
        formSuccessInfo: true,
        submitLoading: false,
      });
      formData?.reset();
      successCallback();
    })
    .catch((err) => {
      setErrors(err?.data?.errors || {});
      errorCallback();
      formStore.setState({
        submitLoading: false,
      });
    });
  captcha?.current?.reset();
  setToken("");
}

export function isError(errors, stateName, field) {
  const index = stateName + "." + field;
  const data = errors?.[index];
  return data?.[0]?.replace(stateName + ".", "") || "";
}

export function RenderCaptcha({ setToken }) {
  const { formSetting } = globalData;
  if (formSetting?.provider) {
    return formSetting.provider === "google_recaptcha" ? (
      <GoogleRecaptcha setToken={setToken} sitekey={formSetting.site_key} />
    ) : (
      <CloudFlareRecaptcha setToken={setToken} sitekey={formSetting.site_key} />
    );
  }
  return;
}

export async function validateForm(e, validations = []) {
  let errors = {};
  validations.forEach((validation) => {
    const field = e.target[validation.name];
    validation.rules?.forEach((rule) => {
      switch (rule) {
        case "email":
          if (!isValidEmail(field.value)) {
            errors = {
              ...errors,
              [validation.name]: [
                `The ${validation.name} must be a valid email address.`,
              ],
            };
          }
        case "required":
          if (!isValidString(field.value)) {
            errors = {
              ...errors,
              [validation.name]: [`The ${validation.name} field is required.`],
            };
          }
      }
    });
  });
  return errors;
}

export function isValidEmail(email = "") {
  // Define the regular expression pattern for a valid email address
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Use the test() method to match the pattern against the email
  return pattern.test(email);
}

export function isValidString(value = "") {
  return removeFirstSpace(value).length !== 0;
}

export function removeFirstSpace(value = "") {
  return value.replace(/^\s+/, "");
}

export function numberOnly(value = "") {
  return removeFirstSpace(value.replace(/[A-Za-z]/g, ""));
}

export function stringOnly(value = "", limit = false) {
  const numberPattern = /[0-9]/g;
  const removeFirstSpace = /^\s+/;
  if (limit > 0) {
    value = value.substring(0, limit);
  }
  return value.replace(removeFirstSpace, "").replace(numberPattern, "");
}

export function removeNonAlphaChar(value = "") {
  const nonAlphabetPattern = /[^A-Za-z\s]+/g;
  const removeFirstSpace = /^\s+/;
  return value.replace(removeFirstSpace, "").replace(nonAlphabetPattern, "");
}

export function limitToSpecificCharacters(value, limit) {
  const pattern = new RegExp(`^.{1,${limit}}$`);
  return pattern.test(value);
}

// export function stringOnly(value = "") {
//   return removeFirstSpace(value.replace(/[A-Za-z]/g, ""));
// }
// function containsOnlyAlphabet(text) {
//   // Define a regular expression pattern to match any non-alphabet characters
//   const nonAlphabetPattern = /[^A-Za-z]/;

//   // Use the test() method to check if the pattern is not found in the text
//   return !nonAlphabetPattern.test(text);
// }
