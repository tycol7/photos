import React, { useState, useRef } from 'react'
import user_query from './Query'
import styled from 'styled-components'
import SearchIcon from './search.svg'
import Close from './close.svg'

const SearchWrap = styled.header`
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
        margin-left: 12px;
        height: 20px;
        width: 20px;

        img {
            margin: auto;
            display: block;
            max-width: 100%;
            max-height: 100%;
        }
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
    font-size: 1.2em;
    width: 275px;
    -webkit-appearance: none;
    border: none;
    background: #0D0D0D;
    color: #eee;

    :focus {
        outline: none;
    }
`;

function Search() {
    const [text, setText] = useState(user_query);
    const searchInput = useRef();

    const handleOnChange = event => {
        setText(event.target.value)
    }

    function clearText() {
        setText("")
        searchInput.current.focus();
    }

    return (
        <SearchWrap>
            <span className="search-icon"><img src={SearchIcon} alt="search" /></span>
            <form method="get" name="search" action="">
                <Input ref={searchInput} type="search" name="q" placeholder="Search photos" value={text} onChange={handleOnChange} />
            </form>
            {text && <span role="button" className="clear-icon" onClick={() => clearText()}><img src={Close} alt="close" /></span>}
        </SearchWrap>
    );
}

export default Search