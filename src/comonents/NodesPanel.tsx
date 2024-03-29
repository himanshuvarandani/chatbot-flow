import { faMessage } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

type PanelNodeType = {
  type: string
  icon: React.ReactElement
  label: string
}

const nodes: Array<PanelNodeType> = [
  {
    type: "textMessage",
    icon: <FontAwesomeIcon icon={faMessage} />,
    label: "Message",
  }
]

const NodesPanel = () => {
  return (
    <div className="w-1/3 border-2 border-gray-300 p-2">
      <div className="flex flex-wrap">
        {nodes.map(node => (
          <div
            className="w-48 flex flex-col items-center border-2 border-blue-800 rounded-xl text-blue-800 p-5 m-1 cursor-pointer"
          >
            {node.icon}
            <p className="mt-2">{node.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NodesPanel
