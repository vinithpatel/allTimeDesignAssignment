import { Component } from "react";

import Tasks from "./components/Tasks";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.getAccessToken();
  }

  getAccessToken = async () => {
    const userCredientials = {
      email: "smithwills1989@gmail.com",
      password: "12345678",
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredientials),
    };
    try {
      const response = await fetch(
        "https://stage.api.sloovi.com/login?product=outreach",
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODc1MzgxMDUsIm5iZiI6MTY4NzUzODEwNSwianRpIjoiMWFlODc4NjQtODdjZi00NDBmLTllOGMtOGMxN2E5MjI3NmNlIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.01iwqBzHYKhP-StsAXuzIjM5jI2yXsBML1b7GIaLCkE";

    try {
      const response = await fetch(
        "https://stage.api.sloovi.com/team?product=outreach&company_id=company_0f8d040401d14916bc2430480d7aa0f8",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="app-bg-container">
        <div className="side-bar"></div>
        <div className="right-bg-container">
          <nav className="nav-bar"></nav>
          <div className="content-bg-container">
            <h1 className="test-heading">Test</h1>
            <a className="website-link">Sloovi.com</a>
            <p className="add-description-para">Add description,</p>
            <Tasks />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
