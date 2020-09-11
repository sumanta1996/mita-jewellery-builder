import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './SearchButton.css'

const searchButton = props => {
    const [search, setSearch] = useState('');
    const inputRef = useRef();

    const searchHandler = event => {
        if(!(event.target.value.includes('<') || event.target.value.includes('>'))){
            setSearch(event.target.value);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if(search === inputRef.current.value) {
                props.setSearchedValue(search);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [search, inputRef]);

    return (
        <form action="" className={classes.Searchbar}>
            <input type="search" name="search" ref={inputRef} value={search} pattern=".*\S.*" required onChange={event => searchHandler(event)} />
                <button className={classes.Searchbtn} type="submit">
                    <span>Search</span>
                </button>
        </form>
    );
}

const dispatchPropsToState = dispatch => {
    return {
        setSearchedValue: searchedValue => dispatch(actions.setSearchedValue(searchedValue))
    }
}

export default connect(null, dispatchPropsToState)(searchButton);