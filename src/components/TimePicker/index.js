import { getHours, getMinutes, setHours, setMinutes } from "date-fns";
import { BiTimeFive } from "react-icons/bi";
import "./index.css";

const TimePicker = (props) => {
  const { dateObj, updateTime } = props;
  const hours = getHours(dateObj);
  const minutes = getMinutes(dateObj);

  const onChangeTime = (event) => {
    const [uHours, uMinutes] = event.target.value.split(":");
    let updatedDateObj = setHours(dateObj, uHours);
    updatedDateObj = setMinutes(updatedDateObj, uMinutes);

    updateTime(updatedDateObj);
  };

  return (
    <div className="time-bg-container">
      <button className="time-button">
        <BiTimeFive className="time-icon" />
      </button>

      <select
        className="time-dropdown"
        value={`${hours}:${minutes}`}
        onChange={onChangeTime}
      >
        <option defaultChecked value="00:00">
          Time
        </option>
        <option value={"0:0"}>12:00am</option>
        <option value={"0:30"}>12:30am</option>
        <option value={"1:0"}>01:00am</option>
        <option value={"1:30"}>01:30am</option>
        <option value={"2:0"}>02:00am</option>
        <option value={"2:30"}>02:30am</option>
        <option value={"3:0"}>03:00am</option>
        <option value={"3:30"}>03:30am</option>
        <option value={"4:0"}>04:00am</option>
        <option value={"4:30"}>04:30am</option>
        <option value={"5:0"}>05:00am</option>
        <option value={"5:30"}>05:30am</option>
        <option value={"6:0"}>06:00am</option>
        <option value={"6:30"}>06:30am</option>
        <option value={"7:0"}>07:00am</option>
        <option value={"7:30"}>07:30am</option>
        <option value={"8:0"}>08:00am</option>
        <option value={"8:30"}>08:30am</option>
        <option value={"9:0"}>09:00am</option>
        <option value={"9:30"}>09:30am</option>
        <option value={"10:0"}>10:00am</option>
        <option value={"10:30"}>10:30am</option>
        <option value={"11:0"}>11:00am</option>
        <option value={"11:30"}>11:30am</option>

        <option value={"12:0"}>12:00pm</option>
        <option value={"12:30"}>12:30pm</option>
        <option value={"13:0"}>01:00pm</option>
        <option value={"13:30"}>01:30pm</option>
        <option value={"14:0"}>02:00pm</option>
        <option value={"14:30"}>02:30pm</option>
        <option value={"15:0"}>03:00pm</option>
        <option value={"15:30"}>03:30pm</option>
        <option value={"16:0"}>04:00pm</option>
        <option value={"16:30"}>04:30pm</option>
        <option value={"17:0"}>05:00pm</option>
        <option value={"17:30"}>05:30pm</option>
        <option value={"18:0"}>06:00pm</option>
        <option value={"18:30"}>06:30pm</option>
        <option value={"19:0"}>07:00pm</option>
        <option value={"19:30"}>07:30pm</option>
        <option value={"20:0"}>08:00pm</option>
        <option value={"20:30"}>08:30pm</option>
        <option value={"21:0"}>09:00pm</option>
        <option value={"21:30"}>09:30pm</option>
        <option value={"22:0"}>10:00pm</option>
        <option value={"22:30"}>10:30pm</option>
        <option value={"23:0"}>11:00pm</option>
        <option value={"23:30"}>11:30pm</option>
      </select>
    </div>
  );
};

export default TimePicker;
