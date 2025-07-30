import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import GeofenceMap from '../components/GeofenceMap';
import useCampaigns from '../hooks/useCampaigns';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiArrowLeft, FiPlus, FiTrash2, FiMapPin, FiCheck, FiCheckCircle } = FiIcons;

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { addCampaign } = useCampaigns();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [campaignData, setCampaignData] = useState({
    name: '',
    budget: '',
    geofences: []
  });

  // Add detailed logging for debugging
  useEffect(() => {
    console.log('CreateCampaign component mounted');
    console.log('Current route:', window.location.pathname);
    console.log('Current hash:', window.location.hash);
    return () => {
      console.log('CreateCampaign component unmounted');
    };
  }, []);

  const handleGeofenceChange = (geofences) => {
    console.log('Geofences updated:', geofences);
    setCampaignData(prev => ({
      ...prev,
      geofences: geofences.map(geofence => ({
        id: geofence.id,
        polygon_geojson: {
          type: 'Polygon',
          coordinates: [geofence.coordinates.map(coord => [coord[1], coord[0]])] // Convert lat,lng to lng,lat for GeoJSON
        },
        priority_weight: 0,
        budget_cap_cents: 0,
        click_quorum: 0,
        name: geofence.name
      }))
    }));
  };

  const updateGeofenceSettings = (geofenceId, field, value) => {
    setCampaignData(prev => ({
      ...prev,
      geofences: prev.geofences.map(geofence =>
        geofence.id === geofenceId
          ? {
              ...geofence,
              [field]: field.includes('cents') ? parseInt(value) * 100 : parseInt(value)
            }
          : geofence
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!campaignData.name.trim()) {
      alert('Please enter a campaign name.');
      return;
    }

    if (!campaignData.budget || parseFloat(campaignData.budget) <= 0) {
      alert('Please enter a valid budget amount.');
      return;
    }

    // Validate that we have at least one geofence
    if (campaignData.geofences.length === 0) {
      alert('Please create at least one geofence for your campaign.');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Creating campaign:', campaignData);
      
      // Add campaign using the hook
      const newCampaign = addCampaign(campaignData);
      console.log('Campaign created successfully:', newCampaign);

      // Show success state
      setShowSuccess(true);

      // Wait a moment to show success, then navigate
      setTimeout(() => {
        navigate('/campaigns');
      }, 1500);

    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Error creating campaign. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/campaigns');
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Success state
  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiCheckCircle} className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaign Created!</h2>
          <p className="text-gray-600 mb-4">
            Your campaign "{campaignData.name}" has been created successfully with {campaignData.geofences.length} geofence{campaignData.geofences.length !== 1 ? 's' : ''}.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting to campaigns page...
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Campaign</h1>
            <p className="text-gray-600 mt-1">Set up a new AI-powered ad campaign with geofencing</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <SafeIcon icon={FiCheck} className="w-4 h-4" />
          <span>Ready to launch</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                value={campaignData.name}
                onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter campaign name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Budget ($) *
              </label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={campaignData.budget}
                onChange={(e) => setCampaignData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter budget amount"
                required
              />
            </div>
          </div>
        </motion.div>

        {/* Geofence Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Geofence Targeting</h2>
              <p className="text-gray-600 mt-1">Draw geographic boundaries where your ads will be shown</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <SafeIcon icon={FiMapPin} className="w-4 h-4" />
              <span>{campaignData.geofences.length} geofence{campaignData.geofences.length !== 1 ? 's' : ''} created</span>
            </div>
          </div>
          <GeofenceMap onGeofenceChange={handleGeofenceChange} />
        </motion.div>

        {/* Geofence Settings */}
        {campaignData.geofences.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Geofence Settings</h2>
            <div className="space-y-6">
              {campaignData.geofences.map((geofence, index) => (
                <div key={geofence.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
                      {geofence.name || `Geofence ${index + 1}`}
                    </h3>
                    <div className="text-xs text-gray-500">
                      ID: {geofence.id}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority Weight
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={geofence.priority_weight}
                        onChange={(e) => updateGeofenceSettings(geofence.id, 'priority_weight', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">Higher priority = more likely to be shown</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget Cap ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={geofence.budget_cap_cents / 100}
                        onChange={(e) => updateGeofenceSettings(geofence.id, 'budget_cap_cents', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Maximum spend for this geofence</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Click Quorum
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={geofence.click_quorum}
                        onChange={(e) => updateGeofenceSettings(geofence.id, 'click_quorum', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum clicks before moving to next geofence</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={campaignData.geofences.length === 0 || isLoading || !campaignData.name.trim() || !campaignData.budget}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <SafeIcon icon={FiSave} className="w-4 h-4 mr-2" />
                Create Campaign
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;