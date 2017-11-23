import React from 'react';
import BaseInput from '../BaseInput'
import { showAlert } from '../../../util/message';
import ModalImage from './ModalImageCrop';

class SelectImage extends BaseInput {

  constructor(props) {
    super(props);
    this.state = {
      image: '',
      imageEdited: '',
      scaleEdited: 1,
      showModal: false,
    }
  }

  handleFileUpload(e) {
    const file = e.target.files[0];

    if(!file) return;

    if(this.validateFile(file)) {
      const self = this;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if(file['type'] != 'image/svg+xml') {
          self.setState({ image: reader.result, showModal: true });
        } else {
          self.onChangeState(reader.result);
          self.setState({ imageEdited: reader.result, image: reader.result});
        }
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }

  onChangeState(value) {
    if(this.props.onChangeState) {
      this.props.onChangeState(this.props.state, value);
    }
  }

  validateFile(file) {
    let isValid = true;
    const fileType = file['type'];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];

    if(validImageTypes.indexOf(fileType) < 0) {
      isValid = false;
      showAlert('danger', 'Invalid file');
    } else if(this.props.maxSize < file.size/1024){
      isValid = false;
      showAlert('danger', `Maximim file size is ${this.props.maxSize/1024}MB`);
    }
    return isValid;
  }

  openUpload(e) {
    e.preventDefault();
    const type = this.state.imageEdited.substring("data:image/".length, this.state.imageEdited.indexOf(";base64"));
    if(this.state.imageEdited && type != 'svg+xml') {
      this.setState({ showModal: true, classInput: '' });
    } else {
      document.getElementById('inputFile').click();
      this.setState({ classInput: '' });
    }
  }

  onRemoveImage(event) {
    event.preventDefault();
    this.setState({ image:'', imageEdited: '', scaleEdited: 1, showModal: false },
    () => {
      document.getElementById('inputFile').value = '';
    });
  }

  handleApply(imageEdited, scale) {
    this.onChangeState(imageEdited);
    this.setState({ imageEdited: imageEdited, scaleEdited: scale, showModal: false });
  }

  isRequired() {
    this.setState({ classInput: 'input-required', message: 'Required' });
  }

  render() {

    let width = this.props.width ? this.props.width : 250;
    let height = this.props.height ? this.props.height : 250;

    return (
      <div className="card-block">
        <div className={this.props.title ? "card-title" : "hide" }>
          <h5>{this.props.title}</h5>
        </div>
        <div className="card-text" >
          <div className="col-md-12 col-xs-12" >
            <a
              href="#"
              onClick={this.openUpload.bind(this)}>
              <img
                src={this.state.imageEdited ? this.state.imageEdited : "/img/select_image.png"}
                className="img-thumbnail"
                width={this.state.imageEdited ? width : 200}
                height={this.state.imageEdited ? height : 200 }
              />
            </a>

            <input
              type="file"
              id="inputFile"
              style={{"display" : "none"}}
              onChange={this.handleFileUpload.bind(this)}
            />
          </div>
          <ModalImage
            width={width}
            height={height}
            image={this.state.image}
            scaleEdited={this.state.scaleEdited}
            show={this.state.showModal}
            handleApply={this.handleApply.bind(this)}
            onRemoveImage={this.onRemoveImage.bind(this)}
          />
        </div>
        {
          (this.state.classInput ? <span className="input-message-required">{this.state.message}</span> : <span/>)
        }
      </div>
    )
  }

}

export default SelectImage;
