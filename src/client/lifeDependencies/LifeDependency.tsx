import { LifeNodeData } from "@/domain/LifeNodeData";

type LifeDependencyProps = {
  source: LifeNodeData;
  destination: LifeNodeData;
};

export const LifeDependency = ({
  source,
  destination,
}: LifeDependencyProps) => (
  <line
    x1={source.x}
    y1={source.y}
    x2={destination.x}
    y2={destination.y}
    stroke="#000"
    stroke-width="8"
    marker-end="url(#arrowhead)"
  />
);
