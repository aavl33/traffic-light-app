import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrafficLightState } from '../types/trafficLightTypes.ts';

const initialState: TrafficLightState = {
  filters: {
    searchByName: '',
    searchByAddress: '',
    activeFilter: true,
    inactiveFilter: false,
  },
  sortOrder: 'asc',
  selectedTrafficLightId: null,
};

const trafficLightSlice = createSlice({
  name: 'trafficLight',
  initialState,
  reducers: {
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.filters.searchByName = action.payload;
    },
    setSearchByAddress: (state, action: PayloadAction<string>) => {
      state.filters.searchByAddress = action.payload;
    },
    setActiveFilter: (state, action: PayloadAction<boolean>) => {
      state.filters.activeFilter = action.payload;
    },
    setInactiveFilter: (state, action: PayloadAction<boolean>) => {
      state.filters.inactiveFilter = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    setSelectedTrafficLightId: (state, action: PayloadAction<string | null>) => {
      state.selectedTrafficLightId = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { actions: trafficLightActions } = trafficLightSlice;
export const { reducer: trafficLightReducer } = trafficLightSlice;
