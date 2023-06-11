export const LifeDependencySvgDefinitions = () => (
  <defs>
    <marker
      id="arrowhead"
      markerWidth="10"
      markerHeight="7"
      refX="34" // Not sure why this constant works, should be 10 + NODE_LIFE_WIDTH / 2
      refY="3.5"
      orient="auto"
    >
      <polygon points="0 0, 10 3.5, 0 7" />
    </marker>
  </defs>
);
