import { parseCookies } from "nookies";
// import moment from "moment-timezone";
import { useEffect, useRef } from "react";
// const tz = moment.tz.guess();
const { default: moment } = await import("moment-timezone");
// const tz = moment.tz.guess();
// moment.tz.setDefault(tz);
import Jsona from "jsona";
const dataFormatter = new Jsona();
const cookies = parseCookies();
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";

export const auth = cookies?.[TOKEN] ? true : false;

export function deserialize(data) {
  return dataFormatter.deserialize(data);
}

export function getCurrentYear() {
  const d = new Date();
  return d.getFullYear();
}

export function sortBlocks(list) {
  return list.sort((a, b) => a.order - b.order);
}

export function sortASC(list, key) {
  return list.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
}
export function sortDESC(list, key) {
  return list.sort((a, b) => {
    if (a[key] < b[key]) {
      return 1;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    return 0;
  });
}

export function paramsToString(params) {
  return params
    ? Object.keys(params)
        .map((key, index) => {
          if (Array.isArray(params[key]))
            return params[key]
              .map((value, i) => `${key}[${i}]=${value}`)
              .join("&");
          else return `${key}=${Object.values(params)[index]}`;
        })
        .join("&")
    : null;
}

export function removeEmptyAttribute(params) {
  Object.keys(params).forEach((e) => {
    if (!params[e]) {
      delete params[e];
    }
  });
}

export function convertDate(date, format = "MMMM DD, yyyy") {
  const tz = moment.tz.guess();
  moment.tz.setDefault(tz);
  return moment.utc(date).tz(tz).format(format);
}

export function convertUnix(date, format = "MMMM DD, yyyy") {
  const tz = moment.tz.guess();
  moment.tz.setDefault(tz);
  return moment.unix(date).format(format);
}

export function validateUnix(unixDate) {
  const tz = moment.tz.guess();
  moment.tz.setDefault(tz);
  return unixDate > moment().unix();
}

export function convertOrdinal(data) {
  return ["st", "nd", "rd"][((((data + 90) % 100) - 10) % 10) - 1] || "th";
}

export function token() {
  const cookies = parseCookies();
  return cookies?.token;
}

export function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export function useFocus() {
  const htmlElRef = useRef();
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
}

export function findError(errors, key) {
  if (errors === "object") {
    return errors.hasOwnProperty(key);
  }
  return false;
}
