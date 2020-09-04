import React, { Component } from 'react';
import Modal from '../../components/Modal/Modal';
import classes from './ContactUs.css';
import test from '../../assets/test.jpg';
import { Redirect } from 'react-router';
import Logo from '../../components/Logo/Logo';

class ContactUs extends Component {
    state = {
        showModal: false,
        redirect: false
    }

    toCloseModalHandler = () => {
        this.setState({ showModal: false, redirect: true });
    }

    componentDidMount() {
        this.setState({ showModal: true, redirect: false });
    }

    render() {
        return (
            <Modal show={this.state.showModal} modalClosed={this.toCloseModalHandler}>
                <div className='column'>
                    <div className={classes.card}>
                        <div className='row' style={{marginLeft: '20px'}}>
                            <img
                                src={test}
                                className='card-img-top'
                                style={{ width: '50%', borderRadius: '50%' }} alt='' />
                            <Logo />
                        </div>
                        <div className="card-body">
                            <hr />
                            <h3 style={{ fontSize: '24px', color: '#c2157d', fontWeight: 'bold' }}>Akkshay Mita Jewellery</h3>
                            <h4 className="card-title">Susmita Nandy</h4>
                            <h6>Contact No. 8697872274</h6>

                            <p className="card-title">Payment Options : Google Pay/ Phonepe/ Bank Transfer</p>
                        </div>
                    </div>
                </div>
                {this.state.redirect ? <Redirect to='/' /> : null}
            </Modal>
        );
    }
}

export default ContactUs;