import { useContext } from "react";
import { lifeNodeContext } from "./LifeNodeContext";
import { CenteredSvgText } from "./CenteredSvgText";
import styles from "./linkButton.module.css";

export const AddSuccessor = () => {
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
