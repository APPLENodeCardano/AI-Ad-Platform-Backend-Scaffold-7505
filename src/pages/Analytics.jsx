import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import PerformanceChart from '../components/PerformanceChart';
import ConversionFunnel from '../components/ConversionFunnel';
import GeographicHeatmap from '../components/GeographicHeatmap';
import useCampaigns from '../hooks/useCampaigns';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiDownload, FiTrendingUp, FiUsers, FiDollarSign, FiTarget, FiInfo } = FiIcons;

const Analytics = () => {
  const location = useLocation();
  const [dateRange, setDateRange] = useState('7d');
  const [focusMetric, setFocusMetric] = useState(null);
  const { campaigns } = useCampaigns();

  // Handle navigation state to highlight specific metrics
  useEffect(() => {
    if (location.state?.focusMetric) {
      setFocusMetric(location.state.focusMetric);
      // Auto-clear after 5 seconds
      const timer = setTimeout(() => {
        setFocusMetric(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // Calculate real KPIs from campaigns
  const totalImpressions = campaigns.reduce((sum, c) => sum + (c.spent * 50), 0); // Estimate impressions
  const uniqueUsers = campaigns.reduce((sum, c) => sum + (c.conversions * 15), 0); // Estimate users
  const totalRevenue = campaigns.reduce((sum, c) => sum + (c.conversions * 45), 0); // Estimate revenue
  const avgConversionRate = campaigns.length > 0 
    ? (campaigns.reduce((sum, c) => sum + (c.ctr || 0), 0) / campaigns.length).toFixed(1)
    : 0;

  const kpiCards = [
    {
      id: 'impressions',
      title: 'Total Impressions',
      value: totalImpressions > 0 ? `${(totalImpressions / 1000000).toFixed(1)}M` : '0',
      change: campaigns.length > 0 ? '+12.5%' : '0%',
      trend: 'up',
      icon: FiTrendingUp,
      highlighted: focusMetric === 'spend' // Spend relates to impressions
    },
    {
      id: 'users',
      title: 'Unique Users',
      value: uniqueUsers > 0 ? `${(uniqueUsers / 1000).toFixed(1)}K` : '0',
      change: campaigns.length > 0 ? '+8.7%' : '0%',
      trend: 'up',
      icon: FiUsers,
      highlighted: focusMetric === 'conversions'
    },
    {
      id: 'revenue',
      title: 'Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: campaigns.length > 0 ? '+15.3%' : '0%',
      trend: 'up',
      icon: FiDollarSign,
      highlighted: focusMetric === 'spend'
    },
    {
      id: 'conversion-rate',
      title: 'Conversion Rate',
      value: `${avgConversionRate}%`,
      change: campaigns.length > 0 ? '+0.4%' : '0%',
      trend: 'up',
      icon: FiTarget,
      highlighted: focusMetric === 'ctr'
    }
  ];

  // Get focus info for display
  const getFocusInfo = () => {
    const focusMessages = {
      'spend': "Viewing spend-related analytics from dashboard metrics",
      'conversions': "Viewing conversion analytics from dashboard metrics", 
      'ctr': "Viewing CTR and performance analytics from dashboard metrics"
    };
    
    if (focusMetric && focusMessages[focusMetric]) {
      return {
        message: focusMessages[focusMetric],
        color: "bg-blue-50 border-blue-200 text-blue-800"
      };
    }
    return null;
  };

  const focusInfo = getFocusInfo();

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

      {/* Focus Info Banner */}
      {focusInfo && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className={`rounded-lg p-4 border ${focusInfo.color}`}
        >
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiInfo} className="w-5 h-5" />
            <p className="text-sm font-medium">{focusInfo.message}</p>
            <button
              onClick={() => setFocusMetric(null)}
              className="ml-auto text-sm underline hover:no-underline"
            >
              Clear focus
            </button>
          </div>
        </motion.div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: kpi.highlighted ? 1.05 : 1,
              boxShadow: kpi.highlighted ? '0 10px 25px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)'
            }}
            transition={{ 
              delay: index * 0.1,
              scale: { duration: 0.3 },
              boxShadow: { duration: 0.3 }
            }}
            className={`bg-white rounded-xl shadow-sm border p-6 ${
              kpi.highlighted ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${kpi.highlighted ? 'bg-blue-100' : 'bg-primary-50'}`}>
                <SafeIcon icon={kpi.icon} className={`w-5 h-5 ${kpi.highlighted ? 'text-blue-600' : 'text-primary-600'}`} />
              </div>
              <span className={`text-sm font-medium ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
            <p className="text-sm text-gray-600">{kpi.title}</p>
            {kpi.highlighted && (
              <div className="mt-2 text-xs text-blue-600 font-medium">
                ← From Dashboard
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Data Source Info */}
      {campaigns.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiInfo} className="w-5 h-5 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Analytics data is currently showing demo values. Create campaigns to see real data.
            </p>
          </div>
        </motion.div>
      )}

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