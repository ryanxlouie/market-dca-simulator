import React, { Component } from 'react';

// Functions
import arrayLineup from '../../lib/helpers/arrayLineup';
import simpleBuy from '../../lib/simulations/simpleBuy';

// Routes
import dailyRoutes from '../../routes/dailyRoutes';
import technicalRoutes from '../../routes/technicalRoutes';

// Regular style sheet
import { H2, Button } from "@blueprintjs/core";

// Components
import LineChart from './components/LineChart';
import ResultsCard from './components/ResultsCards';

class TQQQExperiment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiFinished: false,
      qqqData: [],
      tqqqData: [],
      smaData: [],
      simulationResults: {},
    };

    this.startSimulation = this.startSimulation.bind(this);
  }

  startSimulation() {
    const { qqqData, tqqqData, smaData } = this.state;
    let simulationResults = {};

    // Get trigger dates
    let simpleTriggerDates = [];
    let triggerDates = [];
    for (let a = 1; a < smaData.length; a += 1) {
      // Move above MA
      if (qqqData[a].close > smaData[a].sma && qqqData[a-1].close < smaData[a-1].sma) {
        triggerDates.push({
          date: qqqData[a].date,
          action: 'buy'
        });
      }
      // Move below MA
      if (qqqData[a].close < smaData[a].sma && qqqData[a-1].close > smaData[a-1].sma) {
        triggerDates.push({
          date: qqqData[a].date,
          action: 'sell'
        });
      }
    }

    // Simulation
    let tab = [];
    let balance = 1000;
    let balanceIncrease = 1000;
    let currentShares = 0;
    let currentMode = 'buy';
    let triggerDatesDates = triggerDates.map(x => x.date)

    for (let a = 0; a < qqqData.length; a += 1) {
      // Add 1000 every 10 days
      if (a % 10 === 0) {
        simpleTriggerDates.push(qqqData[a].date);
        balance += balanceIncrease;
        if (currentMode === 'buy') {
          let buyShares = Math.floor(balance / tqqqData[a].adjustedClose);
          balance -= buyShares * tqqqData[a].adjustedClose;
          currentShares += buyShares
          tab.push({
            action: 'buy',
            worth: balance + (currentShares * tqqqData[a].adjustedClose),
            date: qqqData[a].date,
            adjustedClose: tqqqData[a].adjustedClose,
            balance,
            currentShares,
          });
        }
      }
      // Trigger
      if (triggerDatesDates.includes(qqqData[a].date)) {
        currentMode = triggerDates[triggerDatesDates.indexOf(qqqData[a].date)].action;
        if (currentMode === 'buy') {
          currentShares = Math.floor(balance / tqqqData[a].adjustedClose);
          balance -= currentShares * tqqqData[a].adjustedClose;
          tab.push({
            action: 'buy',
            worth: balance + (currentShares * tqqqData[a].adjustedClose),
            date: qqqData[a].date,
            adjustedClose: tqqqData[a].adjustedClose,
            balance,
            currentShares,
          });
        }
        if (currentMode === 'sell') {
          balance += currentShares * tqqqData[a].adjustedClose;
          currentShares = 0;
          tab.push({
            action: 'sell',
            worth: balance + (currentShares * tqqqData[a].adjustedClose),
            date: qqqData[a].date,
            adjustedClose: tqqqData[a].adjustedClose,
            balance,
            currentShares,
          });
        }
      }
    }


    simulationResults.neverBuyResults = simpleBuy(1000, 1000, [], qqqData);
    simulationResults.simpleBuyResults = simpleBuy(1000, 1000, simpleTriggerDates, qqqData);
    simulationResults.tqqqBuyResults = tab;

    this.setState({
      simulationResults: simulationResults,
    });
  }

  componentDidMount() {
    Promise.all([
      dailyRoutes.getDailyData('QQQ', '1/2/2015'),
      dailyRoutes.getAdjustedDailyData('TQQQ', '1/2/2015'),
      technicalRoutes.getSimpleMovingAverageData('QQQ', '1/2/2015', 200),
    ])
      .then(result => {
        let tempOne = arrayLineup(result[0], result[1]);
        let tempTwo = arrayLineup(result[0], result[2]);
        this.setState({
          apiFinished: true,
          qqqData: tempOne.returnOne,
          tqqqData: tempOne.returnTwo,
          smaData: tempTwo.returnTwo,
        })
      })
  }

  render() {
    const { apiFinished, qqqData, tqqqData, simulationResults } = this.state;
    if (!apiFinished) {
      return (<div></div>)
    }
    console.log(this.state);
    return (
      <div className="flex-container">
        <div className="flex-row">
          <div className="flex-col">
            <H2>TQQQ Experiment</H2>
          </div>
          <div className="flex-col">
            <Button onClick={this.startSimulation}>
              Start Simulation
            </Button>
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-col">
            <LineChart
              qqqData={qqqData}
              tqqqData={tqqqData}
            />
          </div>
        </div>
        <ResultsCard
          simulationResults={simulationResults}
        />
      </div>
    )
  }
}

export default TQQQExperiment;