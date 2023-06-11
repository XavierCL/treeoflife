import { LifeNodeData } from "@/domain/LifeNodeData";
import { randomBytes } from "crypto";
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

  const updateNode = useCallback((nodeId: string, x: number, y: number) => {
    setLifeTree((oldTree) => {
      const updatedTree = oldTree.map((lifeNode) =>
        lifeNode.nodeId === nodeId ? { ...lifeNode, x, y } : lifeNode
      );

      storeNodes(updatedTree);

      return updatedTree;
    });
  }, []);

  const addNode = useCallback(
    (parent: string, { x, y }: { x: number; y: number }) => {
      const newNode: LifeNodeData = {
        nodeId: randomBytes(20).toString("hex"),
        dependencies: [parent],
        name: "new node",
        x,
        y,
      };

      setLifeTree((oldTree) => {
        const updatedTree = [...oldTree, newNode];

        // Client / server Race condition in case a node is added and moved quickly. Tree should be sent with a version number
        storeNodes(updatedTree);

        return updatedTree;
      });
    },
    []
  );

  return { lifeTree, updateNode, addNode };
};

const STORE_HEADERS = new Headers();
STORE_HEADERS.set("Content-Type", "application/json");

const storeNodes = async (tree: LifeNodeData[]) => {
  fetch("/api/lifetree", {
    method: "POST",
    headers: STORE_HEADERS,
    body: JSON.stringify(tree),
  });
};
