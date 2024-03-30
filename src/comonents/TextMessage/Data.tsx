import { faLeftLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useReactFlow } from "reactflow"
import { PanelPropsType } from "../../../types"

const TextMessageData = ({ selectedNode, setSelectedNode }: PanelPropsType) => {
  const reactFlow = useReactFlow()
  const [text, setText] = useState("")

  useEffect(() => {
    if (selectedNode) setText(selectedNode?.data.text)
  }, [selectedNode])

  useEffect(() => {
    if (!selectedNode) return

    reactFlow.setNodes(oldNodes => oldNodes.map(node => {
      if (node.id === selectedNode.id) {
        node.data = {
          text: text
        }
      }
      return node
    }))
  }, [text])
  
  return (
    <div>
      <div className="flex items-center border-b-2 border-gray-200 py-2 px-5">
        <FontAwesomeIcon
          icon={faLeftLong}
          onClick={() => setSelectedNode(null)}
          className="cursor-pointer"
        />
        <h4 className="flex-1 text-lg text-center font-bold">Message</h4>
      </div>
      <div className="border-b-2 border-gray-200 p-4">
        <h5 className="text-gray-400 font-medium mb-2">Text</h5>
        <textarea
          className="w-full border-2 border-gray-200 rounded-lg focus:outline-none p-2"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  )
}

export default TextMessageData
