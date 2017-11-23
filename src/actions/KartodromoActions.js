import alt from '../alt';
import callApi from '../util/apiCaller';

class KartodromosActions {

  updateKartodromos(kartodromos, action) {
    return { kartodromos, action };
  }

  updateKartodromo(kartodromo, action) {
    return { kartodromo, action };
  }

  fetchKartodromos() {
    return () =>
      callApi('kartodromos')
        .then((data) => {
          this.updateKartodromos(data, 'actionFetchKartodromos');
        })
        .catch((errorMessage) => {
          this.kartodromosFailed(errorMessage);
        });
  }

  saveKartodromo(kartodromo) {

    let url = 'kartodromos/';
    let method = 'post';

    if(kartodromo.id && kartodromo.id !== '0') {
      method = 'put';
      url += kartodromo.id;
    }

    return () => {
      callApi(url, method, kartodromo)
        .then((kartodromo) => {
          this.updateKartodromo(kartodromo, 'actionSaveKartodromo');
        })
        .catch((errorMessage) => {
          this.kartodromosFailed(errorMessage);
        });
    };
  }

  deleteKartodromo(id) {
    return () =>
      callApi(`kartodromos/${id}`, 'delete')
        .then(() => {
          this.updateKartodromo({}, 'actionDeleteKartodromo');
        })
        .catch((errorMessage) => {
          this.kartodromosFailed(errorMessage);
        });
  }

  fetchKartodromoById(id) {
    return () =>
      callApi(`kartodromos/${id}`)
        .then((data) => {
          this.updateKartodromo(data[0], 'actionFetchKartodromoById');
        })
        .catch((errorMessage) => {
          this.kartodromosFailed(errorMessage);
        });
  }

  kartodromosFailed(errorMessage) {
    return errorMessage;
  }

}

export default alt.createActions(KartodromosActions);
