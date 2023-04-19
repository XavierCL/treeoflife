import { LifeNodeData } from "@/domain/LifeNodeData";
import { useCallback, useEffect, useState } from "react";

export const useLifeTreeData = () => {
  const [lifeTree, setLifeTree] = useState<LifeNodeData[]>([]);

  useEffect(() => {
    const fetchLifeTree = async () => {
      const response = await fetch("/api/lifetree");
      const fetchedLifeTree = await response.json();
      setLifeTree(fetchedLifeTree);
    };

    fetchLifeTree();
  }, []);

  const updateNode = useCallback(
    (nodeId: string, x: number, y: number) => {
      const updatedTree = lifeTree.map((lifeNode) =>
        lifeNode.nodeId === nodeId ? { ...lifeNode, x, y } : lifeNode
      );

      setLifeTree(updatedTree);

      const storeHeaders = new Headers();
      storeHeaders.set("Content-Type", "application/json");
      fetch("/api/lifetree", {
        method: "POST",
        headers: storeHeaders,
        body: JSON.stringify(updatedTree),
      });
    },
    [lifeTree]
  );

  return { lifeTree, updateNode };
};
