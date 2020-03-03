import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChart = (props) => {
  const {
    dailyData,
    simulationResults,
  } = props;
  
  let xAxis = dailyData.map(a => a['date']);

  let xAxisPlotLines = [];
  if (simulationResults.hasOwnProperty('triggerDates')) {
    for (let a = 0; a < simulationResults['triggerDates'].length; a += 1) {
      xAxisPlotLines.push({
        color: '#FF0000',
        width: 2,
        value: xAxis.indexOf(simulationResults['triggerDates'][a])
      });
    }
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

export default LineChart;