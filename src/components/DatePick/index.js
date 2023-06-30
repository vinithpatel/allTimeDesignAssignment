import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiCalendar } from "react-icons/bi";

import "./index.css";

const DatePick = (props) => {
  const { onChangeDate, dateObj } = props;

  const onChangeDateValue = (date) => {
    onChangeDate(date);
  };

  return (
    <div className="date-picker-bg-container">
      <DatePicker
        className="date-input"
        onChange={onChangeDateValue}
        selected={dateObj}
      />
      <button className="calendar-button">
        <BiCalendar className="calendar-icon" />
      </button>
    </div>
  );
};

export default DatePick;
