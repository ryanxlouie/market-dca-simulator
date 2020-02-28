import React, { Component } from 'react';

// Routes
import dailyRoutes from '../../routes/dailyRoutes';

class BollingerBandDip extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    dailyRoutes.getDailyData('QQQ')
      .then(result => {
        console.log(result)
      })
  }

  render() {
    // console.log(yargs.argv)
    return (
      <div className="flex-container">
        BBand Dip
      </div>
    )
  }
}

export default BollingerBandDip;