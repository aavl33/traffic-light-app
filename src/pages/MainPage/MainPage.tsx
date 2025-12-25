import { useMemo, useState, useCallback } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { TrafficLightMap } from '@/widgets/TrafficLightMap';
import { FilterPanel } from '@/widgets/FilterPanel';
import { TrafficLightList } from '@/widgets/TrafficLightList';
import { useGetTrafficLights } from '@/entities/trafficLight/api/trafficLightApi';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { selectFilters, selectSortOrder } from '@/entities/trafficLight';
import { filterTrafficLights } from '@/entities/trafficLight/lib/filterTrafficLights';
import { sortTrafficLights } from '@/entities/trafficLight/lib/sortTrafficLights';

export const MainPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const filters = useTypedSelector(selectFilters);
  const sortOrder = useTypedSelector(selectSortOrder);

  const { data: trafficLights = [], isLoading } = useGetTrafficLights();

  const handleItemClick = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleMarkerClick = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const filteredData = useMemo(() => {
    const filtered = filterTrafficLights(trafficLights, filters);
    return sortTrafficLights(filtered, sortOrder);
  }, [trafficLights, filters, sortOrder]);

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Загрузка данных...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ p: 2, height: '100vh' }}>
      <Box sx={{
        display: 'flex',
        gap: 2,
        height: 'calc(100vh - 32px)',
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        <Box sx={{
          flex: 1,
          height: '100%',
          borderRadius: 1,
          overflow: 'hidden',
          border: '1px solid #ddd',
          minHeight: { xs: '400px', md: 'auto' }
        }}>
          <TrafficLightMap
            trafficLights={filteredData}
            selectedId={selectedId}
            onMarkerClick={handleMarkerClick}
          />
        </Box>
        <Box sx={{
          flex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ mb: 2 }}>
            <FilterPanel />
          </Box>
          <Box sx={{
            flex: 1,
            overflow: 'auto',
            border: '1px solid #ddd',
            borderRadius: 1,
            p: 1
          }}>
            <TrafficLightList
              trafficLights={filteredData}
              selectedId={selectedId}
              onItemClick={handleItemClick}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
