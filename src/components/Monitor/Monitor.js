import React, { Component } from 'react';
import moment from 'moment';

import RequisicaoModal from './RequisicaoModal';
import RequisicaoStore from '../../stores/RequisicaoStore';
import RequisicaoActions from '../../actions/RequisicaoActions';
import { showAlert } from '../../util/message';

class Monitor extends Component {

    constructor(props) {
			super(props);
			this.state = {
				requisicoes: [],
				showModal: false
			}
		}
		
		componentWillMount() {
			this.onChange = this.onChange.bind(this);
		}

    componentDidMount() {

			RequisicaoStore.listen(this.onChange);

			socket.on('requisicoes', data => {
				this.setState({requisicoes: data});
			});
		}
		
		componentWillUnmount() {
			RequisicaoStore.unlisten(this.onChange);
		}

		onShowModal() {
			this.setState({showModal: !this.state.showModal});
		}

		onChange(state) {
			console.log('state', state);
		}

    render() {
        return (
					<div className='row'>
						<div className='header-page-header'>
							<div className='row'>
								<div className='col-md-6 col-sm-6 col-xs-6'>
									<h4>Monitor de Crawlers</h4>
								</div>
								<div className='col-md-6 col-sm-6 col-xs-6'>
									<button className='btn float-right' onClick={this.onShowModal.bind(this)}>Nova Requisição</button>
								</div>
							</div>
							<hr />
						</div>
						<div className='col-md-12 col-sm-12 col-xs-12'>
							<table className='table table-striped'>
								<thead>
									<tr>
										<th>Status</th>
										<th>Cod Requisição</th>
										<th>Número</th>
										<th>Data Cadastro</th>
									</tr>
								</thead>
								<tbody>
								{
									this.state.requisicoes.map((requisicao, idx) => 
										<tr key={idx}>
											<td><img width='30px' src={`/img/status/${requisicao.dsc_status_crawler_requisicao}.${requisicao.dsc_status_crawler_requisicao === 'Processando' ? 'svg' : 'png'}`} /></td>
											<td>{requisicao.cod_requisicao}</td>
											<td>{requisicao.num_processo}</td>
											<td>{moment(requisicao.dat_cadastro).format('DD/MM/YYYY hh:mm:ss')}</td>
										</tr>
									)
								}
								</tbody>
							</table>
						</div>
						<RequisicaoModal onShowModal={this.onShowModal.bind(this)} showModal={this.state.showModal} />
					</div>
        )
    }
}

export default Monitor;