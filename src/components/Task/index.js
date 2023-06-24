import { FaCheck } from "react-icons/fa";
import { BiSolidPencil, BiSolidBellRing, BiCheck } from "react-icons/bi";

import "./index.css";

const Task = (props) => {
  const { taskDetails } = props;
  const { taskDate, taskMsg, isCompleted } = taskDetails;

  const getFormatedDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="task-card">
      <div className="task-left-card">
        <div className="task-circle"></div>
        <div className="task-information-card">
          <p className="task-msg">{taskMsg}</p>
          <p className="task-date">{getFormatedDate(taskDate)}</p>
        </div>
      </div>
      <div className="task-control-card">
        <button className="edit-button">
          <BiSolidPencil className="edit-icon" />
        </button>
        <button className="edit-button">
          <BiSolidBellRing className="edit-icon" />
        </button>
        <button className="edit-button">
          <FaCheck className="edit-icon" />
        </button>
      </div>
    </div>
  );
};

export default Task;
