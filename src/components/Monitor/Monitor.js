import React, { Component } from 'react';
import io from 'socket.io-client';
import moment from 'moment';

const socket = io('http://localhost:3000/');


class Monitor extends Component {

    constructor(props) {
			super(props);
			this.state = {
				requisicoes: []
			}
    }

    componentDidMount() {
			socket.on('requisicoes', data => {
				console.log('data', data);
				this.setState({requisicoes: data});
			});
    }

    render() {
        return (
					<div className='row'>
						<div className='header-page-header'>
							<h4>Monitor de Crawlers</h4>
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
											<td><img width='30px' src={`/img/status/${requisicao.status}.${requisicao.status === 'E' ? 'svg' : 'png'}`} /></td>
											<td>{requisicao.cod_requisicao}</td>
											<td>{requisicao.numero}</td>
											<td>{moment(requisicao.dat_cadastro).format('DD/MM/YYYY hh:mm:ss')}</td>
										</tr>
									)
								}
								</tbody>
							</table>
						</div>
					</div>
        )
    }
}

export default Monitor;