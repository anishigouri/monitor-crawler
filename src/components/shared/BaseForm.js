import { Component } from 'react';
import _ from 'lodash';

class BaseForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schema: {}
    };
  }

  validateFields() {
    let isValid = true;

    _.forIn(this.refs, (obj, key) => {
      if(obj && obj.props.required && !obj.props.value) {
        this.refs[obj.props.state].isRequired();
        isValid = false;
      }
    });

    return isValid;
  }

}

export default BaseForm;
