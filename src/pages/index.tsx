import { LifeNode } from "@/domain/LifeNode";

export default function Home() {
  return (
    <svg width="100%" height="100%">
      <LifeNode name={"Hello"} x={170} y={500} />
    </svg>
  );
}
