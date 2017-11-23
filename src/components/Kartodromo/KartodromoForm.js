import React from 'react';
import { Link } from 'react-router-dom';

import TextInput from '../shared/TextInput';
import BaseForm from '../shared/BaseForm';
import ContatoForm from '../shared/Contato/ContatoForm';

class KartodromoForm extends BaseForm {

  constructor(props) {
    super(props);
    this.state = {
      kartodromo: {}
    }
  }

  onChangeState(state, value) {
    const currentState = Object.assign({}, this.state);
    currentState.kartodromo[state] = value;
    this.setState(currentState);
  }

  onSave(event) {
    event.preventDefault();
    console.log('this.state', this.state);

    super.validateFields();
  }

  render() {
    return (
      <div >
        <div className='my-5'>
          <h2>
            Formulário - Kartódromo
          </h2>
          <hr />
        </div>
        <div className='row'>
          <div className='col-md-6 col-sm-12 col-xs-12'>
            <TextInput
              type="text"
              label="Nome"
              state="nome"
              ref="nome"
              required={ true }
              value={this.state.kartodromo.nome}
              onChangeState={this.onChangeState.bind(this)}
            />
          </div>
          <div className='col-md-6 col-sm-12 col-xs-12'>
            <TextInput
              type="text"
              label="Site"
              state="site"
              ref="site"
              required={ true }
              value={this.state.kartodromo.site}
              onChangeState={this.onChangeState.bind(this)}
            />
          </div>
        </div>
        
        <ContatoForm />
        
        <div>
          <hr />
          <Link className="btn btn-secondary float-left" to='/kartodromos'>
            Voltar
          </Link>
          <button
            className="btn btn-success float-right"
            onClick={this.onSave.bind(this)}>
              Salvar
          </button>
        </div>
      </div>
    )
  }
}

export default KartodromoForm;