import React from 'react';

// Regular style sheet
import { H5, Switch } from "@blueprintjs/core";

const EnableComparisonsCard = (props) => {
  const {
    simulationInput,
    handleSwitchInput,
  } = props;

  return (
    <div>
      <H5>Enable Comparisons</H5>
      <div className="flex-row">
        <div className="flex-col">
          <Switch
            name="enableBasicBuy"
            checked={simulationInput.enableBasicBuy}
            onChange={handleSwitchInput}
          >
            Enable Basic Buy
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default EnableComparisonsCard;