import { random } from "@/lib/utils";
import simpleEdges from "@/mock/simpleEdges";
import simpleNodes from "@/mock/simpleNodes";
import { useEffect, useRef, useState } from "react";
import { GraphCanvas, GraphCanvasRef } from "reagraph";

export default function Regraph() {
  const ref = useRef<GraphCanvasRef | null>(null);
  const [nodes, setNodes] = useState(simpleNodes);
  const [edges, setEdges] = useState(simpleEdges);
  const [numberOfNodesToAdd, setNumberOfNodesToAdd] = useState<number>(1);
  useEffect(() => {
    ref.current?.fitNodesInView();
  }, [nodes]);

  const addNodes = () => {
    const countArray = Array.from(
      { length: numberOfNodesToAdd },
      (_, i) => i + 1
    );

    const newNodes: {
      id: string;
      label: string;
      data: { priority: number };
    }[] = [];
    const newEdges: {
      id: string;
      source: string;
      target: string;
      label: string;
    }[] = [];

    countArray.forEach((element) => {
      const num = random(0, 1000);
      const newNode = {
        id: `n-${num}`,
        label: `Node ${num}`,
        data: {
          priority: num,
        },
      };
      newNodes.push(newNode);

      if (random(0, 2) !== 2) {
        const newEdge = {
          id: `e-${num}`,
          source: newNodes.length > 1 ? newNodes[newNodes.length - 2].id : "",
          target: newNode.id,
          label: `Edge ${newNodes.length - 1}-${newNodes.length}`,
        };
        newEdges.push(newEdge);
      }
    });

    setNodes((prevNodes) => [...prevNodes, ...newNodes]);
    setEdges((prevEdges) => [...prevEdges, ...newEdges]);
  };

  const removeNodes = () => {
    setNodes(prevNodes => {
      const nodesToRemoveCount = Math.min(numberOfNodesToAdd, prevNodes.length);
      const nodeIdsToRemove = prevNodes.slice(0, nodesToRemoveCount).map(node => node.id);
  
      setEdges(prevEdges => prevEdges.filter(edge => !nodeIdsToRemove.includes(edge.source) && !nodeIdsToRemove.includes(edge.target)));
  
      return prevNodes.slice(nodesToRemoveCount);
    });

  }

  return (
    <div>
      <div className="absolute t-0 left-20 z-50 text-black text-2xl flex-col">
        <div>
          <span className="font-semibold">Nodes:</span> {nodes.length}
        </div>
        <div className="mt-2">
          <span className="font-semibold">Edges:</span> {edges.length}
        </div>
      </div>
      <form
        className="text-black "
        style={{
          zIndex: 9,
          position: "absolute",
          top: 15,
          right: 200,
          padding: 1,
        }}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Number of nodes to add/remove
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="nodes"
              id="nodes"
              value={numberOfNodesToAdd}
              placeholder="Number of nodes to add/remove"
              onChange={(e) => setNumberOfNodesToAdd(parseInt(e.target.value))}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </form>
      <div
        style={{
          zIndex: 9,
          position: "absolute",
          top: 35,
          right: 15,
          background: "rgba(0, 0, 0, .5)",
          padding: 1,
          color: "white",
        }}
      >
        <button
          style={{
            display: "block",
            width: "100%",
          }}
          onClick={addNodes}
        >
          Add {numberOfNodesToAdd} Node(s)
        </button>
        <button
          style={{
            display: "block",
            width: "100%",
          }}
          onClick={removeNodes}
        >
          Remove {numberOfNodesToAdd} Node(s)
        </button>
      </div>
      <GraphCanvas ref={ref} nodes={nodes} edges={edges} />
    </div>
  );
}
