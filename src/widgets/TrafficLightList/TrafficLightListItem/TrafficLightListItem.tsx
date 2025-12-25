import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { TrafficLight } from '@/entities/trafficLight';
import { memo } from 'react';

interface TrafficLightListItemProps {
  trafficLight: TrafficLight;
  isSelected: boolean;
  onClick: () => void;
}

export const TrafficLightListItem = memo((props: TrafficLightListItemProps) => {
  const { trafficLight, isSelected, onClick } = props;

  return (
    <Card
      sx={{
        mb: 1,
        cursor: 'pointer',
        border: isSelected ? '2px solid #1976d2' : '1px solid #e0e0e0',
        '&:hover': { borderColor: '#1976d2' }
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: trafficLight.mode === 'on' ? '#4caf50' : '#9e9e9e',
            }}
          />
          <Typography variant="h6">{trafficLight.name}</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={1}>
          {trafficLight.address}
        </Typography>

        <Chip
          size="small"
          label={`Статус: ${trafficLight.mode === 'on' ? 'Активен' : 'Неактивен'}`}
          color={trafficLight.mode === 'on' ? 'success' : 'default'}
        />
      </CardContent>
    </Card>
  );
});
