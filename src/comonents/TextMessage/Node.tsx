import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faMessage } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMemo } from "react"
import {
  Connection,
  getConnectedEdges,
  Handle,
  NodeProps,
  Position,
  useEdges,
  useReactFlow
} from "reactflow"
import { NodeDataType } from "../../../types"

const TextMessageNode = ({ id, data, selected }: NodeProps<NodeDataType>) => {
  const reactFlow = useReactFlow()
  const edges = useEdges()

  // Checking if the edges includes this node as source
  const isConnectable = useMemo(() => {
    const node = reactFlow.getNode(id)
    if (!node) return false
    
    const connectedEdges = getConnectedEdges([node], edges)
    if (connectedEdges.filter(edge => edge.source === id).length) return false
    return true
  }, [id, edges])

  return (
    <div className={`w-[250px] rounded-xl overflow-hidden shadow-xl text-sm
      ${selected ? "border-2 border-blue-800" : ""}
    `}>
      {/* {Check if connection is valid, not starting from same node source} */}
      <Handle
        id="1"
        type="target"
        position={Position.Left}
        isConnectable={true}
        isValidConnection={(connection: Connection) => connection.source !== id}
      />
      <div className="flex justify-between items-center bg-green-100 py-1 px-3">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faMessage} size="2xs" />
          <p className="font-bold">Send Message</p>
        </div>
        <FontAwesomeIcon icon={faWhatsapp} size="xs" color="green" />
      </div>
      <div className="bg-white p-3">
        <p>{data.text}</p>
      </div>
      {/* {Check if connection is valid, not ending on same node target} */}
      <Handle
        id="2"
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        isValidConnection={(connection: Connection) => connection.target !== id}
      />
    </div>
  )
}

export default TextMessageNode
