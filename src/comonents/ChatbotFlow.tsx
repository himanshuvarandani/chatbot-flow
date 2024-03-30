import { useCallback, useRef, useState } from "react"
import ReactFlow, {
  addEdge,
  Connection,
  Controls,
  useEdgesState,
  useNodesState,
  useOnSelectionChange
} from "reactflow"
import TextMessageNode from "./TextMessage/Node"
import {
  PanelPropsType,
  NodeDataType,
  NodeType,
  ReactFlowInstanceType
} from "../../types"

const nodeTypes = {
  textMessage: TextMessageNode,
}

const ChatbotFlow = ({ selectedNode, setSelectedNode }: PanelPropsType) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeDataType>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstanceType>()

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const type = event.dataTransfer.getData("nodeType")
    if (!type) return
    if (!reactFlowWrapper.current || !reactFlowInstance) return

    // Create node position
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })

    setNodes((nds) => {
      const newNode: NodeType = {
        id: String(nds.length+1),
        type,
        position,
        data: { text: 'New Message' },
      }

      return nds.concat(newNode)
    })
  }, [reactFlowInstance])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  )
  
  // Update selected node when node selection updated
  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNode(nodes[0])
    }
  })

  return (
    <div className="flex flex-auto" ref={reactFlowWrapper}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onConnect={onConnect}
      >
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default ChatbotFlow
