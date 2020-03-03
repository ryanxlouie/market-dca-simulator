// Candle crosses the lower bband
export function candleCrossLower(dailyDataObject, bbandDataObject) {
  if (dailyDataObject.low < bbandDataObject.lower
    && dailyDataObject.high > bbandDataObject.lower
  ) {
    return (true)
  }
  return (false)
}

export function candleBelowLower(dailyDataObject, bbandDataObject) {
  if (dailyDataObject.low < bbandDataObject.lower
    && dailyDataObject.high < bbandDataObject.lower
  ) {
    return (true)
  }
  return (false)
}

export default {
  candleCrossLower,
  candleBelowLower,
}