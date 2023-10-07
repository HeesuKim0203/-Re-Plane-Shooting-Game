import React from 'react' ;
import { BrowserRouter, Route, Routes } from 'react-router-dom' ;

import './App.css'

import Home from './page/home'
import History from './page/history'
import { HOME, HISTORY } from './until/url' ;
import logo from './logo.svg' ;

function App() {
  return (
    <div className = "bg-zinc-200">
      <BrowserRouter>
        <Routes>
          <Route path = { HOME } element = { <Home/> } />
          <Route path = { HISTORY } element = { <History/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
