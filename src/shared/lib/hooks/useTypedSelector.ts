import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '@/app/store/rootReducer.ts';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
