import axios from 'axios';
import config from '../lib/config';
import keys from '../lib/keys';
import getDailyDataQQQ from '../lib/mocks/getDailyDataQQQ.json';

export async function getDailyData(ticker, startDate) {
  let result;

  if (config.routeSettings === 'Mock') {
    let res = getDailyDataQQQ;
    result = res['Time Series (Daily)'];
  }
  else {
    let res = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${keys.avKey}`);
  
    // If exceed max calls return
    if (res.data.hasOwnProperty('Note')) {
      return ('Cannot call api any longer')
    }
    result = res.data['Time Series (Daily)'];
  }

  // Return an array instead of object of objects
  let dailyArray = [];
  for (let prop in result) {
    let tempProp = prop.split('-');
    let tempDate = new Date(`${tempProp[1]}/${tempProp[2]}/${tempProp[0]}`);

    let readableDate = `${tempDate.getMonth()+1}/${tempDate.getDate()}/${tempDate.getFullYear()}`;
    dailyArray.push({
      date: readableDate,
      open: parseFloat(result[prop]['1. open']),
      high: parseFloat(result[prop]['2. high']),
      low: parseFloat(result[prop]['3. low']),
      close: parseFloat(result[prop]['4. close']),
      volume: parseFloat(result[prop]['5. volume']),
    });
    if (readableDate === startDate) {
      break;
    }
  }
  dailyArray.reverse()
  return (dailyArray);
}

export default {
  getDailyData,
}