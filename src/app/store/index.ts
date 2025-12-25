import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { trafficLightApi } from '@/entities/trafficLight/api/trafficLightApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(trafficLightApi.middleware),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
