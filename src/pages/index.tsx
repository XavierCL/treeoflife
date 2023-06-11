import { SvgBoard } from "@/client/SvgBoard";
import { useLifeTreeData } from "@/client/useLifeTreeData";

export default function Home() {
  const { lifeTree, updateNode, addNode } = useLifeTreeData();

  return (
    <SvgBoard
      lifeNodes={lifeTree}
      saveLifeNodePosition={updateNode}
      addNode={addNode}
    />
  );
}
