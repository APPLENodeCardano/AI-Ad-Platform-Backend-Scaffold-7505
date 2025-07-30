import React from 'react';
import ReactECharts from 'echarts-for-react';

const PerformanceChart = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['CTR', 'Conversion Rate', 'ROAS'],
      top: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: 'CTR',
        type: 'line',
        data: [2.8, 3.1, 3.4, 3.2],
        smooth: true,
        itemStyle: {
          color: '#0ea5e9'
        }
      },
      {
        name: 'Conversion Rate',
        type: 'line',
        data: [1.2, 1.5, 1.8, 1.6],
        smooth: true,
        itemStyle: {
          color: '#10b981'
        }
      },
      {
        name: 'ROAS',
        type: 'line',
        data: [180, 220, 280, 250],
        smooth: true,
        itemStyle: {
          color: '#f59e0b'
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
};

export default PerformanceChart;