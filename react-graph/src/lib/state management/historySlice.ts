import { createSlice } from '@reduxjs/toolkit';

interface HistoryState {
  history: any[];
  historyIndex: number;
}

const initialState: HistoryState = {
  history: [],
  historyIndex: -1,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    updateHistory: (state, action) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(action.payload);
      state.history = newHistory;
      state.historyIndex = newHistory.length - 1;
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1;
      }
    },
  },
});

export const { updateHistory, undo, redo } = historySlice.actions;
export default historySlice.reducer;