import { LifeNodeData } from "@/domain/LifeNodeData";
import { readFile, writeFile } from "fs/promises";

const SAVE_PATH = "store/xclebel.json";

export const getLifeTree = async () => {
  try {
    const buffer = await readFile(SAVE_PATH);
    const treeString = buffer.toString("utf8");
    return JSON.parse(treeString);
  } catch (error) {
    console.error("Error reading tree file", error);
    return [];
  }
};

export const saveLifeTree = (lifeTree: LifeNodeData[]) =>
  writeFile(SAVE_PATH, JSON.stringify(lifeTree));
