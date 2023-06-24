import { Component } from "react";
import { FaCheck } from "react-icons/fa";
import { BiSolidPencil, BiSolidBellRing, BiCheck } from "react-icons/bi";

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

  getCamelCaseData = (result) => ({
    id: result.id,
    taskDate: result.task_date,
    taskTime: result.task_time,
    taskMsg: result.task_msg,
    isCompleted: result.is_completed,
  });

  updateTask = async () => {
    const { taskDetails } = this.state;
    const { id } = taskDetails;

    this.setState({ isEditOpen: false });

    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${hardCodedValues.companyId}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${hardCodedValues.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const { results } = await response.json();

      this.setState({ taskDetails: this.getCamelCaseData(results) });
    } catch (error) {
      console.log(error);
    }
  };

  onClickEditButton = () => {
    this.setState({ isEditOpen: true });
  };

  onCancelUpdateTask = () => {
    this.setState({ isEditOpen: false });
  };

  renderTaskCard = () => {
    const { taskDetails } = this.state;
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
          <button className="edit-button" onClick={this.onClickEditButton}>
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

  render() {
    const { isEditOpen, taskDetails } = this.state;

    return (
      <>
        {isEditOpen && (
          <ModifyTask
            taskDetails={taskDetails}
            onCancelUpdateTask={this.onCancelUpdateTask}
            updateTask={this.updateTask}
          />
        )}
        {!isEditOpen && this.renderTaskCard()}
      </>
    );
  }
}

export default Task;
