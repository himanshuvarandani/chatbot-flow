import { faMessage } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { PanelNodeType } from "../../types"

const nodes: Array<PanelNodeType> = [{
  type: "textMessage",
  icon: <FontAwesomeIcon icon={faMessage} size="lg" />,
  label: "Message",
}]

const NodesPanel = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("nodeType", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }
  
  return (
    <div className="flex flex-wrap p-2">
      {nodes.map(node => (
        <div
          key={node.label}
          className="w-48 flex flex-col items-center border-2 border-blue-800 rounded-xl text-blue-800 p-5 m-1 cursor-pointer"
          draggable
          onDragStart={(e) => onDragStart(e, node.type)}
        >
          {node.icon}
          <p className="font-bold mt-2">{node.label}</p>
        </div>
      ))}
    </div>
  )
}

export default NodesPanel
