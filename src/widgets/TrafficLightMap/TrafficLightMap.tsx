import { useMemo, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {MapController} from './MapController/MapController.tsx';
import {MapBoundsController} from './MapBoundsController/MapBoundsController.tsx';
import type {TrafficLight} from './types/types.ts';

interface TrafficLightMapProps {
  trafficLights: TrafficLight[];
  selectedId?: string | null;
  onMarkerClick?: (id: string) => void;
}

export const TrafficLightMap= memo((props: TrafficLightMapProps) => {
  const {trafficLights = [], selectedId, onMarkerClick } = props;

  const center = useMemo((): [number, number] => {
    return [55.7558, 37.6173];
  }, []);

  const createCustomIcon = (isSelected: boolean, mode: 'on' | 'off') => {

    const backgroundColor = mode === 'on' ? '#4caf50' : '#9e9e9e';
    const borderColor = isSelected ? '#1976d2' : 'white';
    return L.divIcon({
      html: `
        <div style="
          width: 20px;
          height: 20px;
          background-color: ${backgroundColor};
          border-radius: 50%;
          border: 2px solid ${borderColor};
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        "></div>`,
      className: 'custom-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapBoundsController trafficLights={trafficLights} />
        <MapController selectedId={selectedId} trafficLights={trafficLights} />

        {trafficLights.map((tl) => (
          <Marker
            key={tl.id}
            position={tl.coords}
            icon={createCustomIcon(selectedId === tl.id, tl.mode)}
            eventHandlers={{
              click: () => onMarkerClick?.(tl.id),
            }}
          >
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>Объект {tl.name}</h3>
                <p style={{ margin: '4px 0' }}><strong>Адрес:</strong> {tl.address}</p>
                <p style={{ margin: '4px 0' }}>
                  <strong>Статус:</strong>{' '}
                  <span style={{ color: tl.mode === 'on' ? 'green' : 'gray' }}>
                    {tl.mode === 'on' ? 'Активен' : 'Неактивен'}
                  </span>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
});
