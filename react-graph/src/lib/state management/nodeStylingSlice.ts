import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NodeStylingState {
  selectedNodeId: string | null;
  currentColor: string;
  currentTextSize: string;
}

const initialState: NodeStylingState = {
  selectedNodeId: null,
  currentColor: '#ffffff',
  currentTextSize: '16px',
};

const nodeStylingSlice = createSlice({
  name: 'nodeStyling',
  initialState,
  reducers: {
    setSelectedNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },
    setCurrentColor: (state, action: PayloadAction<string>) => {
      state.currentColor = action.payload;
    },
    setCurrentTextSize: (state, action: PayloadAction<string>) => {
      state.currentTextSize = action.payload;
    },
  },
});

export const { setSelectedNode, setCurrentColor, setCurrentTextSize } = nodeStylingSlice.actions;
export default nodeStylingSlice.reducer;