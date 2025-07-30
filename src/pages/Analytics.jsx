import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import PerformanceChart from '../components/PerformanceChart';
import ConversionFunnel from '../components/ConversionFunnel';
import GeographicHeatmap from '../components/GeographicHeatmap';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiDownload, FiTrendingUp, FiUsers, FiDollarSign, FiTarget } = FiIcons;

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d');

  const kpiCards = [
    {
      title: 'Total Impressions',
      value: '2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: FiTrendingUp
    },
    {
      title: 'Unique Users',
      value: '48.2K',
      change: '+8.7%',
      trend: 'up',
      icon: FiUsers
    },
    {
      title: 'Revenue',
      value: '$126.4K',
      change: '+15.3%',
      trend: 'up',
      icon: FiDollarSign
    },
    {
      title: 'Conversion Rate',
      value: '3.8%',
      change: '+0.4%',
      trend: 'up',
      icon: FiTarget
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Deep insights into your campaign performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary-50 rounded-lg">
                <SafeIcon icon={kpi.icon} className="w-5 h-5 text-primary-600" />
              </div>
              <span className={`text-sm font-medium ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
            <p className="text-sm text-gray-600">{kpi.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
          <PerformanceChart />
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
          <ConversionFunnel />
        </motion.div>
      </div>

      {/* Geographic Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Performance</h3>
        <GeographicHeatmap />
      </motion.div>
    </div>
  );
};

export default Analytics;