import React, { useState } from 'react';
import classes from './SearchButton.css'

const searchButton = props => {
    const [search, setSearch] = useState('');

    const searchHandler = event => {
        setSearch(event.target.value);
    }

    return (
        <form action="" className={classes.Searchbar}>
            <input type="search" name="search" value={search} pattern=".*\S.*" required onChange={event => searchHandler(event)} />
                <button className={classes.Searchbtn} type="submit">
                    <span>Search</span>
                </button>
        </form>
    );
}

export default searchButton;