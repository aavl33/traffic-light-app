export type TrafficLightMode = 'on' | 'off';

export interface TrafficLight {
  id: string;
  name: string;
  address: string;
  coords: [number, number];
  mode: TrafficLightMode;
}

export interface FilterState {
  searchByName: string;
  searchByAddress: string;
  activeFilter: boolean | null;
  inactiveFilter: boolean | null;
}

export interface TrafficLightState {
  filters: FilterState;
  sortOrder: 'asc' | 'desc';
  selectedTrafficLightId: string | null;
}

export type GetTrafficLightsResponse = TrafficLight[];
