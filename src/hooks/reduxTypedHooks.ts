import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { AppDispatch, RootState } from './../redux/rootReducer';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
