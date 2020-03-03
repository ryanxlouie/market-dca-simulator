export default function candleColor(dailyDataObject) {
  if (dailyDataObject.open < dailyDataObject.close) {
    return ('green')
  }
  return ('red')
}