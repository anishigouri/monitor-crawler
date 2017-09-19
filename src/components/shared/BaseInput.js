import { Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

class BaseInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      classInput: '',
      message: '',
      label: '',
      state: '',
      required: false
    };
  }

  componentDidMount() {

    PubSub.subscribe('error-validation', (topic, error) => {
      if(error.field === this.props.state) {
        this.setState({ classInput: 'input-required', message: error.message });
      }
    });

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  componentWillUnmount() {
    PubSub.unsubscribe('error-validation');
  }

  onChange(state, event) {
    event.preventDefault();
    if(this.props.onChangeState) {
      this.props.onChangeState(state, this.textInput.value);
      this.setState({ classInput: '', isValid: true, message: '' });
    }
  }

  isRequired() {
    this.setState({ classInput: 'input-required', message: 'Required' });
  }

  isInvalid() {
    if(!this.state.classInput) {
      this.setState({ classInput: 'input-required', message: 'Invalid' });
    }
  }
}

BaseInput.propTypes = {
  value: PropTypes.string,
  onChangeState: PropTypes.func,
  focus: PropTypes.bool,
  required: PropTypes.bool,
  properties: PropTypes.object,
  state: PropTypes.string
};

export default BaseInput;