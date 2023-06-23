import { Component } from "react";
import { BiPlus } from "react-icons/bi";

import CreateTask from "../CreateTask";

import "./index.css";

class Tasks extends Component {
  state = {
    isAddTask: false,
  };

  onAddTask = () => {
    this.setState({ isAddTask: true });
  };

  onCancelAddTask = () => {
    this.setState({ isAddTask: false });
  };

  render() {
    const { isAddTask } = this.state;
    return (
      <div className="tasks-bg-container">
        <div className="tasks-main-bar">
          <div className="tasks-number-card">
            <h1 className="tasks-heading">TASKS</h1>
            <p className="tasks-count">0</p>
          </div>
          <div className="add-task-icon-card">
            <button className="add-task-button" onClick={this.onAddTask}>
              <BiPlus className="plus-icon" />
            </button>
          </div>
        </div>
        {isAddTask && <CreateTask onCancelAddTask={this.onCancelAddTask} />}
      </div>
    );
  }
}

export default Tasks;
