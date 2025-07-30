import React from 'react';
import ReactECharts from 'echarts-for-react';

const CampaignOverview = () => {
  const option = {
    title: {
      text: 'Campaign Performance',
      left: 'left',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Impressions', 'Clicks', 'Conversions'],
      top: 40
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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: [
      {
        type: 'value',
        name: 'Count',
        position: 'left'
      }
    ],
    series: [
      {
        name: 'Impressions',
        type: 'bar',
        data: [12000, 15000, 18000, 14000, 16000, 13000, 17000],
        itemStyle: {
          color: '#0ea5e9'
        }
      },
      {
        name: 'Clicks',
        type: 'line',
        data: [480, 600, 720, 560, 640, 520, 680],
        itemStyle: {
          color: '#10b981'
        },
        smooth: true
      },
      {
        name: 'Conversions',
        type: 'line',
        data: [24, 30, 36, 28, 32, 26, 34],
        itemStyle: {
          color: '#f59e0b'
        },
        smooth: true
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  );
};

export default CampaignOverview;