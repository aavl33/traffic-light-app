import { rtkApi } from '@/shared/api/rtkApi';
import { GetTrafficLightsResponse } from '../model/types/trafficLightTypes.ts';

const tagTypes = ['TrafficLight'] as const;

export const trafficLightApi = rtkApi
  .enhanceEndpoints({ addTagTypes: tagTypes })
  .injectEndpoints({
    endpoints: (build) => ({
      getTrafficLights: build.query<GetTrafficLightsResponse, void>({
        query: () => ({
          url: 'traffic-light-app/tlo-list-mock.json',
          method: 'GET',
        }),
        providesTags: ['TrafficLight'],
      }),
    }),
  });

export const useGetTrafficLights = trafficLightApi.useGetTrafficLightsQuery;
