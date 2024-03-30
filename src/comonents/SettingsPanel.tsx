import TextMessageData from "./TextMessage/Data"
import { PanelNodeDataType, PanelPropsType } from "../../types"

// Contains all node types with thier data update components
const nodeDataTypes: PanelNodeDataType = {
  "textMessage": TextMessageData
}

const SettingsPanel = ({ selectedNode, setSelectedNode }: PanelPropsType) => {
  // Fetch the data update component by selected node type
  const Data = !selectedNode?.type
    ? (props: PanelPropsType) => <div/>
    : nodeDataTypes[selectedNode?.type]
  
  return (
    <div>
      <Data
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
      />
    </div>
  )
}

export default SettingsPanel
