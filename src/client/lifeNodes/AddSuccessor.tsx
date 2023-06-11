import { useContext } from "react";
import { lifeNodeContext } from "./LifeNodeContext";
import { CenteredSvgText } from "./CenteredSvgText";
import styles from "./linkButton.module.css";

type AddSuccessorProps = { onClick: () => void };

export const AddSuccessor = ({ onClick }: AddSuccessorProps) => {
  const lifeNode = useContext(lifeNodeContext);

  return (
    <>
      <rect
        className={styles["link-button"]}
        y={70}
        x={41}
        width={20}
        height={20}
        shapeRendering="crispEdges"
        onPointerUp={onClick}
      />
      <CenteredSvgText
        parentWidth={lifeNode.nodeWidth}
        textProps={{ y: 85, style: { pointerEvents: "none" } }}
      >
        +
      </CenteredSvgText>
    </>
  );
};
