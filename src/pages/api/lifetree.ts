import { LifeNodeData } from "@/domain/LifeNodeData";
import { getLifeTree, saveLifeTree } from "@/server/lifeTreeStore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LifeNodeData[]>
) {
  if (req.method === "GET") {
    const lifeTree = await getLifeTree();
    res.status(200).json(lifeTree);
  } else if (req.method === "POST") {
    const newLifeTree: LifeNodeData[] = req.body;
    await saveLifeTree(newLifeTree);
    res.status(201).end();
  }
}
