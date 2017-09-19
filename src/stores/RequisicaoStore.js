import alt from '../alt';
import RequisicaoActions from '../actions/RequisicaoActions';

class RequisicaoStore {
  
  constructor() {
    this.requisicao = {};

    this.bindListeners({
      handleUpdateRequisicao: RequisicaoActions.UPDATE_REQUISICAO
    })

  }

  handleUpdateRequisicao(requisicao) {
    this.requisicao = requisicao
  }

}

export default alt.createStore(RequisicaoStore, 'RequisicaoStore');