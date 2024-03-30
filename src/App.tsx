import { useState } from "react"
import { ReactFlowProvider } from "reactflow"
import ChatbotFlow from "./comonents/ChatbotFlow"
import NodesPanel from "./comonents/NodesPanel"
import SettingsPanel from "./comonents/SettingsPanel"
import { NodeType } from "../types"
import "reactflow/dist/style.css"
import Header from "./comonents/Header"

function App() {
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null)

  return (
    <div className="flex flex-col min-h-screen">
      <ReactFlowProvider>
        <Header />

        <div className="flex flex-auto">
          <ChatbotFlow
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
          <div className="w-1/3 border-2 border-gray-200">
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
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default App
