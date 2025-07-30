import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMoreVertical, FiEdit, FiPlay, FiPause, FiTrash2 } = FiIcons;

const CampaignCard = ({ campaign }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'DONE': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500';
      case 'PENDING': return 'bg-yellow-500';
      case 'DONE': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const spendPercentage = (campaign.spent / campaign.budget) * 100;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="campaign-card bg-white rounded-xl p-6 shadow-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {campaign.name}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
          <SafeIcon icon={FiMoreVertical} className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Budget Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Budget Progress</span>
            <span className="font-medium">${campaign.spent} / ${campaign.budget}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getProgressColor(campaign.status)}`}
              style={{ width: `${Math.min(spendPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Conversions</p>
            <p className="text-xl font-bold text-gray-900">{campaign.conversions}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">CTR</p>
            <p className="text-xl font-bold text-gray-900">{campaign.ctr}%</p>
          </div>
        </div>

        {/* Geofences */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Geofences</span>
          <span className="font-medium">{campaign.geofences}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-primary-600 rounded-lg transition-colors">
              <SafeIcon icon={FiEdit} className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg transition-colors">
              <SafeIcon icon={campaign.status === 'ACTIVE' ? FiPause : FiPlay} className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors">
              <SafeIcon icon={FiTrash2} className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs text-gray-500">
            Created {new Date(campaign.created).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignCard;