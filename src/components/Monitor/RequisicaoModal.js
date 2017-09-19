import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import TextInput from '../shared/TextInput';
import RequisicaoActions from '../../actions/RequisicaoActions';

class RequisicaoModal extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      requisicao: {}
    };
  }

  onSave(e) {
    e.preventDefault();
    RequisicaoActions.salvarRequisicao(this.state.requisicao);
    this.props.onShowModal();
  }

  onChangeState(state, value) {
    let currentState = Object.assign({}, this.state);
    currentState.requisicao[state] = value;
    this.setState(currentState);
  }

  

  render() {
    return (
      <Modal isOpen={this.props.showModal}>
        <ModalHeader>Nova Requisição</ModalHeader>
        <ModalBody>
          <TextInput
            type='text'
            value={this.state.requisicao.name}
            onChangeState={this.onChangeState.bind(this)}
            state='numero'
            label='Número'
            ref='numero'
          />
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-success' onClick={this.onSave.bind(this)}>Salvar</button>
          <button className='btn' onClick={this.props.onShowModal}>Cancelar</button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default RequisicaoModal;