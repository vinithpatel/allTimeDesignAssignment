import { Component } from "react";
import {
  BiSearch,
  BiSolidUpArrow,
  BiSolidDownArrow,
  BiCheck,
} from "react-icons/bi";

import AssignedUsersContext from "../../context/AssignedUsersContext";
import "./index.css";

const users = [{ name: "vinith" }, { name: "rahul" }];

class DropDown extends Component {
  state = {
    isDropDownOpen: false,
    assignedUsers: this.props.assignedUsers,
    userId: this.props.userId,
    searchInput: "",
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = () => {
    this.setState((prevState) => {
      const { userId, assignedUsers } = prevState;

      const userObj = assignedUsers.find((each) => each.user_id === userId);

      return { searchInput: userObj.name };
    });
  };

  onOpenDropDown = () => {
    this.setState({ isDropDownOpen: true, searchInput: "" });
  };

  onCloseDropDown = () => {
    this.setState({ isDropDownOpen: false }, this.getUserName);
  };

  onChangeSearch = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  renderOption = (each) => {
    const { userId } = this.state;
    const { onChangeAssignUser } = this.props;

    const onClickOption = () => {
      onChangeAssignUser(each.user_id);
      this.setState({ userId: each.user_id }, this.onCloseDropDown);
    };

    return (
      <li
        key={each.id}
        value={each.user_id}
        className="drop-down-option"
        onClick={onClickOption}
      >
        <div className="drop-down-option-checkbox-card">
          {each.user_id === userId && <BiCheck className="check-icon" />}
        </div>
        <button className="drop-down-option-button">{each.name}</button>
      </li>
    );
  };

  renderOptions = () => {
    const { userId, assignedUsers } = this.state;
    return (
      <ul className="drop-down-options-card">
        {assignedUsers.map((each) => this.renderOption(each))}
      </ul>
    );
  };

  render() {
    const { userId, isDropDownOpen, searchInput } = this.state;

    return (
      <div className="drop-down-bg-container ">
        <div className="drop-down-container">
          <input
            type="search"
            className="drop-down-search-input"
            placeholder="Search"
            value={searchInput}
            onClick={this.onOpenDropDown}
            readOnly={!isDropDownOpen}
            onChange={this.onChangeSearch}
          />

          {isDropDownOpen && (
            <button className="drop-down-search-button">
              <BiSearch className="dropdown-icons" />
            </button>
          )}

          {!isDropDownOpen && (
            <button className="arrow-button" onClick={this.onOpenDropDown}>
              <BiSolidUpArrow className="arrow-icon" />
              <BiSolidDownArrow className="arrow-icon" />
            </button>
          )}
        </div>
        {isDropDownOpen && this.renderOptions()}
      </div>
    );
  }
}

export default DropDown;
