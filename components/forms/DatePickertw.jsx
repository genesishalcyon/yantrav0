import { useEffect, useRef, useState } from "react";
import { convertDate } from "@/lib/services/globalService";
export default function DatePickertw({
  instanceId = "",
  options = {},
  placeholder = "Select Date",
  className = "",
  onChange = () => {},
  value,
}) {
  const initialMount = useRef(true);
  const [myDatepicker, setMyDatepicker] = useState();
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      const use = async () => {
        const { Datepicker, Input, initTE } = await import("tw-elements");
        initTE({ Datepicker, Input });
        const datepickerDisableFuture = document.getElementById(
          `datepicker-${instanceId}`
        );
        const myDatepicker = new Datepicker(datepickerDisableFuture, options);
        setMyDatepicker(myDatepicker);

        const datepicker = document.getElementById(`datepicker-${instanceId}`);
        datepicker.addEventListener("dateChange.te.datepicker", (event) => {
          onChange(event.date);
        });
      };
      use();
    }
    return () => {
      document.removeEventListener("dateChange.te.datepicker", onChange);
    };
  }, [instanceId, options, onChange]);

  return (
    <div>
      <div
        className="relative tw-datepicker"
        id={`datepicker-${instanceId}`}
        data-te-input-wrapper-init
        data-te-disable-future
      >
        <input
          type="text"
          value={value ? convertDate(value, "DD/MM/YYYY") : ""}
          className={className}
          placeholder={placeholder}
          onChange={() => {}}
          onClick={() => myDatepicker.open()}
        />
      </div>
    </div>
  );
}
