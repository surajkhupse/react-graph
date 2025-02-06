import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Node {
  id: string;
  style: {
    backgroundColor: string;
    fontSize: string;
  };
  position: { x: number; y: number };
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface GraphState {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  currentColor: string;
  currentTextSize: string;
  history: Node[][];
  historyIndex: number;
}

const initialState: GraphState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  currentColor: '#ffffff',
  currentTextSize: '16px',
  history: [],
  historyIndex: -1,
};

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setNodes(state, action: PayloadAction<Node[]>) {
      state.nodes = action.payload;
    },
    setEdges(state, action: PayloadAction<Edge[]>) {
      state.edges = action.payload;
    },
    setSelectedNodeId(state, action: PayloadAction<string | null>) {
      state.selectedNodeId = action.payload;
    },
    setCurrentColor(state, action: PayloadAction<string>) {
      state.currentColor = action.payload;
    },
    setCurrentTextSize(state, action: PayloadAction<string>) {
      state.currentTextSize = action.payload;
    },
    pushToHistory(state, action: PayloadAction<Node[]>) {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(action.payload);
      state.history = newHistory;
      state.historyIndex = newHistory.length - 1;
    },
    undo(state) {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
        state.nodes = state.history[state.historyIndex];
      }
    },
    redo(state) {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1;
        state.nodes = state.history[state.historyIndex];
      }
    },
  },
});

export const {
  setNodes,
  setEdges,
  setSelectedNodeId,
  setCurrentColor,
  setCurrentTextSize,
  pushToHistory,
  undo,
  redo,
} = graphSlice.actions;

export default graphSlice.reducer;