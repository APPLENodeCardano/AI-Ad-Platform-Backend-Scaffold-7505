import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import GeofenceMap from '../components/GeofenceMap';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiEdit, FiTrash2, FiPlay, FiPause, FiSearch, FiMapPin } = FiIcons;

const GeofenceManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGeofence, setSelectedGeofence] = useState(null);
  const [mapGeofences, setMapGeofences] = useState([]);

  // Mock geofence data
  const geofences = [
    {
      id: '1',
      name: 'Downtown District',
      status: 'ACTIVE',
      priority: 10,
      budget: 2000,
      spent: 1240,
      clicks: 156,
      conversions: 23,
      campaign: 'Downtown Coffee Shop',
      coordinates: [
        [37.7849, -122.4194],
        [37.7849, -122.4094],
        [37.7749, -122.4094],
        [37.7749, -122.4194]
      ]
    },
    {
      id: '2',
      name: 'Tech Hub Area',
      status: 'PENDING',
      priority: 8,
      budget: 3000,
      spent: 0,
      clicks: 0,
      conversions: 0,
      campaign: 'Tech Conference Promo',
      coordinates: [
        [37.7949, -122.4294],
        [37.7949, -122.4194],
        [37.7849, -122.4194],
        [37.7849, -122.4294]
      ]
    },
    {
      id: '3',
      name: 'Shopping Mall',
      status: 'DONE',
      priority: 5,
      budget: 1500,
      spent: 1500,
      clicks: 89,
      conversions: 12,
      campaign: 'Retail Store Launch',
      coordinates: [
        [37.7649, -122.4194],
        [37.7649, -122.4094],
        [37.7549, -122.4094],
        [37.7549, -122.4194]
      ]
    }
  ];

  const filteredGeofences = geofences.filter(geofence =>
    geofence.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'DONE': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Convert existing geofences to map format
  const existingMapGeofences = geofences.map(geofence => ({
    id: geofence.id,
    coordinates: geofence.coordinates,
    name: geofence.name,
    color: geofence.status === 'ACTIVE' ? '#10b981' : 
           geofence.status === 'PENDING' ? '#f59e0b' : '#6b7280'
  }));

  const handleGeofenceMapChange = (newGeofences) => {
    setMapGeofences(newGeofences);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Geofence Manager</h1>
          <p className="text-gray-600 mt-1">Manage and monitor your geographic targeting zones</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all">
          <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
          New Geofence
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geofence List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search geofences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Geofence Cards */}
          <div className="space-y-3">
            {filteredGeofences.map((geofence, index) => (
              <motion.div
                key={geofence.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-lg border p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedGeofence?.id === geofence.id ? 'border-primary-500 shadow-md' : 'border-gray-200'
                }`}
                onClick={() => setSelectedGeofence(geofence)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2 text-gray-400" />
                    {geofence.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(geofence.status)}`}>
                    {geofence.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{geofence.campaign}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Spent:</span>
                    <span className="font-medium ml-1">${geofence.spent}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Clicks:</span>
                    <span className="font-medium ml-1">{geofence.clicks}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-primary-600 rounded">
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                      <SafeIcon icon={FiPlay} className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Priority: {geofence.priority}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Geofence Map</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Active
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  Pending
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                  Done
                </div>
              </div>
            </div>
            <GeofenceMap 
              onGeofenceChange={handleGeofenceMapChange}
              existingGeofences={existingMapGeofences}
            />
          </motion.div>

          {/* Details Panel */}
          {selectedGeofence && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedGeofence.name} Details
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100">
                    <SafeIcon icon={FiEdit} className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button className="flex items-center px-3 py-1 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                    <SafeIcon icon={FiPlay} className="w-4 h-4 mr-1" />
                    Activate
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Campaign
                    </label>
                    <p className="text-sm text-gray-900">{selectedGeofence.campaign}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority Weight
                    </label>
                    <p className="text-sm text-gray-900">{selectedGeofence.priority}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coordinates
                    </label>
                    <p className="text-xs text-gray-500">
                      {selectedGeofence.coordinates.length} points
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget / Spent
                    </label>
                    <p className="text-sm text-gray-900">
                      ${selectedGeofence.spent} / ${selectedGeofence.budget}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${(selectedGeofence.spent / selectedGeofence.budget) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Clicks
                    </label>
                    <p className="text-sm text-gray-900">{selectedGeofence.clicks}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Conversions
                    </label>
                    <p className="text-sm text-gray-900">{selectedGeofence.conversions}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Conversion Rate
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedGeofence.clicks > 0 
                        ? ((selectedGeofence.conversions / selectedGeofence.clicks) * 100).toFixed(1)
                        : '0'
                      }%
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeofenceManager;