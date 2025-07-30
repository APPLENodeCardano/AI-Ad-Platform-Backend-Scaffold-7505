import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';

const MetricCard = ({ title, value, change, icon, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-r ${color} rounded-xl p-6 text-white relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
        <SafeIcon icon={icon} className="w-full h-full" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <SafeIcon icon={icon} className="w-5 h-5" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-1">{value}</h3>
        <p className="text-sm opacity-90">{title}</p>
        <p className="text-xs mt-2 opacity-75">{change}</p>
      </div>
    </motion.div>
  );
};

export default MetricCard;