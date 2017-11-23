import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import IconClose from 'react-icons/lib/fa/close';
import IconConfirm from 'react-icons/lib/fa/check';

class ModalConfirm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alert: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.show) {
      this.setState({alert: true});
    } else {
      this.setState({alert: false});
    }
  }

  onConfirm() {
    this.setState({alert: false}, () => {
      this.props.onClick(true);
    });
  }

  onCancel() {
    this.setState({alert: false}, () => {
      this.props.onClick(false);
    });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.alert}>
          <ModalHeader>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.textBody}
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.onCancel.bind(this)}><IconClose size={20} /> Cancel</button>
            <button className='btn btn-success' onClick={this.onConfirm.bind(this)}><IconConfirm size={20} /> Confirm</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalConfirm;
