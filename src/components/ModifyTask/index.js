import { Component } from "react";
import { MdDelete } from "react-icons/md";

import TimePicker from "../TimePicker";
import DatePick from "../DatePick";
import AssignedUsersContext from "../../context/AssignedUsersContext";
import DropDown from "../DropDown";
import "./index.css";

class ModifyTask extends Component {
  state = {
    id: this.props.taskDetails.id,
    taskDescription: this.props.taskDetails.taskMsg,
    dateObj: this.props.taskDateObj,
    userId: this.props.taskDetails.assignedUser,
  };

  onClickCancelButton = () => {
    const { onCancelUpdateTask } = this.props;

    onCancelUpdateTask();
  };

  onChangeAssignUser = (userId) => {
    this.setState({ userId });
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
    const { taskDescription, userId, dateObj } = this.state;
    const { updateTask } = this.props;

    updateTask(taskDescription, userId, dateObj);
  };

  render() {
    const { id, taskDescription, userId, dateObj } = this.state;

    return (
      <AssignedUsersContext.Consumer>
        {(value) => {
          const { assignedUsers } = value;
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
                  <DatePick
                    id={`dateField${id}`}
                    onChangeDate={this.onChangeDate}
                    dateObj={dateObj}
                  />
                </div>
                <div className="input-card">
                  <label htmlFor={`timeField${id}`} className="input-label">
                    Time
                  </label>
                  <TimePicker
                    id={`timeField${id}`}
                    dateObj={dateObj}
                    updateTime={this.updateTime}
                  />
                </div>
              </div>

              <div className="input-card">
                <label htmlFor={`assignUser${id}`} className="input-label">
                  Assign User
                </label>
                {false && (
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
                )}
                {assignedUsers.length !== 0 && (
                  <DropDown
                    userId={userId}
                    assignedUsers={assignedUsers}
                    onChangeAssignUser={this.onChangeAssignUser}
                  />
                )}
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
        }}
      </AssignedUsersContext.Consumer>
    );
  }
}

export default ModifyTask;
