import React, { Component } from 'react';
import io from 'socket.io-client';

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
            this.setState({requisicoes: data});
        });

    }

    render() {
        return (
            <div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Cod Requisição</th>
                            <th>Número</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.requisicoes.map((requisicao, idx) => 
                            <tr key={idx}>
                                <td><img width='30px' src={`/img/${requisicao.status}.${requisicao.status === 'E' ? 'svg' : 'png'}`} /></td>
                                <td>{requisicao.cod_requisicao}</td>
                                <td>{requisicao.numero}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Monitor;