import { Circle } from 'react-konva';

import { GRID_INDENT } from "../../constants/GeomStage";

export function Tree({ tree, setSegment }) {
  function handleClick(event) {
    let x = event.target.x();
    let y = event.target.y();
    setSegment({
      x1: x, y1: y,
      x2: x, y2: y,
      visible: true
    });
  }

  return (
    <>
      {tree.points.map((point) => (
        <Circle
          id={point.id}
          key={point.id}
          x={point.x * GRID_INDENT}
          y={point.y * GRID_INDENT}
          radius={GRID_INDENT / 6}
          fill={'black'}
          onClick={handleClick}
        />
      ))}
    </>
  );
}
