import {useMap} from "react-leaflet";
import {useEffect} from "react";
import L from "leaflet";
import type {TrafficLight} from '../types/types.ts';

export const MapBoundsController = ({ trafficLights }: { trafficLights: TrafficLight[] }) => {
  const map = useMap();

  useEffect(() => {
    if (trafficLights.length > 0) {
      const bounds = L.latLngBounds(trafficLights.map(tl => tl.coords));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [trafficLights, map]);

  return null;
}
