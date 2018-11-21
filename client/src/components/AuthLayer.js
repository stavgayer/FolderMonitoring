import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function AuthLayer(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      fetch('/api/users/current')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error();
            throw error;
          }
        })
        .catch(err => {
          this.setState({ loading: false, redirect: true });
        });
    }


    render() {
      const { loading, redirect } = this.state;
      let view = <h1>Loading...</h1>
      if (!loading) { 
        if (redirect) {
          view = <Redirect to="/login" />
        } else {
          view = <ComponentToProtect {...this.props} />
        }
      }
      return (
        <React.Fragment>
          { view }
        </React.Fragment>
      );
    }
  }
}