import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinners from '../../components/Spinner/Spinner';
import Input from '../../components/Input/Input';
import classes from './Auth.css'
import Button from '../../components/Button/Button';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        }
    }

    componentDidMount() {
        this.props.autoLogin();
    }

    onSubmitHandler = event => {
        event.preventDefault();
        this.props.onLogin(this.state.controls.email.value, this.state.controls.password.value);
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.validHandler(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }

    validHandler = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }


        return isValid;
    }

    render() {
        const loginFormArray = [];
        for(let formEl in this.state.controls){
            loginFormArray.push({
                name: formEl,
                config: this.state.controls[formEl]
            })
        }

        let form = loginFormArray.map(loginEl => (
            <Input key={loginEl.name}
            elementType={loginEl.config.elementType} 
            elementConfig={loginEl.config.elementConfig} 
            invalid={!loginEl.config.valid}
            shouldValidate={loginEl.config.validation ? true: false}
            value={loginEl.value} 
            touched={loginEl.config.touched}
            changed={event => this.inputChangedHandler(event,loginEl.name)} />
        ));

        if (this.props.loading) {
            form = <Spinners />
        }

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType="Success">Sign In</Button>
                    {this.props.error ? <p style={{ color: 'red', fontWeight: 'bold' }}>{this.props.error.message}</p> : null}
                    {this.props.isAuth ? <Redirect to='/admin/console' /> : null}
                </form>
            </div>
        )
    }
}

const mapPropsToState = state => {
    return {
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        loading: state.auth.loading
    }
}

const dispatchPropsToState = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.auth(email, password)),
        autoLogin: () => dispatch(actions.authCheckState()),
        setCategories: () => dispatch(actions.fetchCategories())
    }
}

export default connect(mapPropsToState, dispatchPropsToState)(Auth);