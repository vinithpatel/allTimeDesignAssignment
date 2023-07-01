import { Component } from "react";
import { BiSearch, BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import "./index.css";

const users = [{ name: "vinith" }, { name: "rahul" }];

class DropDown extends Component {
  state = {
    isDropDownOpen: false,
  };

  onToggleDropDown = () => {
    this.setState((prevState) => ({
      isDropDownOpen: !prevState.isDropDownOpen,
    }));
  };

  renderOptions = () => {
    const options = [
      { name: "vinith" },
      { name: "Sharvan C" },
      { name: "Arun Karthik" },
      { name: "raju" },
    ];

    return (
      <ul className="drop-down-options-card">
        {options.map((each) => (
          <li key={each.name} className="drop-down-option">
            {each.name}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { isDropDownOpen } = this.state;
    const searchInputClassName = isDropDownOpen
      ? "overlay-input"
      : "hide-search-input";

    return (
      <div className="drop-down-bg-container">
        <div className="drop-down-container">
          <input
            type="search"
            className="drop-down-search-input"
            placeholder="Search"
            onClick={this.onToggleDropDown}
            readOnly={!isDropDownOpen}
            onBlur={this.onToggleDropDown}
          />
          {isDropDownOpen && (
            <button className="drop-down-search-button">
              <BiSearch className="dropdown-icons" />
            </button>
          )}

          {!isDropDownOpen && (
            <button className="arrow-button" onClick={this.onToggleDropDown}>
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
