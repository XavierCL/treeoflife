import { LifeNode } from "./LifeNode";
import { LifeNodeData } from "@/domain/LifeNodeData";
import { useSvgControls } from "./useSvgControls";

type SvgBoardProps = {
  lifeNodes: LifeNodeData[];
  saveLifeNodePosition: (nodeId: string, x: number, y: number) => void;
};

export const SvgBoard = ({
  lifeNodes,
  saveLifeNodePosition,
}: SvgBoardProps) => {
  const { svgProps, lifeNodeProps } = useSvgControls({ saveLifeNodePosition });

  return (
    <svg style={{ width: "100vw", height: "100vh" }} {...svgProps}>
      {lifeNodes.map((lifeNode) =>
        lifeNodeProps.selectedPosition?.nodeId === lifeNode.nodeId ? (
          <LifeNode
            key={lifeNode.nodeId}
            {...lifeNode}
            x={lifeNodeProps.selectedPosition.x}
            y={lifeNodeProps.selectedPosition.y}
            setSelected={lifeNodeProps.setSelected}
          />
        ) : (
          <LifeNode
            key={lifeNode.nodeId}
            {...lifeNode}
            setSelected={lifeNodeProps.setSelected}
          />
        )
      )}
    </svg>
  );
};
