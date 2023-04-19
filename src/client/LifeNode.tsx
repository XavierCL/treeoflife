import React from "react";
import { useEffect, useRef, useState } from "react";
import { LifeNodeData } from "@/domain/LifeNodeData";

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
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (!textRef.current || !groupRef.current) return;

    const groupBoundingBox = groupRef.current.getBoundingClientRect();
    const textBoundingBox = textRef.current.getBoundingClientRect();

    const translation = `${
      groupBoundingBox.width / 2 - textBoundingBox.width / 2
    },${52}`;

    textRef.current.setAttribute("transform", `translate(${translation})`);
  }, [name, groupRef, textRef]);

  return (
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
      <text ref={textRef}>{name}</text>
    </g>
  );
};

export const LifeNode = React.memo(LifeNodeWithoutMemo);
