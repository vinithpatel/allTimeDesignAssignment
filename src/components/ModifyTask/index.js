import { Component } from "react";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TimePicker from "../TimePicker";
import "./index.css";

const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODc1NDY3ODgsIm5iZiI6MTY4NzU0Njc4OCwianRpIjoiMDBiMTg4YzUtNmRlNC00NTg4LWJjYjMtMzJiNWM4MDA4ODYyIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.OpprNi0ekJlCqPwHj3MhpP7Ar_Xw8JaX2nebKt9qjWc";

class ModifyTask extends Component {
  state = {
    id: this.props.taskDetails.id,
    taskDescription: this.props.taskDetails.taskMsg,
    dateObj: this.props.taskDateObj,
    assignedUsers: [],
    userId: "user_8c2ff2128e70493fa4cedd2cab97c492",
  };

  componentDidMount() {
    this.getAssignedUserData();
  }

  getAssignedUserData = async () => {
    const url =
      "https://stage.api.sloovi.com/team?product=outreach&company_id=company_0f8d040401d14916bc2430480d7aa0f8";

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const { results } = await response.json();
      const { data } = results;

      this.setState({ assignedUsers: data });
    } catch (error) {
      console.log(error);
    }
  };

  onClickCancelButton = () => {
    const { onCancelUpdateTask } = this.props;

    onCancelUpdateTask();
  };

  onChangeAssignUser = (event) => {
    this.setState({ userId: event.target.value });
  };

  onChangeDesc = (event) => {
    this.setState({ taskDescription: event.target.value });
  };

  onChangeDate = (date) => {
    this.setState({ dateObj: date });
  };

  updateTime = (dateObj) => {
    this.setState({ dateObj });
  };

  onClickDelete = async () => {
    const isConfirm = window.confirm("Are you sure want to delete this Task?");
    if (isConfirm) {
      const { onDeleteTask } = this.props;
      onDeleteTask();
    }
  };

  onClickSaveButton = async () => {
    const { id, taskDescription, userId, dateObj } = this.state;
    const { updateTask } = this.props;
    /*   
    const taskData = {
      assigned_user: userId,
      task_date: taskDate,
      task_time: taskTime,
      is_completed: 0,
      time_zone: 19800,
      task_msg: taskDescription,
    };

    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=company_0f8d040401d14916bc2430480d7aa0f8`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      
    }
    */
    updateTask(taskDescription, userId, dateObj);
  };

  render() {
    const {
      id,
      taskDescription,
      assignedUsers,
      userId,
      taskDate,
      dateObj,
    } = this.state;

    return (
      <div className="create-task-card">
        <div className="input-card">
          <label htmlFor={`taskDescription${id}`} className="input-label">
            Task Description
          </label>
          <input
            id={`taskDescription${id}`}
            className="desc-input"
            type="text"
            value={taskDescription}
            onChange={this.onChangeDesc}
          />
        </div>
        <div className="date-time-card">
          <div className="input-card">
            <label htmlFor={`dateField${id}`} className="input-label">
              Date
            </label>
            <DatePicker
              showIcon
              id={`dateField${id}`}
              className="date-input"
              onChange={this.onChangeDate}
              selected={dateObj}
            />
          </div>
          <div className="input-card">
            <label htmlFor={`timeField${id}`} className="input-label">
              Time
            </label>
            <TimePicker dateObj={dateObj} updateTime={this.updateTime} />
          </div>
        </div>
        <div className="input-card">
          <label htmlFor={`assignUser${id}`} className="input-label">
            Assign User
          </label>
          <select
            id={`assignUser${id}`}
            className="desc-input"
            value={userId}
            onChange={this.onChangeAssignUser}
          >
            {assignedUsers.map((each) => (
              <option key={each.id} value={each.user_id}>
                {each.name}
              </option>
            ))}
          </select>
        </div>

        <div className="modify-task-buttons-card">
          <div>
            <button className="edit-button" onClick={this.onClickDelete}>
              <MdDelete className="delete-icon" />
            </button>
          </div>
          <div>
            <button
              type="button"
              className="cancel-button"
              onClick={this.onClickCancelButton}
            >
              Cancel
            </button>
            <button
              type="button"
              className="save-button"
              onClick={this.onClickSaveButton}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModifyTask;
