import { useState, useReducer } from 'react';
import { Stage, Layer } from 'react-konva';

import { STAGE_WIDTH, STAGE_HEIGHT, GRID_INDENT } from '../../constants/GeomStage';
import { INITIAL_TREE } from '../../constants/Level1';

import { StageGrid } from '../StageGrid/StageGrid';
import { Tree } from '../Tree/Tree';
import { Segment } from '../Segment/Segment';

import { treeReducer } from '../../hooks/TreeReducer';
import { getSegmentsLength } from '../../services/Segments';

import styles from './GeomStage.module.css';

export function GeomStage() {
  const [tree, treeDispatch] = useReducer(treeReducer, INITIAL_TREE);
  const [segment, setSegment] = useState({ visible: false });

  function handleMouseMove(event) {
    if (!segment.visible) { return; }

    const stage = event.target.getStage();
    const pointer = stage.getPointerPosition();

    let x = Math.round(pointer.x / GRID_INDENT) * GRID_INDENT;
    let y = Math.round(pointer.y / GRID_INDENT) * GRID_INDENT;

    let xDist = Math.abs(x - segment.x2);
    let yDist = Math.abs(y - segment.y2);

    if (xDist < yDist) {
      x = segment.x2;
    } else {
      y = segment.y2;
    }

    setSegment({...segment, x1: x, y1: y});
  }

  function handleClick(event) {
    if (!segment.visible) { return; }

    treeDispatch({
      type: "ADD_SEGMENT",
      segment: {
        x1: Math.round(segment.x1 / GRID_INDENT),
        y1: Math.round(segment.y1 / GRID_INDENT),
        x2: Math.round(segment.x2 / GRID_INDENT),
        y2: Math.round(segment.y2 / GRID_INDENT)
      }
    });
    setSegment({...segment, visible: false });
  }

  return (
    <div>
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
              <Segment segment={segment} />
              <Tree
                tree={tree}
                treeDispath={treeDispatch}
                setSegment={setSegment}
              />
            </Layer>
          </Stage>
        </div>
      </div>
      <div>
        Суммарная длина отрезков: {getSegmentsLength(tree.segments)}
      </div>
    </div>
  );
}
