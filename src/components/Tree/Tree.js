import { Circle, Line } from 'react-konva';

import { GRID_INDENT } from "../../constants/GeomStage";

export function Tree({ tree, treeDispath, setSegment }) {
  function handleCircleClick(event) {
    let x = event.target.x();
    let y = event.target.y();

    setSegment({
      x1: x, y1: y,
      x2: x, y2: y,
      visible: true
    });
  }

  function handleCircleDblClick(event) {
    treeDispath({
      type: "REMOVE_POINT",
      pointId: Number(event.target.id())
    });
  }

  function handleLineDblClick(event) {
    treeDispath({
      type: "REMOVE_SEGMENT",
      segmentId: Number(event.target.id())
    });
  }

  return (
    <>
      {tree.segments.map((segment, segmentId) => (
        <Line
          id={String(segmentId)}
          key={String(segmentId)}
          points={[
            segment.x1 * GRID_INDENT, segment.y1 * GRID_INDENT,
            segment.x2 * GRID_INDENT, segment.y2 * GRID_INDENT
          ]}
          stroke={'black'}
          strokeWidth={15.0}
          opacity={0.5}
          onDblClick={handleLineDblClick}
        />
      ))}
      {tree.points.map((point, pointId) => (
        <Circle
          id={String(pointId)}
          key={String(pointId)}
          x={point.x * GRID_INDENT}
          y={point.y * GRID_INDENT}
          radius={GRID_INDENT / 4}
          fill={point.predefined ? 'green' : 'black'}
          onClick={handleCircleClick}
          onDblClick={handleCircleDblClick}
        />
      ))}
    </>
  );
}
