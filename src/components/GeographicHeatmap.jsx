import React from 'react';
import ReactECharts from 'echarts-for-react';

const GeographicHeatmap = () => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    visualMap: {
      min: 0,
      max: 1000,
      left: 'left',
      top: 'bottom',
      text: ['High', 'Low'],
      calculable: true,
      inRange: {
        color: ['#e0f2fe', '#0ea5e9', '#0369a1']
      }
    },
    series: [
      {
        name: 'Campaign Performance',
        type: 'map',
        mapType: 'world',
        roam: true,
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
          { name: 'United States', value: 850 },
          { name: 'Canada', value: 320 },
          { name: 'United Kingdom', value: 280 },
          { name: 'Germany', value: 190 },
          { name: 'France', value: 150 },
          { name: 'Australia', value: 120 },
          { name: 'Japan', value: 90 },
          { name: 'Brazil', value: 70 }
        ]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
};

export default GeographicHeatmap;