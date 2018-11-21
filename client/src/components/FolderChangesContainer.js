import React, { Component } from "react";
import FolderInput from "./FolderInput";
import LogsList from "./LogsList";
export default class FolderChangesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderPath: "",
      monitoring: false,
      error: null
    };
  }
  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleError = error => {
    this.setState({ monitoring: false, error });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    let path = this.state.folderPath.split("\\").join("\\\\");
    fetch("/api/logs/start", {
      method: "POST",
      body: JSON.stringify({
        folder: path
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Invalid Route");
        } else {
          this.setState({ monitoring: true });
        }
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  stopWatchingFetch = () => {
    fetch("api/logs/stop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Invalid Route");
        } else {
          this.setState({ monitoring: false });
        }
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  stopWatching = () => {
    setTimeout(this.stopWatchingFetch(), 1000);
  };
  handleLogout = () => {
    fetch("api/users/logout")
      .then(res => {
        if (res.ok) {
          this.props.history.push("/login");
        } else {
          throw new Error("Logout Failed");
        }
      })
      .catch(error => this.setState({ error }));
  };
  render() {
    return (
      <div>
        <FolderInput
          folderPath={this.state.folderPath}
          onChangeInput={this.onChangeInput}
          handleSubmit={this.handleSubmit}
          stopWatching={this.stopWatching}
          error={this.state.error}
          handleLogout={this.handleLogout}
        />
        {this.state.monitoring && <LogsList handleError={this.handleError} />}
      </div>
    );
  }
} 
