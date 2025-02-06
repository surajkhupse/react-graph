import React from 'react';
import ColorPicker from '../ColorPicker/ColorPicker';
import FontSizeControl from '../FontSizeControl/FontSizeControl';
import UndoRedoControls from './UndoRedoControls';

interface NodeCustomizationPanelProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  currentTextSize: string;
  onTextSizeChange: (size: string) => void;
  fontSizeOptions: { value: string; label: string }[];
  undo: () => void;
  redo: () => void;
}

const NodeCustomizationPanel: React.FC<NodeCustomizationPanelProps> = ({
  currentColor,
  onColorChange,
  currentTextSize,
  onTextSizeChange,
  fontSizeOptions,
  undo,
  redo,
}) => {
  return (
    <div className="">
      <div className="">
        <ColorPicker currentColor={currentColor} onColorChange={onColorChange} />
        <FontSizeControl
          currentTextSize={currentTextSize}
          onTextSizeChange={onTextSizeChange}
          fontSizeOptions={fontSizeOptions}
        />
        <UndoRedoControls undo={undo} redo={redo} />
      </div>
    </div>
  );
};

export default NodeCustomizationPanel;
