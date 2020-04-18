import React, { Component, Fragment } from "react";

import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './Home';
import GameRoom from './components/Room/GameRoom';

const App = () => {
  return (

    <Fragment>
      <BrowserRouter>

        <Route path="/" exact>
          <Home />
          {/* <GameRoom /> */}
        </Route>

      </BrowserRouter>
    </Fragment>

  );
}


export default App;
