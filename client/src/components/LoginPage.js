import React, { Component } from "react";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      error: null
    };
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    this.setState({ loading: true });
    fetch(`/api/users/login`, {
      method: "POST",
      body: JSON.stringify({ user }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
          console.log(result)
        if (result.errors) {
          throw new Error(Object.values(result.errors)[0]);
        } else {
          this.props.history.push("/");
        }
      })
      .catch(error => this.setState({ error, loading: false }));
  };
  render() {
    const { error, username, password } = this.state;
    return (
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <p className="card-text text-center">Username : admin, Password : admin</p>
              {error && (
                <h5 className="text-center text-danger display-5">
                  {error.message}
                </h5>
              )}
              <form className="form-signin" onSubmit={this.handleSubmit}>
                <div className="form-label-group">
                  <input
                    id="inputUsername"
                    className="form-control"
                    type="text"
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={this.onChangeInput}
                    required
                    autoFocus
                  />
                  <label htmlFor="inputUsername">Username</label>
                </div>

                <div className="form-label-group">
                  <input
                    id="inputPassword"
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangeInput}
                    required
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>

                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/*<div className="row">
        {error && <div>{error.message}</div>}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={this.onChangeInput}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={this.onChangeInput}
          />
          <button type="submit">Login</button>
        </form>
      </div> */
