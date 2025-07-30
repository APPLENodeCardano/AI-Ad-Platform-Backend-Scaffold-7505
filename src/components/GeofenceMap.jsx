import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, useMapEvents, useMap } from 'react-leaflet';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';

const { FiTrash2, FiSave, FiEdit, FiZoomIn, FiZoomOut } = FiIcons;

// Fix for default markers in React Leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Drawing component for creating polygons
const DrawingHandler = ({ onPolygonComplete, isDrawing, setIsDrawing }) => {
  const [currentPoints, setCurrentPoints] = useState([]);
  const map = useMap();

  useMapEvents({
    click: (e) => {
      if (isDrawing) {
        const newPoint = [e.latlng.lat, e.latlng.lng];
        setCurrentPoints(prev => [...prev, newPoint]);
      }
    },
    contextmenu: (e) => {
      // Right click to complete polygon
      if (isDrawing && currentPoints.length >= 3) {
        e.originalEvent.preventDefault();
        const polygon = [...currentPoints];
        onPolygonComplete(polygon);
        setCurrentPoints([]);
        setIsDrawing(false);
      }
    }
  });

  // Preview line between points
  const previewLine = currentPoints.length > 0 ? (
    <Polygon
      positions={currentPoints}
      pathOptions={{
        color: '#0ea5e9',
        fillColor: '#0ea5e9',
        fillOpacity: 0.2,
        weight: 2,
        dashArray: '5,5'
      }}
    />
  ) : null;

  return previewLine;
};

// Component to fit map bounds to polygons with smooth animation
const FitBounds = ({ polygons }) => {
  const map = useMap();

  useEffect(() => {
    if (polygons.length > 0) {
      const allPoints = polygons.flatMap(polygon => polygon.coordinates);
      if (allPoints.length > 0) {
        const bounds = L.latLngBounds(allPoints);
        map.flyToBounds(bounds, {
          padding: [50, 50],
          duration: 1,
          easeLinearity: 0.25
        });
      }
    }
  }, [polygons, map]);

  return null;
};

const GeofenceMap = ({ onGeofenceChange, existingGeofences = [] }) => {
  const [polygons, setPolygons] = useState(existingGeofences);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const mapRef = useRef(null);

  // Default center (San Francisco)
  const defaultCenter = [37.7749, -122.4194];
  const defaultZoom = 13;

  const handlePolygonComplete = useCallback((coordinates) => {
    const newPolygon = {
      id: Date.now(),
      coordinates,
      name: `Geofence ${polygons.length + 1}`,
      color: '#0ea5e9'
    };
    const updatedPolygons = [...polygons, newPolygon];
    setPolygons(updatedPolygons);
    if (onGeofenceChange) {
      onGeofenceChange(updatedPolygons);
    }
  }, [polygons, onGeofenceChange]);

  const handleDeletePolygon = useCallback((polygonId) => {
    const updatedPolygons = polygons.filter(p => p.id !== polygonId);
    setPolygons(updatedPolygons);
    setSelectedPolygon(null);
    if (onGeofenceChange) {
      onGeofenceChange(updatedPolygons);
    }
  }, [polygons, onGeofenceChange]);

  const handleClearAll = useCallback(() => {
    setPolygons([]);
    setSelectedPolygon(null);
    setIsDrawing(false);
    if (onGeofenceChange) {
      onGeofenceChange([]);
    }
  }, [onGeofenceChange]);

  const startDrawing = () => {
    setIsDrawing(true);
    setSelectedPolygon(null);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Custom zoom controls
  const ZoomControls = () => {
    const map = useMap();

    const handleZoomIn = () => {
      map.setZoom(map.getZoom() + 0.5);
    };

    const handleZoomOut = () => {
      map.setZoom(map.getZoom() - 0.5);
    };

    return (
      <div className="absolute right-4 top-4 z-[1000] flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        >
          <SafeIcon icon={FiZoomIn} className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        >
          <SafeIcon icon={FiZoomOut} className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={startDrawing}
            disabled={isDrawing}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              isDrawing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
            }`}
          >
            {isDrawing ? 'Drawing...' : 'Draw Geofence'}
          </button>
          {isDrawing && (
            <button
              onClick={stopDrawing}
              className="px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearAll}
            disabled={polygons.length === 0}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              polygons.length === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Drawing Instructions */}
      {isDrawing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>Drawing Mode:</strong> Click on the map to add points. Right-click to complete the geofence.
          </p>
        </div>
      )}

      {/* Map Container */}
      <div className="relative">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          style={{ height: '500px', width: '100%' }}
          className="rounded-lg border border-gray-200"
          ref={mapRef}
          doubleClickZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Existing polygons */}
          {polygons.map((polygon) => (
            <Polygon
              key={polygon.id}
              positions={polygon.coordinates}
              pathOptions={{
                color: selectedPolygon?.id === polygon.id ? '#ef4444' : polygon.color,
                fillColor: selectedPolygon?.id === polygon.id ? '#ef4444' : polygon.color,
                fillOpacity: 0.2,
                weight: selectedPolygon?.id === polygon.id ? 3 : 2,
              }}
              eventHandlers={{
                click: () => setSelectedPolygon(polygon),
              }}
            />
          ))}

          {/* Drawing handler */}
          <DrawingHandler
            onPolygonComplete={handlePolygonComplete}
            isDrawing={isDrawing}
            setIsDrawing={setIsDrawing}
          />

          {/* Fit bounds to polygons */}
          <FitBounds polygons={polygons} />

          {/* Custom zoom controls */}
          <ZoomControls />
        </MapContainer>

        {/* Cursor indicator when drawing */}
        {isDrawing && (
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-3 py-2 z-[1000]">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Click to add points</span>
            </div>
          </div>
        )}
      </div>

      {/* Geofence List */}
      {polygons.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Created Geofences ({polygons.length})
          </h4>
          <div className="space-y-2">
            {polygons.map((polygon) => (
              <div
                key={polygon.id}
                className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer ${
                  selectedPolygon?.id === polygon.id 
                    ? 'bg-primary-50 border border-primary-200' 
                    : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setSelectedPolygon(selectedPolygon?.id === polygon.id ? null : polygon)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full border-2"
                    style={{
                      backgroundColor: polygon.color,
                      borderColor: polygon.color
                    }}
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {polygon.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {polygon.coordinates.length} points
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePolygon(polygon.id);
                  }}
                  className="p-1 text-red-400 hover:text-red-600 rounded transition-colors"
                >
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {polygons.length === 0 && !isDrawing && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No geofences created yet.</p>
          <p className="text-xs mt-1">Click "Draw Geofence" to start creating geographic boundaries.</p>
        </div>
      )}
    </div>
  );
};

export default GeofenceMap;