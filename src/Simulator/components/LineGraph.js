import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineGraph = (props) => {
  const {
    dailyData,
    plotlineDates,
  } = props;

  let xAxis = dailyData.map(a => a['date']);

  let xAxisPlotLines = [];
  for (let a = 0; a < plotlineDates.length; a += 1) {
    xAxisPlotLines.push({
      color: '#FF0000',
      width: 2,
      value: xAxis.indexOf(plotlineDates[a])
    });
  }

  const options = {
    title: {
      text: ''
    },
    xAxis: {
      categories: xAxis,
      plotLines: xAxisPlotLines,
    },
    yAxis: {
      title: {
        text: 'Open Value'
      }
    },
    series: [{
      name: 'Open',
      data: dailyData.map(a => a['open']),
    }],
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

export default LineGraph;