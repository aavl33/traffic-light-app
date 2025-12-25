import {ChangeEvent, memo, useCallback} from 'react';
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { trafficLightActions } from '@/entities/trafficLight';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { selectFilters, selectSortOrder } from '@/entities/trafficLight';
import styles from './FilterPanel.module.scss';

export const FilterPanel= memo(() => {
  const dispatch = useDispatch();
  const filters = useTypedSelector(selectFilters);
  const sortOrder = useTypedSelector(selectSortOrder);

  const handleSearchByNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(trafficLightActions.setSearchByName(event.target.value));
  }, [dispatch]);

  const handleSearchByAddressChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(trafficLightActions.setSearchByAddress(event.target.value));
  }, [dispatch]);

  const handleActiveFilterChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(trafficLightActions.setActiveFilter(event.target.checked));
  }, [dispatch]);

  const handleInactiveFilterChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(trafficLightActions.setInactiveFilter(event.target.checked));
  }, [dispatch]);

  const handleSortToggle = useCallback(() => {
    dispatch(trafficLightActions.toggleSortOrder());
  }, [dispatch]);

  const handleResetFilters = useCallback(() => {
    dispatch(trafficLightActions.resetFilters());
  }, [dispatch]);

  return (
    <Paper className={styles.panel} elevation={2}>
      <Typography variant="h5" gutterBottom className={styles.title}>
        Светофорные объекты
      </Typography>

      <Box className={styles.filters}>
        <TextField
          label="Поиск по номеру"
          variant="outlined"
          size="small"
          fullWidth
          value={filters.searchByName}
          onChange={handleSearchByNameChange}
          className={styles.filterInput}
        />

        <TextField
          label="Поиск по адресу"
          variant="outlined"
          size="small"
          fullWidth
          value={filters.searchByAddress}
          onChange={handleSearchByAddressChange}
          className={styles.filterInput}
        />

        <Box className={styles.checkboxGroup}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.activeFilter ?? false}
                onChange={handleActiveFilterChange}
                color="success"
              />
            }
            label="Активные"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.inactiveFilter ?? false}
                onChange={handleInactiveFilterChange}
              />
            }
            label="Неактивные"
          />
        </Box>

        <Box className={styles.actions}>
          <Button
            variant="outlined"
            onClick={handleSortToggle}
            className={styles.sortButton}
          >
            Сортировать по номеру ({sortOrder === 'asc' ? '↑' : '↓'})
          </Button>

          {(filters.searchByName || filters.searchByAddress ||
            filters.activeFilter || filters.inactiveFilter) && (
            <Button
              variant="text"
              onClick={handleResetFilters}
              className={styles.resetButton}
            >
              Сбросить фильтры
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
});
