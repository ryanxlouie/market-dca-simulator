import React, { Component } from 'react';

// Functions
import arrayLineup from '../../lib/helpers/arrayLineup';
import simpleBuy from '../../lib/simulations/simpleBuy';
import percentageBuy from '../../lib/simulations/percentageBuy';

// Routes
import dailyRoutes from '../../routes/dailyRoutes';
import technicalRoutes from '../../routes/technicalRoutes';

// Regular style sheet
import { H2, Tab, Tabs, Card } from "@blueprintjs/core";

// Components
import LineGraph from '../components/LineGraph';
import Simulation from './components/Simulation';
import Results from './components/Results';

class ResidualStrengthIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiFinished: false,
      currentTab: 'simulation',
      dailyData: [],
      rsiData: [],
      simulationResults: {},
      simulationInput: {
        highBand: 30,
        mediumBand: 70,
        lowBand: 100,
        enableBasicBuy: true,
      }
    };

    // Form Handlers
    this.handleSwitchInput = this.handleSwitchInput.bind(this);
    this.handleNumericInputHigh = this.handleNumericInputHigh.bind(this);
    this.handleNumericInputMedium = this.handleNumericInputMedium.bind(this);
    this.handleNumericInputLow = this.handleNumericInputLow.bind(this);

    // Page Handlers
    this.handleTabChange = this.handleTabChange.bind(this);
    this.startSimulation = this.startSimulation.bind(this);
  }

  handleSwitchInput(e) {
    const { simulationInput } = this.state;
    let newSimulationInput = simulationInput;
    simulationInput[e.target.name] = e.target.checked;

    this.setState({
      simulationInput: newSimulationInput
    });
  }

  handleNumericInputHigh(value) {
    const { simulationInput } = this.state;
    let newSimulationInput = simulationInput;
    if (value > 100) {
      value = 100;
    }
    newSimulationInput.highBand = value;
    this.setState({
      simulationInput: newSimulationInput,
    });
  }
  handleNumericInputMedium(value) {
    const { simulationInput } = this.state;
    let newSimulationInput = simulationInput;
    if (value > 100) {
      value = 100;
    }
    newSimulationInput.mediumBand = value;
    this.setState({
      simulationInput: newSimulationInput,
    });
  }
  handleNumericInputLow(value) {
    const { simulationInput } = this.state;
    let newSimulationInput = simulationInput;
    if (value > 100) {
      value = 100;
    }
    newSimulationInput.lowBand = value;
    this.setState({
      simulationInput: newSimulationInput,
    });
  }

  handleTabChange(e){
    this.setState({currentTab: e})
  }

  startSimulation() {
    const { dailyData, rsiData, simulationInput } = this.state;
    let simulationResults = {};

    // Get trigger dates
    let simpleTriggerDates = [];
    let triggerDates = [];
    for (let a = 0; a < rsiData.length; a += 1) {
      if (a % 10 === 0) {
        simpleTriggerDates.push(rsiData[a].date);
        if (rsiData[a].rsi <= 30) {
          triggerDates.push({
            date: rsiData[a].date,
            percent: simulationInput.lowBand/100,
          });
        }
        if (rsiData[a].rsi > 30 && rsiData[a].rsi <= 70) {
          triggerDates.push({
            date: rsiData[a].date,
            percent: simulationInput.mediumBand/100,
          });
        }
      }
      if (rsiData[a].rsi > 70) {
        triggerDates.push({
          date: rsiData[a].date,
          percent: simulationInput.highBand/100,
        });
      }
    }

    simulationResults.neverBuyResults = simpleBuy(1000, 1000, [], dailyData);
    simulationResults.simpleBuyResults = simpleBuy(1000, 1000, simpleTriggerDates, dailyData);
    simulationResults.rsiResults = percentageBuy(1000, 1000, triggerDates, dailyData);

    this.setState({
      currentTab: 'result',
      simulationResults: simulationResults,
    });
  }

  componentDidMount() {
    Promise.all([
      dailyRoutes.getDailyData('QQQ', '1/2/2015'),
      technicalRoutes.getResidualStrengthIndexData('QQQ', '1/2/2015')
    ])
      .then(result => {
        let {returnOne, returnTwo } = arrayLineup(result[0], result[1]);
        this.setState({
          apiFinished: true,
          dailyData: returnOne,
          rsiData: returnTwo,
        });
      })
  }

  render() {
    const { apiFinished, currentTab, dailyData, rsiData, simulationResults, simulationInput } = this.state;
    if (!apiFinished) {
      return (<div></div>)
    }
    console.log(this.state);
    return (
      <div className="flex-container">
        <div className="flex-row">
          <div className="flex-col">
            <H2>Residual Strength Index</H2>
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-col">
            <LineGraph
              dailyData={dailyData}
              plotlineDates={[]}
            />
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-col">
            <Card style={{paddingTop: '7px'}}>
              <Tabs
                selectedTabId={currentTab}
                renderActiveTabPanelOnly={true}
                onChange={this.handleTabChange}
              >
                <Tab 
                  id="simulation" 
                  title="Simulation" 
                  panel={
                    <Simulation
                      simulationInput={simulationInput}
                      handleSwitchInput={this.handleSwitchInput}
                      handleNumericInputHigh={this.handleNumericInputHigh}
                      handleNumericInputMedium={this.handleNumericInputMedium}
                      handleNumericInputLow={this.handleNumericInputLow}
                      startSimulation={this.startSimulation}
                    />
                  } 
                />
                <Tab 
                  id="result" 
                  title="Result" 
                  disabled={(Object.keys(simulationResults).length === 0) ? true : false} 
                  panel={
                    <Results
                      dailyDataObject={dailyData[dailyData.length - 1]}
                      simulationResults={simulationResults}
                    />
                  } 
                />
                <Tab 
                  id="table" 
                  title="Table"
                  disabled={(Object.keys(simulationResults).length === 0) ? true : false} 
                  panel={<div>table</div>}
                />
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default ResidualStrengthIndex;