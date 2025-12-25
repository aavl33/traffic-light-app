import { Box, Typography } from '@mui/material';
import { TrafficLightListItem } from './TrafficLightListItem/TrafficLightListItem.tsx';
import { TrafficLight } from '@/entities/trafficLight';
import { memo, useMemo, useCallback } from 'react';

interface TrafficLightListProps {
  trafficLights: TrafficLight[];
  selectedId: string | null;
  onItemClick: (id: string) => void;
}

export const TrafficLightList= memo((props: TrafficLightListProps) => {
  const { trafficLights, selectedId, onItemClick } = props;

  const handleItemClick = useCallback((id: string) => {
    onItemClick(id);
  }, [onItemClick]);

  const clickHandlers = useMemo(() => {
    const handlers: Record<string, () => void> = {};
    trafficLights.forEach(item => {
      handlers[item.id] = () => handleItemClick(item.id);
    });
    return handlers;
  }, [trafficLights, handleItemClick]);

  const listItems = useMemo(() =>
      trafficLights.map((item) => (
        <TrafficLightListItem
          key={item.id}
          trafficLight={item}
          isSelected={selectedId === item.id}
          onClick={clickHandlers[item.id]}
        />
      )),
    [trafficLights, selectedId, clickHandlers]
  );

  if (!trafficLights.length) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">Нет объектов</Typography>
      </Box>
    );
  }

  return <Box>{listItems}</Box>;
});
