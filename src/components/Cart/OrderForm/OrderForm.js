import React, { Component } from 'react';
import Input from '../../Input/Input';
import classes from './OrderForm.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../Spinner/Spinner';
import checkmarkSuccess from '../../../assets/checkmarkSuccess.svg';

class OrderForm extends Component {
    state = {
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Name',
                    disabled: false
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email',
                    disabled: false
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            mobileNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Enter your mobile number',
                    disabled: false
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your full address',
                    disabled: false
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        dataExists: false
    };

    componentDidMount() {
        if (!this.props.history.location.aboutProps) {
            this.props.history.replace('/cart');
        } else {
            if (localStorage.getItem('user')) {
                const user = JSON.parse(localStorage.getItem('user'));
                const updatedOrderForm = {
                    ...this.state.controls
                };
                let updatedFormElement = { ...updatedOrderForm['name'] }
                let elementConfig = { ...updatedFormElement.elementConfig };
                updatedFormElement.value = user.name;
                elementConfig.disabled = true;
                updatedFormElement.elementConfig = elementConfig;
                updatedOrderForm['name'] = updatedFormElement;

                updatedFormElement = { ...updatedOrderForm['email'] }
                elementConfig = { ...updatedFormElement.elementConfig };
                updatedFormElement.value = user.email;
                elementConfig.disabled = true;
                updatedFormElement.elementConfig = elementConfig;
                updatedOrderForm['email'] = updatedFormElement;

                updatedFormElement = { ...updatedOrderForm['address'] }
                elementConfig = { ...updatedFormElement.elementConfig };
                updatedFormElement.value = user.address;
                elementConfig.disabled = true;
                updatedFormElement.elementConfig = elementConfig;
                updatedOrderForm['address'] = updatedFormElement;

                updatedFormElement = { ...updatedOrderForm['mobileNumber'] }
                elementConfig = { ...updatedFormElement.elementConfig };
                updatedFormElement.value = user.mobileNumber;
                elementConfig.disabled = true;
                updatedFormElement.elementConfig = elementConfig;
                updatedOrderForm['mobileNumber'] = updatedFormElement;

                this.setState({ controls: updatedOrderForm, dataExists: true});
            }
        }
    }

    resetData = () => {
        const updatedOrderForm = {
            ...this.state.controls
        };
        let updatedFormElement = { ...updatedOrderForm['name'] }
        let elementConfig = { ...updatedFormElement.elementConfig };
        updatedFormElement.value = '';
        elementConfig.disabled = false;
        updatedFormElement.elementConfig = elementConfig;
        updatedOrderForm['name'] = updatedFormElement;

        updatedFormElement = { ...updatedOrderForm['email'] }
        elementConfig = { ...updatedFormElement.elementConfig };
        updatedFormElement.value = '';
        elementConfig.disabled = false;
        updatedFormElement.elementConfig = elementConfig;
        updatedOrderForm['email'] = updatedFormElement;

        updatedFormElement = { ...updatedOrderForm['address'] }
        elementConfig = { ...updatedFormElement.elementConfig };
        updatedFormElement.value = '';
        elementConfig.disabled = false;
        updatedFormElement.elementConfig = elementConfig;
        updatedOrderForm['address'] = updatedFormElement;

        updatedFormElement = { ...updatedOrderForm['mobileNumber'] }
        elementConfig = { ...updatedFormElement.elementConfig };
        updatedFormElement.value = '';
        elementConfig.disabled = false;
        updatedFormElement.elementConfig = elementConfig;
        updatedOrderForm['mobileNumber'] = updatedFormElement;

        this.setState({ controls: updatedOrderForm, dataExists: false, formIsValid: false });
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

    submitHandler = event => {
        event.preventDefault();
        const orderData = {
            customerName: this.state.controls.name.value,
            email: this.state.controls.email.value,
            mobilNum: this.state.controls.mobileNumber.value,
            address: this.state.controls.address.value,
            totalPrice: this.props.history.location.aboutProps.totalPrice,
            images: this.props.history.location.aboutProps.data,
            delivered: false,
            date: new Date().toLocaleDateString()
        }
        this.props.saveData(orderData);
        //Set it on the basis of success 
        if(this.props.history.location.aboutProps.clearCart) {
            this.props.clearCart();
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
        if (this.props.success) {
            setTimeout(() => {
                this.props.timeoutFeature();
                this.props.history.push('/');
            }, 3000);
        }

        return (
            <div className={classes.totalPage}>
                <div className={classes.Summary}>
                    <h5><strong>Price Details</strong></h5>
                    <hr />
                    <table className={classes.Table}>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td>Price({this.props.history.location.aboutProps ? this.props.history.location.aboutProps.size : '0'} items)</td>
                                <td>&#x20B9; {this.props.history.location.aboutProps ? this.props.history.location.aboutProps.totalPrice : 0}</td>
                            </tr>
                            <tr>
                                <td>Delivery Charges</td>
                                <td>Will depend on the location</td>
                            </tr>
                            <tr>
                                <td><hr /></td>
                                <td><hr /></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><strong>Total Amount</strong></td>
                                <td><strong>&#x20B9; {this.props.history.location.aboutProps ? this.props.history.location.aboutProps.totalPrice : 0}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className={classes.OrderForm}>
                    <h3><strong>Billing Details</strong></h3>
                    <hr />
                    {this.state.dataExists ? <div>
                        <p>Is this you?</p>
                        <button onClick={() => this.setState({dataExists: false, formIsValid: true })}>Yes</button>
                        <button onClick={this.resetData}>No</button>
                    </div> : null}
                    {orderFormArray.map(formElement => <Input key={formElement.name}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation ? true : false}
                        value={formElement.config.value}
                        touched={formElement.config.touched}
                        changed={event => this.inputChangedHandler(event, formElement.name)} />
                    )}
                    {this.props.isLoading ? <Spinner /> : <button disabled={!(this.state.formIsValid)} onClick={this.submitHandler}>PLACE ORDER</button>}
                    {this.props.success ? <div className={classes.Success}>
                        <img src={checkmarkSuccess} alt='' />
                        <p>Your order has been placed succcesfully.</p>
                    </div> : null}
                </div>
            </div>
        )
    }
};

const mapPropsToState = state => {
    return {
        isLoading: state.cart.isLoading,
        success: state.cart.success
    }
}

const dispatchPropsToState = dispatch => {
    return {
        saveData: orderData => dispatch(actions.saveData(orderData)),
        timeoutFeature: () => dispatch(actions.saveDataFailure()),
        clearCart: () => dispatch(actions.clearCartData())
    }
}

export default connect(mapPropsToState, dispatchPropsToState)(OrderForm);