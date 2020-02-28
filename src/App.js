import React from 'react';

import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';

// Import the Blueprint CSS
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

// Regular style sheet
import './App.css';
import { Alignment, Classes, Button, Navbar, NavbarGroup } from "@blueprintjs/core";

// Components
import HomePage from './Simulator/HomePage';
import BollingerBandDip from './Simulator/BollingerBandDip';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar fixedToTop={true}>
          <NavbarGroup align={Alignment.LEFT}>
            <Link to="/HomePage" style={{textDecoration: 'none', color: 'inherit'}}>
              <Button className={Classes.MINIMAL} icon="home" text="Home" />
            </Link>
          </NavbarGroup>
        </Navbar>
        <div className="App-body">
          <Switch>
            <Route
              path="/HomePage"
              render={props => 
                <HomePage 
                  pathProps={props}
                />
              }
            />
            <Route
              path="/BollingerBandDip"
              render={props => 
                <BollingerBandDip />
              }
            />
            <Redirect from="/" to="/HomePage" />
          </Switch>
          <div className="flex-container" style={{height: '1000px'}}>
            <div className="flex-row">
              <div className="flex-col">
                Hello
              </div>
              <div className="flex-col">
                Hello
              </div>
              <div className="flex-col">
                Hello
              </div>
              <div className="flex-col">
                Hello
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-col">
                Hello
              </div>
              <div className="flex-col">
                Hello
              </div>
              <div className="flex-col">
                Hello
              </div>
              <div className="flex-col">
                Hello
              </div>
            </div>
          </div>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
