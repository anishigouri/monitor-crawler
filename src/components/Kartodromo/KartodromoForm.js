import React from 'react';
import { Link } from 'react-router-dom';

import TextInput from '../shared/TextInput';
import BaseForm from '../shared/BaseForm';
import ContatoForm from '../shared/Contato/ContatoForm';
import EnderecoForm from '../shared/Endereco/EnderecoForm';
import Image from '../shared/ImageCrop/Image';
import KartodromoStore from '../../stores/KartodromoStore';
import KartodromoActions from '../../actions/KartodromoActions';

class KartodromoForm extends BaseForm {

  constructor(props) {
    super(props);
    this.state = {
      kartodromo: {}
    }
    this.onStoreUpdate = this.onStoreUpdate.bind(this);
  }

  componentDidMount() {
    KartodromoStore.listen(this.onStoreUpdate);
    const id = this.props.match.params.id;
    if(id != 0) {
      KartodromoActions.fetchKartodromoById(id);
    }
  }

  componentWillUnmount() {
    KartodromoStore.unlisten(this.onStoreUpdate);
  }

  onStoreUpdate(data) {

    console.log('aaa', data);
    
    if(data.action === 'actionFetchKartodromoById' && data.kartodromo) {
      this.state.kartodromo = data.kartodromo;
      this.setState(this.state);
    }
  }

  onChangeState(state, value) {
    const currentState = Object.assign({}, this.state);
    currentState.kartodromo[state] = value;
    this.setState(currentState);
  }

  onSave(event) {
    event.preventDefault();

    if(super.validateFields() & this.refs.contato.isValid() & this.refs.endereco.isValid()) {
      this.state.kartodromo.contato = this.refs.contato.getValue();
      this.state.kartodromo.endereco = this.refs.endereco.getValue();
      
      console.log('Kartodromo', this.state.kartodromo);
    }
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
          <div className="col-md-12 col-sm-12 col-xs-12 text-center">
            <Image
              title="Foto"
              width={500}
              height={250}
              maxSize={1024}
              state="foto"
              onChangeState={this.onChangeState.bind(this)}
              ref="foto"
            />
          </div>
          <div className='col-md-6 col-sm-12 col-xs-12'>
            <TextInput
              type='text'
              label='Nome'
              state='nome'
              ref='nome'
              required={ true }
              value={this.state.kartodromo.nome}
              onChangeState={this.onChangeState.bind(this)}
            />
          </div>
          <div className='col-md-6 col-sm-12 col-xs-12'>
            <TextInput
              type='text'
              label='Site'
              state='site'
              ref='site'
              required={ true }
              value={this.state.kartodromo.site}
              onChangeState={this.onChangeState.bind(this)}
            />
          </div>
        </div>
        
        <ContatoForm ref='contato'/>

        <EnderecoForm ref='endereco'/>
        
        <div>
          <hr />
          <Link className='btn btn-secondary float-left' to='/kartodromos'>
            Voltar
          </Link>
          <button
            className='btn btn-success float-right'
            onClick={this.onSave.bind(this)}>
              Salvar
          </button>
        </div>
      </div>
    )
  }
}

export default KartodromoForm;