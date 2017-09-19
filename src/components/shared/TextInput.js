import React from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput';

class TextInput extends BaseInput {

  render() {
    return (
      <div className='form-group'>
        {
          (this.props.label) ? <label>{ this.props.label }</label> : ''
        }
        <input
          type={ this.props.type }
          placeholder={ (this.props.placeholder) ? this.props.placeholder : '' }
          value={ this.props.value }
          className= { `${this.props.className ? this.props.className : 'form-control'} ${this.state.classInput}` }
          disabled= { this.props.disabled }
          readOnly= { this.props.readOnly }
          onChange= { this.onChange.bind(this, this.props.state) }
          ref={(input) => {this.textInput = input;}}
        />
        {
          (this.state.classInput ? <span className='input-message-required'>{this.state.message}</span> : <span/>)
        }
      </div>
    );
  }
}

export default TextInput;