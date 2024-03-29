import ReactFlow, { useEdgesState, useNodesState } from "reactflow"
import NodesPanel from "./comonents/NodesPanel"

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

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
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        />
        <NodesPanel />
      </div>
    </div>
  )
}

export default App
