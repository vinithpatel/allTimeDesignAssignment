import { Component } from "react";
import { FaCheck } from "react-icons/fa";
import { TbLayoutBottombar } from "react-icons/tb";
import { BiSolidPencil, BiSolidBellRing } from "react-icons/bi";
import { isFuture, format } from "date-fns";

import ModifyTask from "../ModifyTask";

import "./index.css";

const hardCodedValues = {
  companyId: "company_0f8d040401d14916bc2430480d7aa0f8",
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODc1NDY3ODgsIm5iZiI6MTY4NzU0Njc4OCwianRpIjoiMDBiMTg4YzUtNmRlNC00NTg4LWJjYjMtMzJiNWM4MDA4ODYyIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.OpprNi0ekJlCqPwHj3MhpP7Ar_Xw8JaX2nebKt9qjWc",
};

class Task extends Component {
  state = {
    isEditOpen: false,
    taskDetails: this.props.taskDetails,
  };

  updateTask = async (taskDescription, userId, dateObj) => {
    const { taskDetails } = this.state;
    const { id } = taskDetails;

    const taskDate = format(dateObj, "yyyy-MM-dd");
    const taskTime = this.getTaskTimeInSeconds(format(dateObj, "HH:mm"));

    const taskData = {
      assigned_user: userId,
      task_date: taskDate,
      task_time: taskTime,
      is_completed: isFuture(dateObj) ? 0 : 1,
      time_zone: 19800,
      task_msg: taskDescription,
    };

    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=company_0f8d040401d14916bc2430480d7aa0f8`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${hardCodedValues.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const newTask = {
        id,
        taskDate,
        taskTime,
        taskMsg: taskDescription,
        isCompleted: isFuture(dateObj) ? 0 : 1,
      };

      this.setState({ taskDetails: newTask, isEditOpen: false });
    }
  };

  onClickEditButton = () => {
    this.setState({ isEditOpen: true });
  };

  onCancelUpdateTask = () => {
    this.setState({ isEditOpen: false });
  };

  onDeleteTask = async () => {
    const { deleteTask } = this.props;
    const { taskDetails } = this.state;
    const { id } = taskDetails;

    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${hardCodedValues.companyId}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${hardCodedValues.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (response.ok) {
      deleteTask(id);
    }
  };

  getFormatedDate = (date) => {
    const [year, month, day] = date.split("-");
    return [year, month, day];
  };

  getFormatedTime = (time) => {
    const timeInMinutes = time / 60;

    const hours = Math.floor(timeInMinutes / 60);
    const min = timeInMinutes - hours * 60;

    return [hours, min];
  };

  getTaskTimeInSeconds = (taskTime) => {
    let [h, m] = taskTime.split(":");
    [h, m] = [parseInt(h), parseInt(m)];

    return h * 60 * 60 + m * 60;
  };

  checkIsFeatureDate = () => {
    const { taskDetails } = this.state;
    const { taskDate, taskTime } = taskDetails;
    const [year, month, day] = this.getFormatedDate(taskDate);
    const [hours, min] = this.getFormatedTime(taskTime);

    const taskDateObj = new Date(year, month - 1, day, hours, min, 0, 0);

    return isFuture(taskDateObj);
  };

  renderTaskCard = () => {
    const { taskDetails } = this.state;
    const { taskTime, taskDate, taskMsg } = taskDetails;
    const [year, month, day] = this.getFormatedDate(taskDate);
    const [hours, min] = this.getFormatedTime(taskTime);
    const isFeatureDate = this.checkIsFeatureDate();
    const taskDateClassName = isFeatureDate ? "feature-date" : "past-date";

    let formatedHours;
    let format12Hours;

    if (hours < 12) {
      formatedHours = hours;
      format12Hours = "am";
    } else {
      formatedHours = hours % 12;
      format12Hours = "pm";
    }

    return (
      <div className="task-card">
        <div className="task-left-card">
          <div className="task-circle"></div>
          <div className="task-information-card">
            <p className="task-msg">{taskMsg}</p>
            <p
              className={`task-date ${taskDateClassName}`}
            >{`${month}/${day}/${year} at ${formatedHours}:${min} ${format12Hours}`}</p>
          </div>
        </div>
        <div className="task-control-card">
          <button className="edit-button" onClick={this.onClickEditButton}>
            <BiSolidPencil className="edit-icon" />
          </button>
          {isFeatureDate && (
            <button className="edit-button">
              <BiSolidBellRing className="edit-icon" />
            </button>
          )}

          {isFeatureDate && (
            <button className="edit-button">
              <FaCheck className="edit-icon" />
            </button>
          )}
          {!isFeatureDate && (
            <button className="edit-button">
              <TbLayoutBottombar className="edit-icon" />
            </button>
          )}
        </div>
      </div>
    );
  };

  render() {
    const { isEditOpen, taskDetails } = this.state;
    const { taskDate, taskTime } = taskDetails;
    const [year, month, day] = this.getFormatedDate(taskDate);
    const [hours, min] = this.getFormatedTime(taskTime);

    const taskDateObj = new Date(year, month - 1, day, hours, min, 0, 0);

    return (
      <>
        {isEditOpen && (
          <ModifyTask
            taskDetails={taskDetails}
            taskDateObj={taskDateObj}
            onCancelUpdateTask={this.onCancelUpdateTask}
            updateTask={this.updateTask}
            onDeleteTask={this.onDeleteTask}
          />
        )}
        {!isEditOpen && this.renderTaskCard()}
      </>
    );
  }
}

export default Task;
