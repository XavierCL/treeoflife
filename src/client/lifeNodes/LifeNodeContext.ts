import { createContext } from "react";

export type LifeNodeContextType = Partial<{ nodeWidth: number }>;
export const lifeNodeContext = createContext<LifeNodeContextType>({});
