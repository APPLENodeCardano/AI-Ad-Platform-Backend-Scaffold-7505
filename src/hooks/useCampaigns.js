import { useState, useEffect } from 'react';

// Simple localStorage-based state management for campaigns
const CAMPAIGNS_STORAGE_KEY = 'ai-ad-sniper-campaigns';

// Default mock campaigns
const defaultCampaigns = [
  {
    id: '1',
    name: 'Downtown Coffee Shop',
    status: 'ACTIVE',
    budget: 5000,
    spent: 3200,
    conversions: 45,
    ctr: 3.2,
    geofences: 3,
    created: '2024-01-15'
  },
  {
    id: '2',
    name: 'Tech Conference Promo',
    status: 'PENDING',
    budget: 8000,
    spent: 0,
    conversions: 0,
    ctr: 0,
    geofences: 5,
    created: '2024-01-20'
  },
  {
    id: '3',
    name: 'Retail Store Launch',
    status: 'DONE',
    budget: 3000,
    spent: 3000,
    conversions: 78,
    ctr: 4.1,
    geofences: 2,
    created: '2024-01-10'
  }
];

const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState(() => {
    try {
      const stored = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultCampaigns;
    } catch (error) {
      console.error('Error loading campaigns from localStorage:', error);
      return defaultCampaigns;
    }
  });

  // Save to localStorage whenever campaigns change
  useEffect(() => {
    try {
      localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(campaigns));
    } catch (error) {
      console.error('Error saving campaigns to localStorage:', error);
    }
  }, [campaigns]);

  const addCampaign = (campaignData) => {
    const newCampaign = {
      id: Date.now().toString(),
      name: campaignData.name,
      status: 'PENDING', // New campaigns start as pending
      budget: parseFloat(campaignData.budget),
      spent: 0,
      conversions: 0,
      ctr: 0,
      geofences: campaignData.geofences.length,
      created: new Date().toISOString().split('T')[0],
      geofenceData: campaignData.geofences // Store the full geofence data
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    return newCampaign;
  };

  const updateCampaign = (campaignId, updates) => {
    setCampaigns(prev =>
      prev.map(campaign =>
        campaign.id === campaignId
          ? { ...campaign, ...updates }
          : campaign
      )
    );
  };

  const deleteCampaign = (campaignId) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
  };

  const getCampaignById = (campaignId) => {
    return campaigns.find(campaign => campaign.id === campaignId);
  };

  return {
    campaigns,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaignById
  };
};

export default useCampaigns;