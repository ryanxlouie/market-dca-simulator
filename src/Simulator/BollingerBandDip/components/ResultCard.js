import React from 'react';

// Regular style sheet
import { Card, Callout, H4 } from "@blueprintjs/core";

const ResultCard = (props) => {
  const {
    simulationResults,
  } = props;

  if (Object.keys(simulationResults).length === 0) {
    return (
      <div>
        <Card>
          <Callout
            intent="primary"
            title="Use the settings on the left to start a simulation."
          />
        </Card>
      </div>
    )
  }
  let totalBoughtSimple = 0;
  let averagePriceSimple = 0;
  for (let a = 0; a < simulationResults.simpleBuyTab.length; a += 1) {
    totalBoughtSimple += simulationResults.simpleBuyTab[a].sharesBought;
    averagePriceSimple += simulationResults.simpleBuyTab[a].sharesBought * simulationResults.simpleBuyTab[a].price;
  }
  averagePriceSimple = averagePriceSimple / totalBoughtSimple;

  let totalBought = 0;
  let averagePrice = 0;
  for (let a = 0; a < simulationResults.buyTab.length; a += 1) {
    totalBought += simulationResults.buyTab[a].sharesBought;
    averagePrice += simulationResults.buyTab[a].sharesBought * simulationResults.buyTab[a].price;
  }
  averagePrice = averagePrice / totalBought;

  return (
    <div>
      <Card>
        <div className="flex-row">
          <div className="flex-col">
            <Card>
              <div className="flex-row">
                <div className="flex-col">
                  <H4>Basic Buy</H4>
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Total Bought:</b> {totalBoughtSimple}
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Average Price:</b> {averagePriceSimple}
                </div>
              </div>
            </Card>
          </div>
          <div className="flex-col">
            <Card>
              <div className="flex-row">
                <div className="flex-col">
                  <H4>BBand Dip</H4>
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Total Bought:</b> {totalBought}
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Average Price:</b> {averagePrice}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ResultCard;