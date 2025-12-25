import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { TrafficLight } from '@/entities/trafficLight/model/types/trafficLightTypes.ts';

interface MapControllerProps {
  selectedId?: string | null;
  trafficLights: TrafficLight[];
}

export const MapController = ({ selectedId, trafficLights }: MapControllerProps) => {
  const map = useMap();

  useEffect(() => {
    if (selectedId) {
      const selected = trafficLights.find(tl => tl.id === selectedId);
      if (selected) {
        map.flyTo(selected.coords, 16, {
          duration: 1,
          animate: true
        });
      }
    }
  }, [selectedId, trafficLights, map]);

  return null;
}
