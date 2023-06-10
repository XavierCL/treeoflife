import { LifeNodeData } from "@/domain/LifeNodeData";
import { useCallback, useState } from "react";

type SvgControlsProps = {
  saveLifeNodePosition: (nodeId: string, x: number, y: number) => void;
  storedLifeNodes: LifeNodeData[];
};

type SvgControlsReturn = {
  svgProps: Partial<React.SVGProps<SVGSVGElement>>;
  realTimeLifeNodes: LifeNodeData[];
  lifeNodeProps: {
    setSelected: (
      nodeId: string,
      oldPosition: { x: number; y: number },
      mousePosition: { x: number; y: number }
    ) => void;
  };
};

export const useSvgControls = ({
  saveLifeNodePosition,
  storedLifeNodes,
}: SvgControlsProps): SvgControlsReturn => {
  const [startDrag, setStartDrag] = useState<{
    nodeId: string;
    oldPosition: { x: number; y: number };
    mousePosition: { x: number; y: number };
  }>();
  const [endDrag, setEndDrag] = useState<{ x: number; y: number }>();

  const xPosition =
    (startDrag?.oldPosition.x ?? 0) +
    (endDrag?.x ?? 0) -
    (startDrag?.mousePosition.x ?? 0);

  const yPosition =
    (startDrag?.oldPosition.y ?? 0) +
    (endDrag?.y ?? 0) -
    (startDrag?.mousePosition.y ?? 0);

  const setSelected = useCallback(
    (
      nodeId: string,
      oldPosition: { x: number; y: number },
      mousePosition: { x: number; y: number }
    ) => {
      setStartDrag({ nodeId, oldPosition, mousePosition });
      setEndDrag(mousePosition);
    },
    [setStartDrag, setEndDrag]
  );

  const realTimeLifeNodes = storedLifeNodes.map((node) =>
    node.nodeId === startDrag?.nodeId
      ? { ...node, x: xPosition, y: yPosition }
      : node
  );

  return {
    svgProps: {
      onPointerMove: (event) => {
        if (!startDrag) return;

        setEndDrag({ x: event.clientX, y: event.clientY });
      },
      onPointerUp: () => {
        if (!startDrag || !endDrag) return;

        saveLifeNodePosition(startDrag.nodeId, xPosition, yPosition);
        setStartDrag(undefined);
        setEndDrag(undefined);
      },
    },
    realTimeLifeNodes,
    lifeNodeProps: {
      setSelected,
    },
  };
};
