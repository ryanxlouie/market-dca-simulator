export default function percentageBuy(initialBalance, balanceIncrease, triggerDates, dailyData) {
  let buyTab = [];
  let balance = initialBalance;

  let triggerDatesArray = triggerDates.map(x => x.date);

  for (let a = 0; a < dailyData.length; a += 1) {
    // Add 1000 every 10 days
    if (a % 10 === 0) {
      balance += balanceIncrease;
    }
    // Buy if trigger
    if (triggerDatesArray.includes(dailyData[a].date)) {
      let index = triggerDatesArray.indexOf(dailyData[a].date);

      let sharesBought = Math.floor((balance * triggerDates[index].percent) / dailyData[a].close);
      balance -= sharesBought * dailyData[a].close;

      buyTab.push({
        date: dailyData[a].date,
        sharesBought,
        price: dailyData[a].close,
        balance,
      });
    }
  }

  return {
    buyTab,
    balance,
    triggerDates: triggerDatesArray,
  }
}