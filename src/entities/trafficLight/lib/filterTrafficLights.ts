import { TrafficLight, FilterState } from '../model/types/trafficLightTypes.ts';

export const filterTrafficLights = (
  trafficLights: TrafficLight[],
  filters: FilterState
): TrafficLight[] => {
  return trafficLights.filter((trafficLight) => {
    const nameMatch = filters.searchByName
      ? trafficLight.name.toLowerCase().includes(filters.searchByName.toLowerCase())
      : true;

    const addressMatch = filters.searchByAddress
      ? trafficLight.address.toLowerCase().includes(filters.searchByAddress.toLowerCase())
      : true;

    let statusMatch = true;
    if (filters.activeFilter && !filters.inactiveFilter) {
      statusMatch = trafficLight.mode === 'on';
    } else if (!filters.activeFilter && filters.inactiveFilter) {
      statusMatch = trafficLight.mode === 'off';
    } else if (!filters.activeFilter && !filters.inactiveFilter) {
      statusMatch = false;
    }

    return nameMatch && addressMatch && statusMatch;
  });
};
