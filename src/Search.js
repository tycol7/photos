import React, { useState, useRef } from 'react'
import query from './Query'
import styled from 'styled-components'
import SearchIcon from './search.svg'
import Close from './close.svg'

const SearchWrap = styled.div`
    margin: 1em auto;
    text-align: center;
    width: 350px;
    border-radius: 30px;
    border: 2px solid #eee;
    background: #0D0D0D;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .search-icon, .clear-icon {
        height: 20px;
        width: 20px;

        img {
            margin: auto;
            display: block;
            max-width: 100%;
            max-height: 100%;
        }
    }

    .search-icon {
        margin-left: 15px;
    }

    .clear-icon {
        cursor: pointer;
    }

    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration { 
        display: none; 
    }

`;

const Input = styled.input`
    padding: 0.8em 0.4em;
    font-size: 1.0em;
    font-weight: 600;
    width: 275px;
    -webkit-appearance: none;
    border: none;
    background: #0D0D0D;
    color: #eee;
    margin-left: 5px;

    :focus {
        outline: none;
    }
`;

const FilterWrap = styled.div`
    margin: 1em 0;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
        padding: 5px 10px;
        margin: 0 5px;
    }
`;

function Search() {
    const [text, setText] = useState(query.user_query);
    const [activeFilter, setActiveFilter] = useState(query.orientation || "");
    const searchInput = useRef();

    const availFilters = [["", "All"], ["landscape", "Landscape"], ["portrait", "Portrait"], ["squarish", "Square"]]

    /*
     * Keeps track of what's in the search bar
     */
    const handleOnChange = event => {
        setText(event.target.value)
    }

    /*
     * Clear's the search bar and focuses on the search
     */
    function clearText() {
        setText("")
        searchInput.current.focus();
    }

    return (
        <form method="get" name="search" action="">
            <SearchWrap>
                <span className="search-icon"><img src={SearchIcon} alt="search" /></span>
                    <Input ref={searchInput} type="search" name="q" placeholder="Search photos" value={text} onChange={handleOnChange} />
                {text && <span role="button" className="clear-icon" onClick={() => clearText()}><img src={Close} alt="close" /></span>}
            </SearchWrap>
            {query.user_query &&
                <FilterWrap>
                    {availFilters.map(key =>
                        <button className={key[0] === activeFilter ? 'active' : ''} key={key[0]} name="orientation" value={key[0]} onClick={() => setActiveFilter(key[0])}>{key[1]}</button>
                    )}
                </FilterWrap>
            }
        </form>
    );
}

export default Search