import ReactFlow, {
  addEdge,
  Connection,
  Controls,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState
} from "reactflow"
import NodesPanel from "./comonents/NodesPanel"
import { useCallback, useRef, useState } from "react"
import 'reactflow/dist/style.css'
import TextMessageNode from "./comonents/TextMessageNode"

type NodeDataType = { text: string }
type NodeType = Node<NodeDataType, string>
type ReactFlowInstanceType = ReactFlowInstance<NodeDataType>

const nodeTypes = {
  textMessage: TextMessageNode,
}

function App() {
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

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-end bg-gray-100 py-2 px-20">
        <button
          className="bg-white border-2 border-blue-800 rounded-xl text-blue-800 font-extrabold py-2 px-8"
        >
          Save Changes
        </button>
      </header>

      <div className="flex flex-auto">
        <ReactFlowProvider>
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
          <NodesPanel />
        </ReactFlowProvider>
      </div>
    </div>
  )
}

export default App
