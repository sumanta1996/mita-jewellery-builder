import React, { useState, useEffect } from 'react';
import Auxillary from '../Auxillary';
import Modal from '../../components/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState();

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        useEffect(() => {
            return (() => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            });
        }, [reqInterceptor, resInterceptor]);

        const errorHandler = () => setError(null);

        return (
            <Auxillary>
                <Modal show={error} darker modalClosed={errorHandler}><h1>Something went wrong!</h1></Modal>
                <WrappedComponent {...props} />
            </Auxillary>
        );
    }
}

export default withErrorHandler;