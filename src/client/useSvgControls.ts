import { useCallback, useState } from "react";

type SvgControlsProps = {
  saveLifeNodePosition: (nodeId: string, x: number, y: number) => void;
};

export const useSvgControls = ({
  saveLifeNodePosition,
}: SvgControlsProps): {
  svgProps: Partial<React.SVGProps<SVGSVGElement>>;
  lifeNodeProps: {
    setSelected: (
      nodeId: string,
      oldPosition: { x: number; y: number },
      mousePosition: { x: number; y: number }
    ) => void;
    selectedPosition?: { nodeId: string; x: number; y: number };
  };
} => {
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
    lifeNodeProps: {
      setSelected,
      selectedPosition: startDrag
        ? {
            nodeId: startDrag.nodeId,
            x: xPosition,
            y: yPosition,
          }
        : undefined,
    },
  };
};
