import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./index.css";

const DatePick = (props) => {
  const { onChangeDate, dateObj } = props;

  const onChangeDateValue = (date) => {
    onChangeDate(date);
  };

  return (
    <DatePicker
      showIcon
      className="date-input"
      onChange={onChangeDateValue}
      selected={dateObj}
    />
  );
};

export default DatePick;
