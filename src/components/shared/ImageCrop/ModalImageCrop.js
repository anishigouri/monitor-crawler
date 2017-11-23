import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import IconCheck from 'react-icons/lib/fa/check';
import IconRotateLeft from 'react-icons/lib/md/rotate-left';
import IconRotateRight from 'react-icons/lib/md/rotate-right';
import IconTrash from 'react-icons/lib/fa/trash-o';

import AvatarEditor from 'react-avatar-editor';
import BaseForm from '../BaseForm';

class ModalImageCrop extends BaseForm {

  constructor(props) {
    super(props);
    this.state = {
      scale: this.state.scale,
      rotate: 0
    };
  }

  componentWillReceiveProps() {
    this.setState({ scale: this.props.scaleEdited });
  }

  handleScale(e) {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  }

  rotateLeft(e) {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate - 90
    });
  }

  rotateRight(e) {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    });
  }

  handleApply(e) {
    e.preventDefault();
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    this.props.handleApply(img, this.state.scale);
  }

  render() {
    return (
        <div>
          <Modal className='modal-upload-width' isOpen={ this.props.show }>
            <ModalHeader>
              Editar Imagem
            </ModalHeader>
            <ModalBody>
              <div className="col-md-12 col-xs-12 text-center">
                <AvatarEditor
                  ref={(editor) => { this.editor = editor; }}
                  image={this.props.image}
                  width={this.props.width ? this.props.width : 250}
                  height={this.props.height ? this.props.height : 250}
                  border={this.props.border ? this.props.border : 30}
                  scale={this.state.scale}
                  rotate={this.state.rotate}
                />
                <div className="col-md-12 col-xs-12 text-center">
                  <button className="btn btn-sm mr-1" onClick={this.rotateLeft.bind(this)}>
                    <IconRotateLeft size={20} />
                  </button>
                  <button className="btn btn-sm" onClick={this.rotateRight.bind(this)}>
                    <IconRotateRight size={20} />
                  </button>
                </div>
                <div className="col-md-12 col-xs-12">
                  <input
                    type="range"
                    className="form-control"
                    onChange={this.handleScale.bind(this)}
                    min="1"
                    max="2"
                    step="0.01"
                    defaultValue={this.state.scale ? this.state.scale : "1"}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button role="button" className="btn btn-default" onClick={this.props.onRemoveImage.bind(this)}>
                <IconTrash size={20} /> Remover Imagem
              </button>
              <button role="button" className="btn btn-success" onClick={this.handleApply.bind(this)}>
                <IconCheck size={20} /> Aplicar
              </button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }
}

export default ModalImageCrop;
