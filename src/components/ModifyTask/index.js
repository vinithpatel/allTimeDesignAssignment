import { Component } from "react";
import { format } from "date-fns";

import "./index.css";

const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODc1NDY3ODgsIm5iZiI6MTY4NzU0Njc4OCwianRpIjoiMDBiMTg4YzUtNmRlNC00NTg4LWJjYjMtMzJiNWM4MDA4ODYyIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.OpprNi0ekJlCqPwHj3MhpP7Ar_Xw8JaX2nebKt9qjWc";

class ModifyTask extends Component {
  state = {
    id: this.props.taskDetails.id,
    taskDescription: this.props.taskDetails.taskMsg,
    taskDate: this.props.taskDetails.taskDate,
    taskTime: this.props.taskDetails.taskTime,
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

  onChangeDate = (event) => {
    this.setState({ taskDate: event.target.value });
  };

  onChangeTime = (event) => {
    let [h, m] = event.target.value.split(":");

    [h, m] = [parseInt(h), parseInt(m)];

    const formatedTime = h * 60 * 60 + m * 60;
    this.setState({ taskTime: formatedTime });
  };

  onClickSaveButton = async () => {
    const { id, taskDescription, userId, taskDate, taskTime } = this.state;
    const { updateTask } = this.props;

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
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      updateTask();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      taskDescription,
      assignedUsers,
      userId,
      taskDate,
      taskTime,
    } = this.state;

    return (
      <div className="create-task-card">
        <div className="input-card">
          <label className="input-label">Task Description</label>
          <input
            className="desc-input"
            type="text"
            value={taskDescription}
            onChange={this.onChangeDesc}
          />
        </div>
        <div className="date-time-card">
          <div className="input-card">
            <label className="input-label">Date</label>
            <input
              className="date-input"
              type="date"
              onChange={this.onChangeDate}
              value={taskDate}
            />
          </div>
          <div className="input-card">
            <label className="input-label">Time</label>
            <input
              className="date-input"
              type="time"
              onChange={this.onChangeTime}
            />
          </div>
        </div>
        <div className="input-card">
          <label className="input-label">Assign User</label>
          <select
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

        <div className="buttons-card">
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
    );
  }
}

export default ModifyTask;
