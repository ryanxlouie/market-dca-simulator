import React from 'react';

// Regular style sheet
import { Card, H4 } from "@blueprintjs/core";

const ResultsCard = (props) => {
  const {
    simulationResults
  } = props;
  if (Object.keys(simulationResults).length === 0) {
    return (<div></div>)
  }

  // Simple Buy results
  let simpleBuyNetWorth;
  let simpleBuyTotalSharesBought = 0;
  for (let a = 0; a < simulationResults.simpleBuyResults.buyTab.length; a += 1) {
    simpleBuyTotalSharesBought += simulationResults.simpleBuyResults.buyTab[a].sharesBought;
  }
  simpleBuyNetWorth = simpleBuyTotalSharesBought * simulationResults.simpleBuyResults.buyTab[simulationResults.simpleBuyResults.buyTab.length - 1].price;

  return (
    <div className="flex-row">
      <div className="flex-col">
        <Card>
          <H4>No Buy</H4>
          <div>
            <b>Net Worth: </b>${simulationResults.neverBuyResults.balance}
          </div>
        </Card>
      </div>
      <div className="flex-col">
        <Card>
          <H4>Simple Buy</H4>
          <div>
            <b>Net Worth: </b>${simpleBuyNetWorth.toFixed(2)}
          </div>
          <div>
            <b>Shares Bought: </b>{simpleBuyTotalSharesBought} Shares
          </div>
          <div>
            <b>Gain: </b>{((simpleBuyNetWorth - simulationResults.neverBuyResults.balance) / simulationResults.neverBuyResults.balance * 100).toFixed(2)}%
          </div>
        </Card>
      </div>
      <div className="flex-col">
        <Card>
          <H4>Leveraged Buy</H4>
          <div>
            <b>Net Worth: </b>${simulationResults.tqqqBuyResults[simulationResults.tqqqBuyResults.length - 1].worth.toFixed(2)}
          </div>
          <div>
            <b>Shares Bought: </b>{simulationResults.tqqqBuyResults[simulationResults.tqqqBuyResults.length - 1].currentShares} Shares
          </div>
          <div>
            <b>Gain: </b>{((simulationResults.tqqqBuyResults[simulationResults.tqqqBuyResults.length - 1].worth - simulationResults.neverBuyResults.balance) / simulationResults.neverBuyResults.balance * 100).toFixed(2)}%
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ResultsCard;