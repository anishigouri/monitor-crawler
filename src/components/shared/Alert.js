import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import PubSub from 'pubsub-js';

class Alert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAlert: false
    };
  }

  componentDidMount() {

    this._notificationSystem = this.refs.notificationSystem;

    PubSub.subscribe('alert', (topic, value) => {
      console.log('chamou o alert');
      if(value.message) {
        this._notificationSystem.addNotification({
          message: value.message,
          level: value.type,
          title: value.title,
          position: value.position
        });
      }
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe('alert');
  }

  render() {

    return (
      <div>
        <NotificationSystem ref='notificationSystem' />
      </div>
    );
  }
}

export default Alert;