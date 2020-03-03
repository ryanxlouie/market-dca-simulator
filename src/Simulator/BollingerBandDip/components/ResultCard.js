import React from 'react';

// Regular style sheet
import { Card, H4 } from "@blueprintjs/core";

const ResultCard = (props) => {
  const {
    dailyDataObject,
    simulationResults,
  } = props;

  // Simple Results
  let totalBoughtSimple = 0;
  let averagePriceSimple = 0;
  for (let a = 0; a < simulationResults.simpleBuyResults.buyTab.length; a += 1) {
    totalBoughtSimple += simulationResults.simpleBuyResults.buyTab[a].sharesBought;
    averagePriceSimple += simulationResults.simpleBuyResults.buyTab[a].sharesBought * simulationResults.simpleBuyResults.buyTab[a].price;
  }
  averagePriceSimple = (averagePriceSimple / totalBoughtSimple).toFixed(2);
  let netValueSimple = ((totalBoughtSimple * dailyDataObject.close) + simulationResults.simpleBuyResults.balance).toFixed(2);
  let gainSimple = (100 * (netValueSimple - simulationResults.neverBuyResults.balance) / simulationResults.neverBuyResults.balance).toFixed(2)

  let totalBought = 0;
  let averagePrice = 0;
  for (let a = 0; a < simulationResults.bbandDipResults.buyTab.length; a += 1) {
    totalBought += simulationResults.bbandDipResults.buyTab[a].sharesBought;
    averagePrice += simulationResults.bbandDipResults.buyTab[a].sharesBought * simulationResults.bbandDipResults.buyTab[a].price;
  }
  averagePrice = (averagePrice / totalBought).toFixed(2);
  let netValue = ((totalBought * dailyDataObject.close) + simulationResults.bbandDipResults.balance).toFixed(2);
  let gain = (100 * (netValue - simulationResults.neverBuyResults.balance) / simulationResults.neverBuyResults.balance).toFixed(2)

  return (
    <div>
      <Card>
        <div className="flex-row">
          <div className="flex-col">
            <Card>
              <div className="flex-row">
                <div className="flex-col">
                  <H4>Never Buy</H4>
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Total Bought:</b> 0 Shares
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Average Price:</b> $n/a
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Current Balance:</b> ${(simulationResults.neverBuyResults.balance).toFixed(2)}
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Net Value:</b> ${(simulationResults.neverBuyResults.balance).toFixed(2)}
                </div>
              </div>
            </Card>
          </div>
          <div className="flex-col">
            <Card>
              <div className="flex-row">
                <div className="flex-col">
                  <H4>Basic Buy</H4>
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Total Bought:</b> {totalBoughtSimple} Shares
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Average Price:</b> ${averagePriceSimple}
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Current Balance:</b> ${(simulationResults.simpleBuyResults.balance).toFixed(2)}
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Net Value:</b> ${netValueSimple}
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Gain:</b> {gainSimple}%
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
                  <b>Total Bought:</b> {totalBought} Shares
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Average Price:</b> ${averagePrice}
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Current Balance:</b> ${(simulationResults.bbandDipResults.balance).toFixed(2)}
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Net Value:</b> ${netValue}
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col">
                  <b>Gain:</b> {gain}%
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