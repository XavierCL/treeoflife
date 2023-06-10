import { LifeNode } from "./lifeNodes/LifeNode";
import { LifeNodeData } from "@/domain/LifeNodeData";
import { useSvgControls } from "./useSvgControls";
import { LifeDependency } from "./lifeDependencies/LifeDependency";
import { LifeDependencySvgDefinitions } from "./lifeDependencies/LifeDependencySvgDefinitions";

type SvgBoardProps = {
  lifeNodes: LifeNodeData[];
  saveLifeNodePosition: (nodeId: string, x: number, y: number) => void;
};

export const SvgBoard = ({
  lifeNodes,
  saveLifeNodePosition,
}: SvgBoardProps) => {
  const { svgProps, lifeNodeProps, realTimeLifeNodes } = useSvgControls({
    saveLifeNodePosition,
    storedLifeNodes: lifeNodes,
  });

  const lifeNodesById = Object.fromEntries(
    realTimeLifeNodes.map((node) => [node.nodeId, node])
  );

  const dependencies = realTimeLifeNodes.flatMap((node) =>
    node.dependencies.map((dependency) => [node.nodeId, dependency])
  );

  return (
    <svg style={{ width: "100vw", height: "100vh" }} {...svgProps}>
      <LifeDependencySvgDefinitions />
      {dependencies.map(([source, destination]) => (
        <LifeDependency
          key={JSON.stringify([source, destination])}
          source={lifeNodesById[source]}
          destination={lifeNodesById[destination]}
        />
      ))}
      {realTimeLifeNodes.map((lifeNode) => (
        <LifeNode
          key={lifeNode.nodeId}
          {...lifeNode}
          setSelected={lifeNodeProps.setSelected}
        />
      ))}
    </svg>
  );
};
