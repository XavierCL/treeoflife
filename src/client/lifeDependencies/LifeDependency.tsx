import { LifeNodeData } from "@/domain/LifeNodeData";
import { LIFE_NODE_HEIGHT, LIFE_NODE_WIDTH } from "../lifeNodes/LifeNode";

type LifeDependencyProps = {
  source: LifeNodeData;
  destination: LifeNodeData;
};

export const LifeDependency = ({
  source,
  destination,
}: LifeDependencyProps) => (
  <line
    x1={source.x + LIFE_NODE_WIDTH / 2}
    y1={source.y + LIFE_NODE_HEIGHT / 2}
    x2={destination.x + LIFE_NODE_WIDTH / 2}
    y2={destination.y + LIFE_NODE_HEIGHT / 2}
    stroke="#000"
    strokeWidth="2"
    markerEnd="url(#arrowhead)"
  />
);
