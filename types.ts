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
