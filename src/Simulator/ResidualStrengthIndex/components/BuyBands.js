import React from 'react';

// Regular style sheet
import { H5, FormGroup, NumericInput } from "@blueprintjs/core";

const BuyBands = (props) => {
  const {
    simulationInput,
    handleNumericInputHigh,
    handleNumericInputMedium,
    handleNumericInputLow,
  } = props;

  return (
    <div>
      <H5>Buy Bands</H5>
      <div className="flex-row">
        <div className="flex-col">
          <FormGroup
            label="70 - 100"
            style={{margin: '0px'}}
          >
            <NumericInput
              allowNumericCharactersOnly
              max={100}
              min={0}
              leftIcon="percentage"
              value={simulationInput.highBand}
              onValueChange={handleNumericInputHigh}
            />
          </FormGroup>
        </div>
      </div>
      <div className="flex-row">
        <div className="flex-col">
          <FormGroup
            label="30 - 70"
            style={{margin: '0px'}}
          >
            <NumericInput
              allowNumericCharactersOnly
              max={100}
              min={0}
              leftIcon="percentage"
              value={simulationInput.mediumBand}
              onValueChange={handleNumericInputMedium}
            />
          </FormGroup>
        </div>
      </div>
      <div className="flex-row">
        <div className="flex-col">
          <FormGroup
            label="0 - 30"
            style={{margin: '0px'}}
          >
            <NumericInput
              allowNumericCharactersOnly
              max={100}
              min={0}
              leftIcon="percentage"
              value={simulationInput.lowBand}
              onValueChange={handleNumericInputLow}
            />
          </FormGroup>
        </div>
      </div>
    </div>
  )
}

export default BuyBands;