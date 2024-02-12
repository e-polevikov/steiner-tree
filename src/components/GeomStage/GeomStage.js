import { useState, useReducer } from 'react';
import { Stage, Layer, Circle } from 'react-konva';

import { STAGE_WIDTH, STAGE_HEIGHT, GRID_INDENT } from '../../constants/GeomStage';
import { StageGrid } from '../StageGrid/StageGrid';
import { Tree } from '../Tree/Tree';
import { Segment } from '../Segment/Segment';

import styles from './GeomStage.module.css';

const INITIAL_TREE = {
  points: [{
    id: "0", x: 1, y: 1
  }, {
    id: "1", x: 5, y: 1
  }, {
    id: "2", x: 6, y: 6
  }, {
    id: "3", x: 2, y: 7
  }],
  segments: [],
};

function treeReducer(tree, action) {
  return tree;
}

export function GeomStage() {
  const [tree, treeDispatch] = useReducer(treeReducer, INITIAL_TREE);
  const [segment, setSegment] = useState({ visible: false });

  function handleMouseMove(event) {
    if (!segment.visible) { return; }

    const stage = event.target.getStage();
    const pointer = stage.getPointerPosition();

    let x = Math.round(pointer.x / GRID_INDENT) * GRID_INDENT;
    let y = Math.round(pointer.y / GRID_INDENT) * GRID_INDENT;

    setSegment({...segment, x1: x, y1: y});
  }

  function handleClick(event) {
    if (!segment.visible) { return; }

    treeDispatch({ type: "ADD_SEGMENT", segment: segment});
    setSegment({...segment, visible: false });
  }

  return (
    <div className={styles['geom-stage']}>
      <div className={styles['stage']}>
        <Stage
          width={STAGE_WIDTH}
          height={STAGE_HEIGHT}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          <Layer>
            <StageGrid
              stageWidth={STAGE_WIDTH}
              stageHeight={STAGE_HEIGHT}
              gridIndent={GRID_INDENT}
            />
            <Tree tree={tree} setSegment={setSegment} />
            <Segment segment={segment} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
