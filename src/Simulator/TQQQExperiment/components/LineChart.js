import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChart = (props) => {
  const {
    qqqData,
    tqqqData,
    // triggerDates
  } = props;
  
  let xAxis = qqqData.map(a => a['date']);

  // let xAxisPlotLines = [];
  // for (let a = 0; a < triggerDates.length; a += 1) {
  //   xAxisPlotLines.push({
  //     color: '#FF0000',
  //     width: 2,
  //     value: xAxis.indexOf(triggerDates[a])
  //   });
  // }

  const options = {
    title: {
      text: ''
    },
    xAxis: {
      categories: xAxis,
      // plotLines: xAxisPlotLines,
    },
    yAxis: {
      title: {
        text: 'Open Value'
      }
    },
    series: [
      {
        name: 'QQQ',
        data: qqqData.map(a => a['close']),
      },
      {
        name: 'TQQQ',
        data: tqqqData.map(a => a['adjustedClose']),
      },
    ],
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    }
  };
  
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}

export default LineChart;