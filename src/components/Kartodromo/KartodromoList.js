import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import KartodromoItem from './KartodromoItem';

class KartodromoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      kartodromos: [
        {
          id: 1, nome: 'San Marino', site: 'www.kartsanmarino.com', telefone: '(11)2532-6521'
        }
      ]
    }
  }

  onShowModalDeleteKartodromo(kartodromo) {
    //this.setState({ userSelectedDelete: user, showModal: true });
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
      </div>
    )
  }
  
}

export default KartodromoList;