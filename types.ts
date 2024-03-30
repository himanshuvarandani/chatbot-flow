import React from "react"
import { Node, ReactFlowInstance } from "reactflow"

export type NodeDataType = { text: string }

export type NodeType = Node<NodeDataType, string>

export type ReactFlowInstanceType = ReactFlowInstance<NodeDataType>

export type PanelNodeType = {
  type: string
  icon: React.ReactElement
  label: string
}

export type PanelPropsType = {
  selectedNode: NodeType | null
  setSelectedNode: React.Dispatch<React.SetStateAction<NodeType | null>>
}

export type PanelNodeDataType = {
  [key: string]: (props: PanelPropsType) => JSX.Element
}
