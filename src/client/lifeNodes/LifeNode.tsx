import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import { LifeNodeData } from "@/domain/LifeNodeData";
import { AddSuccessor } from "./AddSuccessor";
import { LifeNodeContextType, lifeNodeContext } from "./LifeNodeContext";
import { CenteredSvgText } from "./CenteredSvgText";

export const LIFE_NODE_WIDTH = 104;
export const LIFE_NODE_HEIGHT = 104;

type LifeNodeProps = LifeNodeData & {
  setSelected: (
    nodeId: string,
    oldPosition: {
      x: number;
      y: number;
    },
    mousePosition: {
      x: number;
      y: number;
    }
  ) => void;
  addNode: (parent: string, newPosition: { x: number; y: number }) => void;
};

const LifeNodeWithoutMemo = ({
  nodeId,
  name,
  x,
  y,
  setSelected,
  addNode,
}: LifeNodeProps) => {
  const groupRef = useRef<SVGGElement>(null);
  const [lifeNodeState, setLifeNodeState] = useState<LifeNodeContextType>({});

  useEffect(() => {
    if (!groupRef.current) return;

    const groupBoundingBox = groupRef.current.getBoundingClientRect();

    setLifeNodeState({ nodeWidth: groupBoundingBox.width });
  }, [name, groupRef, setLifeNodeState]);

  const addChild = useCallback(() => {
    addNode(nodeId, { x, y: y + 200 });
  }, [addNode, nodeId, x, y]);

  return (
    <lifeNodeContext.Provider value={lifeNodeState}>
      <g
        ref={groupRef}
        transform={`translate(${x}, ${y})`}
        onPointerDown={(event) =>
          setSelected(nodeId, { x, y }, { x: event.clientX, y: event.clientY })
        }
        style={{ userSelect: "none", cursor: "pointer" }}
      >
        <circle
          cx={LIFE_NODE_WIDTH / 2}
          cy={LIFE_NODE_HEIGHT / 2}
          r={LIFE_NODE_WIDTH / 2 - 2}
          className="life-node"
          stroke="black"
          strokeWidth={2}
        />
        <CenteredSvgText
          parentWidth={lifeNodeState.nodeWidth}
          textProps={{ y: LIFE_NODE_WIDTH / 2 }}
        >
          {name}
        </CenteredSvgText>
        <AddSuccessor onClick={addChild} />
      </g>
    </lifeNodeContext.Provider>
  );
};

export const LifeNode = React.memo(LifeNodeWithoutMemo);
