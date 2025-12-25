export interface TrafficLight {
  id: string;
  name: string;
  address: string;
  coords: [number, number];
  mode: 'on' | 'off';
}
