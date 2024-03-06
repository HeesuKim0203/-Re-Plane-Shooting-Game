import React from 'react' ;
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import Home from './page/home'
import History from './page/history'
import { HOME, HISTORY } from './util/url' 

function App() {
  return (
    <div>
      <BrowserRouter basename = { process.env.PUBLIC_URL }>
        <Routes>
          <Route path = { HOME } element = { <Home/> } />
          <Route path = { HISTORY } element = { <History/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
