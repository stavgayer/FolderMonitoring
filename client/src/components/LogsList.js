import React, { Component } from "react";

export default class LogsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: null
    };
  }
  fetchLogs = () => {
    fetch(`/api/logs/get`)
      .then(res => res.json())
      .then(logs => {
        if (logs !== this.state.logs) {
          this.setState({ logs });
        }
      })
      .catch(err => this.props.handleError(err));
  };
  componentDidMount = () => {
    this.interval = setInterval(() => this.fetchLogs(), 1000);
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { logs } = this.state;
    return (
      <div>
        {logs &&
          logs.map((log, i) => {
            return (
              <div key={i} className="alert alert-info" role="alert">
                {log.log}
              </div>
            );
          })}
      </div>
    );
  }
}
