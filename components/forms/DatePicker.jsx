import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
export default function Input(props) {
  return (
    <DatePicker
      {...props}
      selected={props?.value}
      placeholderText={props?.placeholder}
    />
  );
}
