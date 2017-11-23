import React from 'react';

import BaseForm from '../BaseForm';
import TextInput from '../TextInput';

class ContatoForm extends BaseForm {

  constructor(props) {
    super(props);
    this.state = {
      contato: {}
    }
  }

  onChangeState(state, value) {
    const currentState = Object.assign({}, this.state);
    currentState.contato[state] = value;
    this.setState(currentState);
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-5 col-sm-12 col-xs-12'>
          <TextInput
            type="text"
            label="Nome"
            state="nome"
            ref="nome"
            required={ true }
            value={this.state.contato.nome}
            onChangeState={this.onChangeState.bind(this)}
          />
        </div>
        <div className='col-md-2 col-sm-12 col-xs-12'>
          <TextInput
            type="text"
            label="Telefone"
            state="telefone"
            ref="telefone"
            required={ true }
            value={this.state.contato.telefone}
            onChangeState={this.onChangeState.bind(this)}
          />
        </div>
        <div className='col-md-5 col-sm-12 col-xs-12'>
          <TextInput
            type="text"
            label="E-mail"
            state="email"
            ref="email"
            required={ true }
            value={this.state.contato.email}
            onChangeState={this.onChangeState.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default ContatoForm;