import React from 'react';
import ReactECharts from 'echarts-for-react';

const ConversionFunnel = () => {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Conversion Funnel',
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: [
          { value: 100, name: 'Impressions', itemStyle: { color: '#0ea5e9' } },
          { value: 80, name: 'Clicks', itemStyle: { color: '#10b981' } },
          { value: 60, name: 'Visits', itemStyle: { color: '#f59e0b' } },
          { value: 40, name: 'Interest', itemStyle: { color: '#ef4444' } },
          { value: 20, name: 'Conversions', itemStyle: { color: '#8b5cf6' } }
        ]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
};

export default ConversionFunnel;