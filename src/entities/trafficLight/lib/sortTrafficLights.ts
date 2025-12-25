import { TrafficLight } from '../model/types/trafficLightTypes.ts';

export const sortTrafficLights = (
  trafficLights: TrafficLight[],
  order: 'asc' | 'desc'
): TrafficLight[] => {
  return [...trafficLights].sort((a, b) => {
    const numA = parseInt(a.name);
    const numB = parseInt(b.name);

    if (order === 'asc') {
      return numA - numB;
    } else {
      return numB - numA;
    }
  });
};
