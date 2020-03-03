// Matching so that you return only arrays with same dates
export default function arrayLineup(arrOne, arrTwo) {
  let returnOne = [];
  let returnTwo = [];

  let arrOneDates = arrOne.map(x => x.date);
  let arrTwoDates = arrTwo.map(x => x.date);

  for (let a = 0; a < arrOneDates.length; a += 1) {
    if (arrTwoDates.includes(arrOneDates[a])) {
      returnOne.push(arrOne[a]);
      returnTwo.push(arrTwo[arrTwoDates.indexOf(arrOneDates[a])]);
    }
  }

  return {
    returnOne,
    returnTwo,
  };
}