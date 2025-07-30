import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import MetricCard from '../components/MetricCard';
import CampaignOverview from '../components/CampaignOverview';
import RecentActivity from '../components/RecentActivity';
import useCampaigns from '../hooks/useCampaigns';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiDollarSign, FiUsers, FiTarget, FiPlus } = FiIcons;

const Dashboard = () => {
  const navigate = useNavigate();
  const { campaigns } = useCampaigns();

  // Calculate real metrics from campaigns
  const activeCampaigns = campaigns.filter(c => c.status === 'ACTIVE').length;
  const totalSpend = campaigns.reduce((sum, c) => sum + (c.spent || 0), 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0);
  const avgCTR = campaigns.length > 0 
    ? (campaigns.reduce((sum, c) => sum + (c.ctr || 0), 0) / campaigns.length).toFixed(1)
    : 0;

  const metrics = [
    {
      title: 'Active Campaigns',
      value: activeCampaigns.toString(),
      change: `${campaigns.length} total campaigns`,
      icon: FiTarget,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Spend',
      value: `$${totalSpend.toLocaleString()}`,
      change: `${campaigns.length} campaigns running`,
      icon: FiDollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Conversions',
      value: totalConversions.toLocaleString(),
      change: `Across ${campaigns.length} campaigns`,
      icon: FiUsers,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Avg CTR',
      value: `${avgCTR}%`,
      change: campaigns.length > 0 ? 'Average performance' : 'No data yet',
      icon: FiTrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  console.log('Dashboard rendering with campaigns:', campaigns.length);

  const handleStartCampaign = (e) => {
    e.preventDefault();
    console.log('Starting campaign from Dashboard');
    navigate('/campaigns/create');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Monitor your AI-powered ad campaigns ({campaigns.length} total)
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/campaigns/create')}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
            New Campaign
          </button>
          <button
            onClick={handleStartCampaign}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
          >
            <SafeIcon icon={FiTarget} className="w-4 h-4 mr-2" />
            Start Campaign
          </button>
        </div>
      </div>

      {/* Quick Start Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {campaigns.length === 0 
                ? 'Welcome! Ready to create your first campaign?' 
                : 'Ready to launch your next campaign?'
              }
            </h3>
            <p className="text-gray-600 text-sm">
              {campaigns.length === 0
                ? 'Get started with AI-powered geofenced advertising in minutes.'
                : 'Create targeted geofenced campaigns with AI-powered optimization in minutes.'
              }
            </p>
          </div>
          <button
            onClick={handleStartCampaign}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
          >
            <SafeIcon icon={FiTarget} className="w-5 h-5 mr-2" />
            {campaigns.length === 0 ? 'Create First Campaign' : 'Start Campaign'}
          </button>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaign Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <CampaignOverview />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <RecentActivity />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;