import { configureStore } from '@reduxjs/toolkit';
import graphReducer from './state management/graphSlice';
// import nodeStylingReducer from './state management/nodeStylingSlice';
// import historyReducer from './state management/historySlice';

export const store = configureStore({
  reducer: {
    graph: graphReducer,
    // nodeStyling: nodeStylingReducer,
    // history: historyReducer,
  },
});

// TypeScript: Define RootState & AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;