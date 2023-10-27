import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { getCurrentYear } from "@/lib/services/globalService";
import ChevronIcon from "@/components/svg/ChevronIcon";
export default function DatePickerCustom(props) {
  const years = [];
  for (let index = getCurrentYear(); index >= 1980; index--) {
    years.push(index);
  }
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <DatePicker
      {...props}
      selected={props?.value}
      placeholderText={props?.placeholder}
      maxDate={new Date()}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="m-[10px] flex justify-between font-poppins text-[#555]">
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <ChevronIcon fill="#18ACBA" className="rotate-[180deg]" />
          </button>
          <select
            className="w-full mx-[1px] px-2 py-1 rounded-l-md cursor-pointer"
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="w-full mx-[1px] px-2 py-1 rounded-r-md cursor-pointer"
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <ChevronIcon fill="#18ACBA" />
          </button>
        </div>
      )}
      renderDayContents={(day, date) => (
        <span className="font-poppins">{day}</span>
      )}
    />
  );
}
