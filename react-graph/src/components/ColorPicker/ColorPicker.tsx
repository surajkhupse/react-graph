import React from 'react';

interface ColorPickerProps {
    currentColor: string;
    onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ currentColor, onColorChange }) => (
    <div className="color-picker-container">
        <label htmlFor="colorPicker" className='mx-2'>Node Color</label>
        <input
            id="colorPicker"
            type="color"
            value={currentColor}
            onChange={(e) => onColorChange(e.target.value)}
        />
        <i className="fa fa-shower" aria-hidden="true"></i>
    </div>
);

export default ColorPicker;