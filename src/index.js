import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import Search from './Search'
import Gallery from './Gallery'

ReactDOM.render(
  <React.StrictMode>
    <Search />
    <Gallery />
  </React.StrictMode>,
  document.getElementById('root')
);