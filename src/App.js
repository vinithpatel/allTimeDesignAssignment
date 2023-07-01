import { Component } from "react";

import Tasks from "./components/Tasks";
import AssignedUsersContext from "./context/AssignedUsersContext";
import "./App.css";

const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODc1NDY3ODgsIm5iZiI6MTY4NzU0Njc4OCwianRpIjoiMDBiMTg4YzUtNmRlNC00NTg4LWJjYjMtMzJiNWM4MDA4ODYyIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.OpprNi0ekJlCqPwHj3MhpP7Ar_Xw8JaX2nebKt9qjWc";

class App extends Component {
  state = {
    assignedUsers: [],
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

    const response = await fetch(url, options);

    if (response.ok) {
      const { results } = await response.json();
      const { data } = results;

      this.setState({ assignedUsers: data });
    }
  };

  render() {
    const { assignedUsers } = this.state;
    return (
      <AssignedUsersContext.Provider value={{ assignedUsers }}>
        <div className="app-bg-container">
          <div className="side-bar"></div>
          <div className="right-bg-container">
            <nav className="nav-bar"></nav>
            <div className="content-bg-container">
              <h1 className="test-heading">Test</h1>
              <a href="https://sloovi.com" className="website-link">
                Sloovi.com
              </a>
              <p className="add-description-para">Add description,</p>
              <Tasks />
            </div>
          </div>
        </div>
      </AssignedUsersContext.Provider>
    );
  }
}

export default App;
