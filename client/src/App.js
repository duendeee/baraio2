import React, { Component, Fragment } from "react";
import { BrowserRouter } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import User from './User';
import RoomCreateUpdate from './components/Room/RoomCreateUpdate';
import RoomsList from './components/Room/RoomsList';


class App extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>

          <User />

          <Route path="/rooms/:pk"  component={RoomCreateUpdate} />
                    <Route path="/rooms/" exact component={RoomCreateUpdate} />
        </BrowserRouter>
        </Fragment>
    );
  }

}

export default App;
