import React, { useState } from "react"
import { useReactFlow } from "reactflow"

const Header = () => {
  const reactFlow = useReactFlow()
  const [showModal, setShowModal] = useState(false)

  const save = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const nodes = reactFlow.getNodes()
    const edges = reactFlow.getEdges()

    // Count unconnected target handles
    let unConnectedTargets = 0
    // Check for each node and edge combination to count unconncected target handles
    nodes.forEach(node => {
      if (!edges.filter(edge => edge.target === node.id).length)
        unConnectedTargets += 1
    })

    if (unConnectedTargets > 1) {
      setShowModal(true)
      setTimeout(() => setShowModal(false), 3000)
    } else {
      // After this call flow save api
      alert("Changes Saved")
    }
  }

  return (
    <>
      <header className="flex justify-end bg-gray-100 py-2 px-20">
        <button
          className="bg-white border-2 border-blue-800 rounded-xl text-blue-800 font-extrabold py-2 px-8"
          onClick={save}
        >
          Save Changes
        </button>
      </header>
      
      <div
        className={`fixed top-3 left-1/2 -translate-x-1/2 bg-red-200 rounded-xl
          py-2 px-4 transition-opacity ease-in-out duration-1000
          ${showModal ? "opacity-100" : "opacity-0 hidden"}
        `}
      >
        <p className="font-bold">Cannot save flow</p>
      </div>
    </>
  )
}

export default Header
