import { Line, Circle } from 'react-konva';

import { GRID_INDENT } from '../../constants/GeomStage';

export function Segment({ segment }) {
  if (!segment.visible) {
    return (
      <></>
    );
  }

  return (
    <>
      <Circle
        x={segment.x1}
        y={segment.y1}
        radius={GRID_INDENT / 6}
        fill={'black'}
      />
      <Circle
        x={segment.x2}
        y={segment.y2}
        radius={GRID_INDENT / 6}
        fill={'black'}
      />
      <Line
        points={[segment.x1, segment.y1, segment.x2, segment.y2]}
        stroke={'black'}
        strokeWidth={0.75}
      />
    </>
  );
}
