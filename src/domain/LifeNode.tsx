import { useEffect, useRef } from "react";

type LifeNodeProps = { name: string; x: number; y: number };

export const LifeNode = ({ name, x, y }: LifeNodeProps) => {
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
    <g ref={groupRef} x={x} y={y}>
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
