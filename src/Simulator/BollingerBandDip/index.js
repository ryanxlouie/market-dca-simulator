import React, { Component } from 'react';

// Functions
import arrayLineup from '../../lib/helpers/arrayLineup';
import candleColor from '../../lib/helpers/candleColor';
import bbandHelpers from '../../lib/helpers/bbandHelpers';
import simpleBuy from '../../lib/simulations/simpleBuy';

// Routes
import dailyRoutes from '../../routes/dailyRoutes';
import technicalRoutes from '../../routes/technicalRoutes';

// Regular style sheet
import { H2, Button, Card } from "@blueprintjs/core";

// Components
import LineChart from './components/LineChart';
import ResultCard from './components/ResultCard';

class BollingerBandDip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiFinished: false,
      dailyData: [],
      bbandData: [],
      simulationResults: {}
    };

    this.startSimulation = this.startSimulation.bind(this);
  }

  startSimulation() {
    const { dailyData, bbandData } = this.state;
    let simulationResults = {};

    // Get trigger dates
    let basicTriggerDates = [];
    let triggerDates = [];
    for (let a = 1; a < dailyData.length; a += 1) {
      if (a % 10 === 0) {
        basicTriggerDates.push(dailyData[a].date);
      }
      if (candleColor(dailyData[a]) === 'green'
        && bbandHelpers.candleCrossLower(dailyData[a], bbandData[a])
        && candleColor(dailyData[a-1]) === 'red'
        && (bbandHelpers.candleCrossLower(dailyData[a-1], bbandData[a-1]) || bbandHelpers.candleBelowLower(dailyData[a-1], bbandData[a-1]))
      ) {
        triggerDates.push(dailyData[a].date);
      }
    }

    simulationResults.triggerDates = triggerDates;
    simulationResults.simpleBuyTab = simpleBuy(1000, 1000, basicTriggerDates, dailyData);
    simulationResults.buyTab = simpleBuy(1000, 1000, triggerDates, dailyData);

    this.setState({
      simulationResults: simulationResults,
    });
  }

  componentDidMount() {
    Promise.all([
      dailyRoutes.getDailyData('QQQ', '1/2/2015'),
      technicalRoutes.getBollingerBandData('QQQ', '1/2/2015'),
    ])
      .then(result => {
        let  {returnOne, returnTwo } = arrayLineup(result[0], result[1]);
        this.setState({
          apiFinished: true,
          dailyData: returnOne,
          bbandData: returnTwo,
        })
      })
  }

  render() {
    const { apiFinished, dailyData, simulationResults } = this.state;
    if (!apiFinished) {
      return (<div></div>)
    }
    console.log(this.state);

    return (
      <div className="flex-container">
        <div className="flex-row">
          <div className="flex-col">
            <H2>Bollinger Band Dip</H2>
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-col">
            <LineChart
              dailyData={dailyData}
              simulationResults={simulationResults}
            />
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-col-1">
            <Card>
              <Button
                onClick={this.startSimulation}
              >
                Start Simulation
              </Button>
            </Card>
          </div>
          <div className="flex-col-4">
            <ResultCard
              simulationResults={simulationResults}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default BollingerBandDip;