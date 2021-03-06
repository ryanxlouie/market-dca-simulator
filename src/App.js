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
import ResidualStrengthIndex from './Simulator/ResidualStrengthIndex';
import TQQQExperiment from './Simulator/TQQQExperiment';

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
            <Route
              path="/ResidualStrengthIndex"
              render={props => 
                <ResidualStrengthIndex />
              }
            />
            <Route
              path="/TQQQExperiment"
              render={props => 
                <TQQQExperiment />
              }
            />
            <Redirect from="/" to="/HomePage" />
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
