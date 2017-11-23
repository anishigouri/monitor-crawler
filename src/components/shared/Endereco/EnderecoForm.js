import React from 'react';

import BaseForm from '../BaseForm';
import TextInput from '../TextInput';

class EnderecoForm extends BaseForm {

  constructor(props) {
    super(props);
    this.state = {
      endereco: {}
    }
  }

  onChangeState(state, value) {
    const currentState = Object.assign({}, this.state);
    currentState.endereco[state] = value;
    this.setState(currentState);
  }

  isValid() {
    return super.validateFields();
  }

  getValue() {
    return this.state.endereco;
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-12 col-sm-12 col-xs-12'>
            <h5>Endereço</h5>
            <hr />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-2 col-sm-12 col-xs-12'>
            <TextInput
              type="text"
              label="CEP"
              state="cep"
              ref="cep"
              required={ true }
              value={this.state.endereco.cep}
              onChangeState={this.onChangeState.bind(this)}
            />
          </div>
          <div className='col-md-8 col-sm-12 col-xs-12'>
            <TextInput
              type="text"
              label="Rua"
              state="rua"
              ref="rua"
              required={ true }
              value={this.state.endereco.rua}
              onChangeState={this.onChangeState.bind(this)}
            />
          </div>
          <div className='col-md-2 col-sm-12 col-xs-12'>
            <TextInput
              type="text"
              label="Número"
              state="numero"
              ref="numero"
              value={this.state.endereco.numero}
              onChangeState={this.onChangeState.bind(this)}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-2 col-sm-12 col-xs-12'>
            <TextInput
              type="text"
              label="Estado"
              state="estado"
              ref="estado"
              required={ true }
              value={this.state.endereco.estado}
              onChangeState={this.onChangeState.bind(this)}
            />
          </div>
          <div className='col-md-8 col-sm-12 col-xs-12'>
            <TextInput
              type="text"
              label="Município"
              state="municipio"
              ref="municipio"
              required={ true }
              value={this.state.endereco.municipio}
              onChangeState={this.onChangeState.bind(this)}
            />
          </div>
          <div className='col-md-2 col-sm-12 col-xs-12'>
            <TextInput
              type="text"
              label="Bairro"
              state="bairro"
              ref="bairro"
              required={ true }
              value={this.state.endereco.bairro}
              onChangeState={this.onChangeState.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
  
}

export default EnderecoForm;