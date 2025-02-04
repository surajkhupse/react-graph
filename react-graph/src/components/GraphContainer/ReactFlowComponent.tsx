import React, { useCallback, useState } from 'react'
import { ReactFlow, useNodesState, useEdgesState, addEdge, Background, MiniMap, Controls } from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import { initialEdges } from '../edges';
import { initialNodes } from '../nodes';
import UndoRedoControls from './UndoRedoControls';


const reactFlow = () => {
    // selected node state
    const [selectedNodeId, setSelectedNodeId] = useState<any>(null);

    // color state
    const [colorHistory, setColorHistory] = useState<string[]>([]);
    const [currentColor, setCurrentColor] = useState<string>('#ffffff');
    const [historyIndex, setHistoryIndex] = useState<number>(-1);

    // text size state
    const [textSizeHistory, setTextSizeHistory] = useState<any>([]);
    const [currentTextSize, setCurrentTextSize] = useState<any>('16px');
    const [textSizeHistoryIndex, setTextSizeHistoryIndex] = useState<number>(-1);

    // position state
    const [positionHistory, setPositionHistory] = useState<any[]>([]);
    const [positionHistoryIndex, setPositionHistoryIndex] = useState<number>(-1);

    // node and edge state
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const fontSize = [
        { value: '12px', label: '12px' },
        { value: '14px', label: '14px' },
        { value: '16px', label: '16px' },
        { value: '18px', label: '18px' },
        { value: '20px', label: '20px' },
        { value: '22px', label: '22px' },
        { value: '24px', label: '24px' },
    ]

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onNodeClick = (_event: React.MouseEvent, node: any) => {
        setSelectedNodeId(node.id);
        setCurrentColor(node.style.backgroundColor || '#fff');
        setCurrentTextSize(node.style.fontSize || '16px');
    };

    const onColorChange = (newColor: string) => {
        if (!selectedNodeId) {
            return;
        }
        const newHistory = colorHistory.slice(0, historyIndex + 1);
        newHistory.push(newColor);
        setColorHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);

        setCurrentColor(newColor);

        // Update the selected node's background color
        setNodes((nds) =>
            nds.map((node) =>
                node.id === selectedNodeId
                    ? { ...node, style: { backgroundColor: newColor, fontSize: node.style.fontSize } }
                    : node
            )
        );
    };

    const onTextSizeChange = (newSize: string) => {
        if (!selectedNodeId) {
            return;
        }

        const newHistory = textSizeHistory.slice(0, textSizeHistoryIndex + 1);
        newHistory.push(newSize);
        setTextSizeHistory(newHistory);
        setTextSizeHistoryIndex(newHistory.length - 1);

        setCurrentTextSize(newSize);

        // Update the selected node's text size
        setNodes((nds) =>
            nds.map((node) =>
                node.id === selectedNodeId
                    ? { ...node, style: { ...node.style, fontSize: newSize } }
                    : node
            )
        );
    };

    const onNodeDragStop = (_event: React.MouseEvent, node: any) => {
        debugger
        const newHistory = positionHistory.slice(0, positionHistoryIndex + 1);
        newHistory.push({ id: node.id, position: node.position });
        setPositionHistory(newHistory);
        setPositionHistoryIndex(newHistory.length - 1);
    };

    const undo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentColor(colorHistory[newIndex]);

            // Update the selected node's color
            setNodes((nds) =>
                nds.map((node) =>
                    node.id === selectedNodeId
                        ? { ...node, style: { backgroundColor: colorHistory[newIndex], fontSize: node.style.fontSize } }
                        : node
                )
            );
        }

        if (textSizeHistoryIndex > 0) {
            const newIndex = textSizeHistoryIndex - 1;
            setTextSizeHistoryIndex(newIndex);
            setCurrentTextSize(textSizeHistory[newIndex]);

            // Update the selected node's text size
            setNodes((nds) =>
                nds.map((node) =>
                    node.id === selectedNodeId
                        ? { ...node, style: { ...node.style, fontSize: textSizeHistory[newIndex] } }
                        : node
                )
            );
        }

        if (positionHistoryIndex > 0) {
            const newIndex = positionHistoryIndex - 1;
            setPositionHistoryIndex(newIndex);

            setNodes((nds) =>
                nds.map((node) =>
                    node.id === positionHistory[newIndex].id
                        ? { ...node, position: positionHistory[newIndex].position }
                        : node
                )
            );
        }
    };

    const redo = () => {
        if (historyIndex < colorHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCurrentColor(colorHistory[newIndex]);

            // Update the selected node's color
            setNodes((nds) =>
                nds.map((node) =>
                    node.id === selectedNodeId
                        ? { ...node, style: { backgroundColor: colorHistory[newIndex], fontSize: node.style.fontSize } }
                        : node
                )
            );
        }
        if (textSizeHistoryIndex < textSizeHistory.length - 1) {
            const newIndex = textSizeHistoryIndex + 1;
            setTextSizeHistoryIndex(newIndex);
            setCurrentTextSize(textSizeHistory[newIndex]);

            // Update the selected node's text size
            setNodes((nds) =>
                nds.map((node) =>
                    node.id === selectedNodeId
                        ? { ...node, style: { ...node.style, fontSize: textSizeHistory[newIndex] } }
                        : node
                )
            );
        }

        if (positionHistoryIndex < positionHistory.length - 1) {
            const newIndex = positionHistoryIndex + 1;
            setPositionHistoryIndex(newIndex);

            setNodes((nds) =>
                nds.map((node) =>
                    node.id === positionHistory[newIndex].id
                        ? { ...node, position: positionHistory[newIndex].position }
                        : node
                )
            );
        }
    };


    return (
        <><div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onNodeDragStop={onNodeDragStop}
            >
                <Background />
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
            <div className="color-picker-container">
                <label htmlFor="colorPicker" className='mx-2'>Node Color</label>
                <input id="colorPicker" type="color" value={currentColor} onChange={(e) => onColorChange(e.target.value)} />
                <i className="fa fa-shower" aria-hidden="true"></i>
            </div>
            <div className="text-size-container">
                <label htmlFor="textSizePicker" className='mx-2'>Text Size</label>
                <select
                    id="textSizePicker"
                    value={currentTextSize}
                    onChange={(e) => onTextSizeChange(e.target.value)}
                    style={{ display: 'block', zIndex: 10 }}
                >
                    {fontSize.map((size) => (
                        <option key={size.value} value={size.value}>{size.label}</option>
                    ))}
                </select>
            </div>
            <div>
            <UndoRedoControls undo={undo} redo={redo }></UndoRedoControls>
            </div>
            {/* <button className="btn btn-outline-secondary btn-sm undoButton"
                onClick={undo}
            >
                <i className="bi bi-arrow-counterclockwise"></i> Undo
            </button>
            <button className="btn btn-outline-secondary btn-sm redoButton"
                onClick={redo}
            >
                <i className="bi bi-arrow-clockwise"></i> Redo
            </button> */}
        </>
    )
}

export default reactFlow