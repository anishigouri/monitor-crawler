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
    console.log('validateFileds', this.refs);

    _.forIn(this.refs, (obj, key) => {
      if(obj && obj.props.required && !obj.props.value) {
        this.refs[obj.props.state].isRequired();
      }
    });
  }

}

export default BaseForm;
