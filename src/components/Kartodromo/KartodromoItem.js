import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import IconEdit from 'react-icons/lib/fa/edit';
import IconTrash from 'react-icons/lib/fa/trash-o';

class KartodromoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteKartodromo(event) {
    event.preventDefault();
    this.props.deleteKartodromo(this.props.kartodromo);
  }

  render() {
    return (
      <tr>
        <td className='align-middle'>
          {this.props.kartodromo.nome}
        </td>
        <td className='align-middle'>
          {this.props.kartodromo.telefone}
        </td>
        <td className='align-middle'>
          {this.props.kartodromo.site}
        </td>
        <td className='align-middle'>
          <Link data-tip='Edit' to={`/kartodromos/${this.props.kartodromo.id}`}>
            <IconEdit size={25} color='gray' />
          </Link>
        </td>
        <td className='align-middle'>
          <a data-tip='Remove' href='#' onClick={this.deleteKartodromo.bind(this)}>
            <IconTrash size={25} color='gray' />
          </a>
          <ReactTooltip />
        </td>
      </tr>
    )
  }
}

export default KartodromoItem;