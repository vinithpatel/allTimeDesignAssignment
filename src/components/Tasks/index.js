import { Component } from "react";
import { BiPlus } from "react-icons/bi";

import CreateTask from "../CreateTask";
import Task from "../Task";

import "./index.css";

const hardCodedValues = {
  companyId: "company_0f8d040401d14916bc2430480d7aa0f8",
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODc1NDY3ODgsIm5iZiI6MTY4NzU0Njc4OCwianRpIjoiMDBiMTg4YzUtNmRlNC00NTg4LWJjYjMtMzJiNWM4MDA4ODYyIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.OpprNi0ekJlCqPwHj3MhpP7Ar_Xw8JaX2nebKt9qjWc",
};

class Tasks extends Component {
  state = {
    isAddTask: false,
    tasksList: [],
  };

  componentDidMount() {
    this.getTasksData();
  }

  getCamelCaseData = (results) =>
    results.map((each) => ({
      id: each.id,
      taskDate: each.task_date,
      taskTime: each.task_time,
      taskMsg: each.task_msg,
      isCompleted: each.is_completed,
      assignedUser: each.assigned_user,
    }));

  getTasksData = async () => {
    const url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${hardCodedValues.companyId}`;

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

      const camelCaseData = this.getCamelCaseData(results);

      this.setState({ tasksList: camelCaseData });
    } catch (error) {
      console.log(error);
    }
  };

  onAddTask = () => {
    this.setState({ isAddTask: true });
  };

  onCancelAddTask = () => {
    this.setState({ isAddTask: false });
  };

  updateCreatedTask = (results) => {
    const newTask = {
      id: results.id,
      taskDate: results.task_date,
      taskTime: results.task_time,
      taskMsg: results.task_msg,
      isCompleted: results.is_completed,
      assignedUser: results.assigned_user,
    };

    this.setState((prevState) => {
      const { tasksList } = prevState;

      const updatedList = [...tasksList, newTask];

      return {
        isAddTask: false,
        tasksList: updatedList,
      };
    });
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasksList: prevState.tasksList.filter((each) => each.id !== id),
    }));
  };

  renderTasks = () => {
    const { tasksList } = this.state;

    return (
      <ul className="tasks-list">
        {tasksList.map((each) => (
          <Task key={each.id} taskDetails={each} deleteTask={this.deleteTask} />
        ))}
      </ul>
    );
  };

  render() {
    const { isAddTask, tasksList } = this.state;
    return (
      <div className="tasks-bg-container">
        <div className="tasks-main-bar">
          <div className="tasks-number-card">
            <h1 className="tasks-heading">TASKS</h1>
            <p className="tasks-count">{tasksList.length}</p>
          </div>
          <div className="add-task-icon-card">
            <button className="add-task-button" onClick={this.onAddTask}>
              <BiPlus className="plus-icon" />
            </button>
          </div>
        </div>
        {isAddTask && (
          <CreateTask
            onCancelAddTask={this.onCancelAddTask}
            updateCreatedTask={this.updateCreatedTask}
          />
        )}
        {this.renderTasks()}
      </div>
    );
  }
}

export default Tasks;
