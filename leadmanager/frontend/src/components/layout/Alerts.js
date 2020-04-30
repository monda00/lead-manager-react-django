import React, { Component } from 'react';
import { withAlert } from 'react-alert';

export class Alerts extends Component {
  componentDidMount() {
    this.props.alert.show('It Works');
  }

  render() {
    return <></>;
  }
}

export default withAlert()(Alerts);
