import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import axios from 'axios';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import classes from './AdminConsole.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from "../../components/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class AdminConsole extends Component {
  state = {
    controls: {
      imageId: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your image id'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      length: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Length (in cm)'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      width: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Width (in cm)'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      height: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Height (in cm)'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your title'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      imageDescription: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your image description'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      price: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Price (in Rs.)'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      Categories: {
        elementType: 'select',
        elementConfig: {
          options: null
        },
        value: 'Jewelleries',
        validation: {
          required: false
        },
        valid: true
      }
    },
    formIsValid: false,
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: {
      url1: '',
      url2: '',
      url3: ''
    },
    length: 0,
    uploaded: false,
    error: null
  };

  handleChangeUsername = event => this.setState({ imageDetails: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false, error: error });
    //console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ length: this.state.length + 1 });
        const urlArr = { ...this.state.avatarURL };
        for (let key in urlArr) {
          if (urlArr[key] === '') {
            urlArr[key] = url;
            break;
          }
        }
        this.setState({ avatarURL: urlArr });
      });
  };

  uploadAll = event => {
    event.preventDefault();
    const data = {
      url: this.state.avatarURL,
      title: this.state.controls.title.value,
      details: this.state.controls.imageDescription.value,
      id: this.state.controls.imageId.value,
      category: this.state.controls.Categories.value,
      length: this.state.controls.length.value,
      width:  this.state.controls.width.value,
      height: this.state.controls.height.value,
      price: this.state.controls.price.value,
    }
    axios.post('https://mita-jewellery.firebaseio.com/posts.json', data)
      .then(res => {
        this.setState({ uploaded: true });
      }).catch(err => {
        this.setState({ error: err });
      })
  }

  reset = () => {
    this.setState({
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: {
        url1: '',
        url2: '',
        url3: ''
      },
      length: 0,
      uploaded: false,
      error: null
    })
  }

  validHandler = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.controls
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.validHandler(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let element in updatedOrderForm) {
      formIsValid = updatedOrderForm[element].valid && formIsValid;
    }
    this.setState({ controls: updatedOrderForm, formIsValid: formIsValid });
  }

  constructor(props) {
    super(props);
    this.props.setCategories();

  }

  shouldComponentUpdate() {
    if (!this.state.controls.Categories.elementConfig.options) {
      let initialValue = ''
      for(let key in this.props.categories) {
          initialValue = this.props.categories[key].value;
          break;
      }
      //const initialValue = this.props.categories[0].value;
      const obj = {
        ...this.state.controls,
        Categories: {
          ...this.state.controls.Categories,
          elementConfig: {
            ...this.state.controls.Categories.elementConfig,
            options: this.props.categories
          },
          value: initialValue
        }
      }
      this.setState({
        controls: obj
      });
      return true;
    } else {
      //console.log('Here 2', this.state.controls.Categories.elementConfig.options);
      return true;
    }
  } 

  render() {

    const orderFormArray = [];
    for (let formEl in this.state.controls) {
      orderFormArray.push({
        name: formEl,
        config: this.state.controls[formEl]
      })
    }

    let entireForm = <Spinner />;
    if (this.state.controls.Categories.elementConfig.options && this.props.categories) {
      entireForm = <form className={classes.AdminConsole} onSubmit={this.uploadAll}>
        <label>Image Details:</label>
        {orderFormArray.map(formElement => {
          return <Input key={formElement.name}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation ? true : false}
            value={formElement.value}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.name)} />
      })}
        
        <label>Upload your image:</label>
        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        <FileUploader
          accept="image/*"
          name="avatar"
          randomizeFilename
          storageRef={firebase.storage().ref("images")}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
        {this.state.uploaded ? <p style={{ color: 'green', fontWeight: 'bold' }}>Uploaded succesfully!</p> : null}
        {this.state.error ? <p style={{ color: 'red', fontWeight: 'bold' }}>Failed. Please Try Again!</p> : null}
        <Button btnType="Success" >Submit</Button>
      </form>
    }
    return (
      <div style={{ textAlign: 'center' }}>
        {entireForm}
        <p>No. of files uploaded : {this.state.length}</p>
        <Button btnType="Danger" clicked={this.reset}>Reset</Button>
      </div>
    );
  }
}

const mapPropsToState = state => {
  return {
    categories: state.adminConsole.categories
  }
}

const dispatchPropsToState = dispatch => {
  return {
    setCategories: () => dispatch(actions.fetchCategories())
  }
}

export default connect(mapPropsToState, dispatchPropsToState)(withErrorHandler(AdminConsole, axios));