import React, { Component } from 'react';
import classes from './ImgViewer.css';

class ImgViewer extends Component {

    render() {
        return (
            <div className='column' onClick={this.props.clicked}>
                <div className={classes.card} style={{ width: 'fit-content' }}>
                    <img src={this.props.url} className='card-img-top' style={{width: '300px', height: '300px', objectFit: 'cover'}} alt='' />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImgViewer;