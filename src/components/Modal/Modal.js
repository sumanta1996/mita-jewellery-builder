import React, { Component } from 'react';
import classes from './Modal.css';
import Auxillary from '../../hoc/Auxillary';
import Backdrop from '../Backdrop/Backdrop';
import CSSTransition from 'react-transition-group/CSSTransition';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Auxillary>
                <Backdrop show={this.props.show} darker={this.props.darker} clicked={this.props.modalClosed} isSideContent={this.props.isSideContent} />
                <CSSTransition
                    in={this.props.show}
                    timeout={400}
                    mountOnEnter unmountOnExit
                    classNames={{
                        enter: '',
                        enterActive: classes.ModalOpen,
                        exit: '',
                        exitActive: classes.ModalClose}}>
                    <div
                        className={classes.Modal}
                        style={{
                            display: this.props.show ? 'table-cell' : null,
                            zIndex: this.props.darker ? '700' : '500',
                            backgroundColor: this.props.darker ? "white" : 'transparent',
                            width: this.props.darker ? '300px' : null,
                            height: this.props.darker ? '120px' : null,
                            left: this.props.darker ? window.innerWidth < 500 ? '12%' : '40%' : null,
                            top: this.props.darker ? '40%' : null,
                            borderRadius: this.props.darker ? '10px' : null
                        }}>
                        {this.props.children}
                    </div>
                </CSSTransition>
            </Auxillary>
        );
    }
}

export default Modal;