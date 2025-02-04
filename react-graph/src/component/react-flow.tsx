import React, { useCallback, useState } from 'react'
import { ReactFlow, useNodesState, useEdgesState, addEdge, Background, MiniMap, Controls } from '@xyflow/react'
import '@xyflow/react/dist/style.css';

const reactFlow = () => {

    const [nodeColor, setNodeColor] = useState<string>('#fff');
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const initialNodes = [
        { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
        { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
        { id: '3', position: { x: 50, y: 200 }, data: { label: '3' } },
        { id: '4', position: { x: 60, y: 300 }, data: { label: '4' } },
        { id: '5', position: { x: 10, y: 400 }, data: { label: '5' } },
        { id: '6', position: { x: 90, y: 500 }, data: { label: '6' } },
        { id: '7', position: { x: 0, y: 600 }, data: { label: '7' } },
        { id: '8', position: { x: 0, y: 700 }, data: { label: '8' } },
        { id: '9', position: { x: 0, y: 800 }, data: { label: '9' } },
        { id: '10', position: { x: 0, y: 900 }, data: { label: '10' } },
    ];
    const initialEdges = [
        { id: '1->2', source: '1', target: '2', animated: true },
        { id: '2->3', source: '2', target: '3', animated: true },
        { id: '3->4', source: '3', target: '4', animated: true },
        { id: '4->5', source: '4', target: '5', animated: true },
        { id: '5->6', source: '5', target: '6', animated: true },
        { id: '6->7', source: '6', target: '7', animated: true },
        { id: '7->8', source: '7', target: '8', animated: true },
        { id: '8->9', source: '8', target: '9', animated: true },
        { id: '9->10', source: '9', target: '10', animated: true },
    ];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onNodeClick = (_event: React.MouseEvent, node: any) => {
        setSelectedNodeId(node.id);
        setNodeColor(node.style.backgroundColor || '#fff');
    };

    const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;
        setNodeColor(color);
        setNodes((nodes) =>
            nodes.map((node) =>
                node.id === selectedNodeId ? { ...node, style: { backgroundColor: color } } : node
            )
        );
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
            >
                <Background />
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
            <div className="color-picker-container">
                <label htmlFor="colorPicker" className='mx-2'>Node Color</label>
                <input id="colorPicker" type="color" value={nodeColor} onChange={onColorChange} />
                <i className="fa fa-shower" aria-hidden="true"></i>
            </div>
            <button className="btn btn-secondary" 
            // onClick={undo}
             style={{ position: "absolute", top: 50, left: 10 }}>
                <i className="bi bi-arrow-counterclockwise"></i> Undo
            </button>
            <button className="btn btn-secondary"
            //  onClick={redo}
              style={{ position: "absolute", top: 90, left: 10 }}>
                <i className="bi bi-arrow-clockwise"></i> Redo
            </button>
        </>
    )
}

export default reactFlow