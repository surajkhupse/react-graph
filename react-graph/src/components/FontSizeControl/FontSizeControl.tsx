import React from 'react';

interface FontSizeControlProps {
    currentTextSize: string;
    onTextSizeChange: (size: string) => void;
    fontSizeOptions: { value: string; label: string }[];
}

const FontSizeControl: React.FC<FontSizeControlProps> = ({ currentTextSize, onTextSizeChange, fontSizeOptions }) => (
    <div className="text-size-container">
        <label htmlFor="textSizePicker" className='mx-2'>Text Size</label>
        <select
            id="textSizePicker"
            value={currentTextSize}
            onChange={(e) => onTextSizeChange(e.target.value)}
            style={{ display: 'block', zIndex: 10 }}
        >
            {fontSizeOptions.map((size) => (
                <option key={size.value} value={size.value}>{size.label}</option>
            ))}
        </select>
    </div>
);

export default FontSizeControl;