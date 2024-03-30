import { useState } from "react"
import { ReactFlowProvider } from "reactflow"
import ChatbotFlow from "./comonents/ChatbotFlow"
import NodesPanel from "./comonents/NodesPanel"
import SettingsPanel from "./comonents/SettingsPanel"
import { NodeType } from "../types"
import "reactflow/dist/style.css"

function App() {
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null)

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
          <ChatbotFlow
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
          <div className="w-1/3 border-2 border-gray-300">
            {!selectedNode
              ? (<NodesPanel />)
              : (
                <SettingsPanel
                  selectedNode={selectedNode}
                  setSelectedNode={setSelectedNode}
                />
              )
            }
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  )
}

export default App
