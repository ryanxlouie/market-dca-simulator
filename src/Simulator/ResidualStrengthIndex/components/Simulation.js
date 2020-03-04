import React from 'react';

// Regular style sheet
import { Button, H5 } from "@blueprintjs/core";

// Components
import BuyBands from './BuyBands';
import EnableComparisonsCard from '../../components/EnableComparisonsCard';

const Simulation = (props) => {
  const {
    simulationInput,
    handleSwitchInput,
    handleNumericInputHigh,
    handleNumericInputMedium,
    handleNumericInputLow,
    startSimulation,
  } = props;

  return (
    <div>
      <div className="flex-row">
        <div className="flex-col">
          <BuyBands
            simulationInput={simulationInput}
            handleNumericInputHigh={handleNumericInputHigh}
            handleNumericInputMedium={handleNumericInputMedium}
            handleNumericInputLow={handleNumericInputLow}
          />
        </div>
        <div className="flex-col" style={{borderLeft: 'solid 1px'}}>
          <H5>Starting Input</H5>
        </div>
        <div className="flex-col" style={{borderLeft: 'solid 1px'}}>
          <EnableComparisonsCard
            simulationInput={simulationInput}
            handleSwitchInput={handleSwitchInput}
          />
        </div>
      </div>
      <div className="flex-row">
        <div className="flex-col">
          <Button
            onClick={startSimulation}
          >
            Start Simulation
          </Button>
        </div>
      </div>
    </div>

  )
}

export default Simulation;