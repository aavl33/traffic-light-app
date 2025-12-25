import { RootState } from '../../../../app/store/rootReducer.ts';

export const selectFilters = (state: RootState) => state.trafficLight.filters;
export const selectSortOrder = (state: RootState) => state.trafficLight.sortOrder;
export const selectSelectedTrafficLightId = (state: RootState) =>
  state.trafficLight.selectedTrafficLightId;
