import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class Loading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    PubSub.subscribe('show-loading', (topic, show) => this.setState({ show: show }));
  }

  componentWillUnmount() {
    PubSub.unsubscribe('show-loading');
  }

  render() {
    return (
      <div className={this.state.show ? '' : 'invisible'}>
        <div className='background-loading'>
          <div className='image-loading'>
            <img src='/img/loading.svg' />
          </div>
        </div>
      </div>
    );
  }

}

export default Loading;