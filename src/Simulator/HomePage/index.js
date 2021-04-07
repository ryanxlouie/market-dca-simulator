import React, { Component } from 'react';

// Regular style sheet
import { Card, Elevation, H4 } from "@blueprintjs/core";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
  }

  changePage(link) {
    const { pathProps } = this.props
    pathProps.history.push(link);
  }

  render() {
    return (
      <div className="flex-container">
        <div className="flex-row">
          <div className="flex-col">
            <Card 
              interactive={true} 
              elevation={Elevation.TWO} 
              onClick={() => this.changePage('/BollingerBandDip')}
            >
              <H4>Bollinger Band Dip</H4>
            </Card>
          </div>
          <div className="flex-col">
            <Card 
              interactive={true} 
              elevation={Elevation.TWO} 
              onClick={() => this.changePage('/ResidualStrengthIndex')}
            >
              <H4>Residual Strength Index</H4>
            </Card>
          </div>
          <div className="flex-col">
            <Card 
              interactive={true} 
              elevation={Elevation.TWO} 
              onClick={() => this.changePage('/TQQQExperiment')}
            >
              <H4>TQQQ Experiment</H4>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage;