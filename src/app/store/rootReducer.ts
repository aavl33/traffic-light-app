import { combineReducers } from '@reduxjs/toolkit';
import { trafficLightReducer } from '@/entities/trafficLight';
import { trafficLightApi } from '@/entities/trafficLight/api/trafficLightApi';

export const rootReducer = combineReducers({
  trafficLight: trafficLightReducer,
  [trafficLightApi.reducerPath]: trafficLightApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
