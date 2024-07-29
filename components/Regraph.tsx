import { random } from "@/lib/utils";
import simpleEdges from "@/mock/simpleEdges";
import simpleNodes from "@/mock/simpleNodes";
import { useEffect, useRef, useState } from "react";
import { GraphCanvas, GraphCanvasRef } from "reagraph";

export default function Regraph() {
  const ref = useRef<GraphCanvasRef | null>(null);
  const [nodes, setNodes] = useState(simpleNodes);
  const [edges, setEdges] = useState(simpleEdges);
  useEffect(() => {
    ref.current?.fitNodesInView();
  }, [nodes]);

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

      <div
        style={{
          zIndex: 9,
          position: "absolute",
          top: 15,
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
          onClick={() => {
            const num = random(0, 1000);
            setNodes([
              ...nodes,
              {
                id: `n-${num}`,
                label: `Node ${num}`,
                data: {
                  priority: num,
                },
              },
            ]);
            if (random(0, 2) !== 2) {
              setEdges([
                ...edges,
                {
                  id: `e-${num}`,
                  source: nodes[nodes.length - 1].id,
                  target: `n-${num}`,
                  label: `Edge ${nodes.length - 1}-${nodes.length}`,
                },
              ]);
            }
          }}
        >
          Add Node
        </button>
        <button
          style={{
            display: "block",
            width: "100%",
          }}
          onClick={() => {
            setNodes(nodes.filter((n) => n.id !== nodes[0]?.id));
          }}
        >
          Remove Node {nodes[0]?.id}
        </button>
      </div>
      <GraphCanvas ref={ref} nodes={nodes} edges={edges} />
    </div>
  );
}
