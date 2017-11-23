import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import KartodromoItem from './KartodromoItem';
import KartodromoStore from '../../stores/KartodromoStore';
import KartodromoActions from '../../actions/KartodromoActions';
import ModalConfirm from '../shared/ModalConfirm';

class KartodromoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      kartodromos: [],
      kartodromoSelectedDelete: {},
      showModal: false
    }
    this.onStoreUpdate = this.onStoreUpdate.bind(this);
  }

  componentDidMount() {
    KartodromoStore.listen(this.onStoreUpdate);
    KartodromoActions.fetchKartodromos();
  }

  componentWillUnmount() {
    KartodromoStore.unlisten(this.onStoreUpdate);
  }

  onStoreUpdate(data) {
    
    if(data.action === 'actionFetchKartodromos' && data.kartodromos) {
      this.state.kartodromos = data.kartodromos;
      this.setState(this.state);
    }

    if(data.action === 'actionDeleteKartodromo') {
      KartodromoActions.fetchKartodromos();
    }
  }

  onShowModalDeleteKartodromo(kartodromo) {
    this.setState({ kartodromoSelectedDelete: kartodromo, showModal: true });
  }

  onDeleteKartodromo(isOk) {

    if(isOk) {
      this.setState({ showModal: false }, () => {
        console.log(this.state.kartodromoSelectedDelete.id)
        KartodromoActions.deleteKartodromo(this.state.kartodromoSelectedDelete.id);
      });
    } else {
      this.setState({ showModal: false, kartodromoSelectedDelete: {} });
    }
  }

  

  render() {
    return (
      <div>
        <div className='my-5'>
          <h2>
            Lista de Kartódromos
            <Link className='btn btn-success float-right' to='/kartodromos/0'>
              Novo Kartódromo
            </Link>
          </h2>
          <hr />
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Site</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.kartodromos.map((kartodromo) =>
                  <KartodromoItem
                    key={kartodromo.id}
                    kartodromo={kartodromo}
                    deleteKartodromo={this.onShowModalDeleteKartodromo.bind(this)}
                  />
                )
              }
          </tbody>
        </table>
        <ModalConfirm
          title='Remover registro'
          textBody='Tem certeza que deseja excluir?'
          show={this.state.showModal}
          onClick={this.onDeleteKartodromo.bind(this)}
        />
      </div>
    )
  }
  
}

export default KartodromoList;