import alt from '../alt';
import callApi from '../util/apiCaller';
import { showAlert } from '../util/message';

class RequisicaoActions {

  updateRequisicao(requisicao, action) {
    return { requisicao, action };
  }

  salvarRequisicao(requisicao) {
    
    let url = 'requisicao/enfileira';
    let method = 'post';

    return () => {
      callApi(url, method, requisicao)
        .then((data) => {
          this.updateRequisicao(data, 'actionSalvarRequisicao');
          showAlert('success', 'Success', `Requisição salva com sucesso.`);
        })
        .catch((errorMessage) => {
          this.requisicoesFailed(errorMessage);
        });
    };
  }

  requisicoesFailed(errorMessage) {
    return errorMessage;
  }

}

export default alt.createActions(RequisicaoActions);