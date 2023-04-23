import React from "react";
import { useEffect, useRef, useState } from "react";
import { LifeNodeData } from "@/domain/LifeNodeData";
import { AddSuccessor } from "./AddSuccessor";
import { LifeNodeContextType, lifeNodeContext } from "./LifeNodeContext";
import { CenteredSvgText } from "../CenteredSvgText";

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
};

const LifeNodeWithoutMemo = ({
  nodeId,
  name,
  x,
  y,
  setSelected,
}: LifeNodeProps) => {
  const groupRef = useRef<SVGGElement>(null);
  const [lifeNodeState, setLifeNodeState] = useState<LifeNodeContextType>({});

  useEffect(() => {
    if (!groupRef.current) return;

    const groupBoundingBox = groupRef.current.getBoundingClientRect();

    setLifeNodeState({ nodeWidth: groupBoundingBox.width });
  }, [name, groupRef, setLifeNodeState]);

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
          cx={52}
          cy={52}
          r={50}
          fillOpacity={0}
          stroke="black"
          strokeWidth={2}
        />
        <CenteredSvgText
          parentWidth={lifeNodeState.nodeWidth}
          textProps={{ y: 52 }}
        >
          {name}
        </CenteredSvgText>
        <AddSuccessor />
      </g>
    </lifeNodeContext.Provider>
  );
};

export const LifeNode = React.memo(LifeNodeWithoutMemo);
