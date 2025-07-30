import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiActivity, FiTrendingUp, FiTrendingDown, FiTarget, FiDollarSign } = FiIcons;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'campaign_started',
      message: 'Downtown Coffee Shop campaign started',
      time: '2 hours ago',
      icon: FiTarget,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 2,
      type: 'budget_alert',
      message: 'Tech Conference Promo reached 80% budget',
      time: '4 hours ago',
      icon: FiDollarSign,
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 3,
      type: 'performance_up',
      message: 'Retail Store Launch CTR increased by 15%',
      time: '6 hours ago',
      icon: FiTrendingUp,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 4,
      type: 'geofence_completed',
      message: 'Shopping Mall geofence completed',
      time: '1 day ago',
      icon: FiActivity,
      color: 'text-gray-600 bg-gray-50'
    },
    {
      id: 5,
      type: 'performance_down',
      message: 'Weekend Campaign conversion rate dropped',
      time: '2 days ago',
      icon: FiTrendingDown,
      color: 'text-red-600 bg-red-50'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <SafeIcon icon={FiActivity} className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${activity.color}`}>
              <SafeIcon icon={activity.icon} className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {activity.message}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;