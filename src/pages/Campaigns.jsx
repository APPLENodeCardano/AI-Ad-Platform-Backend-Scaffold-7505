import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import CampaignCard from '../components/CampaignCard';
import useCampaigns from '../hooks/useCampaigns';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiSearch, FiFilter } = FiIcons;

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { campaigns } = useCampaigns();

  console.log('Campaigns page rendering with campaigns:', campaigns);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600 mt-1">
            Manage your AI-powered advertising campaigns ({campaigns.length} total)
          </p>
        </div>
        <Link
          to="/campaigns/create"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
          New Campaign
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiFilter} className="text-gray-400 w-5 h-5" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="DONE">Completed</option>
          </select>
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CampaignCard campaign={campaign} />
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filteredCampaigns.length === 0 && campaigns.length > 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No campaigns found</div>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* No campaigns at all */}
      {campaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No campaigns yet</div>
          <p className="text-gray-500 mt-2 mb-4">Create your first AI-powered campaign to get started</p>
          <Link
            to="/campaigns/create"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
            Create Your First Campaign
          </Link>
        </div>
      )}
    </div>
  );
};

export default Campaigns;