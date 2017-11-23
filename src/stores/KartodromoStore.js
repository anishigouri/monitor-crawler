import alt from '../alt';
import KartodromoActions from '../actions/KartodromoActions';

class KartodromoStore {

  constructor() {

    this.kartodromo = {};
    this.kartodromos = {};
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateKartodromo: KartodromoActions.UPDATE_KARTODROMO,
      handleUpdateKartodromos: KartodromoActions.UPDATE_KARTODROMOS,
      handleFetchKartodromos: KartodromoActions.FETCH_KARTODROMOS,
      handleKartodromosFailed: KartodromoActions.KARTODROMOS_FAILED,
      handleFetchKartodromoById: KartodromoActions.FETCH_KARTODROMO_BY_ID
    });

  }

  handleFetchKartodromoById(data) {
    this.action = data.action;
    this.kartodromo = data.kartodromo;
    this.errorMessage = null;
  }

  handleUpdateKartodromo(data) {
    this.action = data.action;
    this.kartodromo = data.kartodromo;
    this.errorMessage = null;
  }

  handleUpdateKartodromos(data) {
    this.action = data.action;
    this.kartodromos = data.kartodromos;
    this.errorMessage = null;
  }

  handleFetchKartodromos() {
    this.kartodromos = [];
  }

  handleKartodromosFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

}

export default alt.createStore(KartodromoStore, 'KartodromoStore');
