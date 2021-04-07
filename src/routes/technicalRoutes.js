import axios from 'axios';
import config from '../lib/config';
import keys from '../lib/keys';

// Mocks
import getBollingerBandDataQQQ from '../lib/mocks/getBollingerBandDataQQQ.json';
import getResidualStrengthIndexDataQQQ from '../lib/mocks/getResidualStrengthIndexDataQQQ.json';
import getSimpleMovingAverageDataQQQ200 from '../lib/mocks/getSimpleMovingAverageDataQQQ200.json';

export async function getBollingerBandData(ticker, startDate) {
  let result;

  if (config.routeSettings === 'Mock') {
    let res = getBollingerBandDataQQQ;
    result = res['Technical Analysis: BBANDS'];
  }
  else {
    let res = await axios.get(`https://www.alphavantage.co/query?function=BBANDS&symbol=${ticker}&interval=daily&time_period=20&series_type=close&nbdevup=2&nbdevdn=2&matype=0&apikey=${keys.avKey}`);
    // If exceed max calls return
    if (res.data.hasOwnProperty('Note')) {
      return ('Cannot call api any longer')
    }
    result = res.data['Technical Analysis: BBANDS'];
  }

  // Return an array instead of object of objects
  let dailyArray = [];
  for (let prop in result) {
    let tempProp = prop.split('-');
    let tempDate = new Date(`${tempProp[1]}/${tempProp[2]}/${tempProp[0]}`);

    let readableDate = `${tempDate.getMonth()+1}/${tempDate.getDate()}/${tempDate.getFullYear()}`;
    dailyArray.push({
      date: readableDate,
      upper: parseFloat(result[prop]['Real Upper Band']),
      middle: parseFloat(result[prop]['Real Middle Band']),
      lower: parseFloat(result[prop]['Real Lower Band']),
    });
    if (readableDate === startDate) {
      break;
    }
  }
  dailyArray.reverse();
  return (dailyArray);
}

export async function getResidualStrengthIndexData(ticker, startDate) {
  let result;
  if (config.routeSettings === 'Mock') {
    let res = getResidualStrengthIndexDataQQQ;
    result = res['Technical Analysis: RSI'];
  }
  else {
    let res = await axios.get(`https://www.alphavantage.co/query?function=RSI&symbol=${ticker}&interval=daily&time_period=14&series_type=close&apikey=${keys.avKey}`);
    // If exceed max calls return
    if (res.data.hasOwnProperty('Note')) {
      return ('Cannot call api any longer')
    }
    result = res.data['Technical Analysis: RSI'];
  }

  // Return an array instead of object of objects
  let dailyArray = [];
  for (let prop in result) {
    let tempProp = prop.split('-');
    let tempDate = new Date(`${tempProp[1]}/${tempProp[2]}/${tempProp[0]}`);

    let readableDate = `${tempDate.getMonth()+1}/${tempDate.getDate()}/${tempDate.getFullYear()}`;
    dailyArray.push({
      date: readableDate,
      rsi: parseFloat(result[prop]['RSI']),
    });
    if (readableDate === startDate) {
      break;
    }
  }
  dailyArray.reverse();
  return (dailyArray);
}

export async function getSimpleMovingAverageData(ticker, startDate, timePeriod) {
  let result;

  if (config.routeSettings === 'Mock') {
    let res = getSimpleMovingAverageDataQQQ200;
    result = res['Technical Analysis: SMA'];
  }
  else {
    let res = await axios.get(`https://www.alphavantage.co/query?function=SMA&symbol=${ticker}&interval=daily&time_period=${timePeriod}&series_type=close&apikey=${keys.avKey}`);
    // If exceed max calls return
    if (res.data.hasOwnProperty('Note')) {
      return ('Cannot call api any longer')
    }
    result = res.data['Technical Analysis: SMA'];
  }

  // Return an array instead of object of objects
  let dailyArray = [];
  for (let prop in result) {
    let tempProp = prop.split('-');
    let tempDate = new Date(`${tempProp[1]}/${tempProp[2]}/${tempProp[0]}`);

    let readableDate = `${tempDate.getMonth()+1}/${tempDate.getDate()}/${tempDate.getFullYear()}`;
    dailyArray.push({
      date: readableDate,
      sma: parseFloat(result[prop]['SMA']),
    });
    if (readableDate === startDate) {
      break;
    }
  }
  dailyArray.reverse();
  return (dailyArray);
}

export default {
  getBollingerBandData,
  getResidualStrengthIndexData,
  getSimpleMovingAverageData,
}