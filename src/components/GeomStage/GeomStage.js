import { useState, useReducer } from 'react';
import { Stage, Layer } from 'react-konva';

import { STAGE_WIDTH, STAGE_HEIGHT, GRID_INDENT } from '../../constants/GeomStage';
import { StageGrid } from '../StageGrid/StageGrid';
import { Tree } from '../Tree/Tree';
import { Segment } from '../Segment/Segment';

import styles from './GeomStage.module.css';

const INITIAL_TREE = {
  points: [
    {x: 1, y: 1, predefined: true},
    {x: 5, y: 1, predefined: true},
    {x: 6, y: 6, predefined: true},
    {x: 2, y: 7, predefined: true}
  ],
  segments: [],
};

function treeReducer(tree, action) {
  let updatedTree = JSON.parse(JSON.stringify(tree));

  if (action.type === "ADD_SEGMENT") {
    let segment = action.segment;

    updatedTree.segments.push({
      x1: Math.round(segment.x1 / GRID_INDENT),
      y1: Math.round(segment.y1 / GRID_INDENT),
      x2: Math.round(segment.x2 / GRID_INDENT),
      y2: Math.round(segment.y2 / GRID_INDENT)
    });

    let newPoint = {
      x: segment.x1 / GRID_INDENT,
      y: segment.y1 / GRID_INDENT
    };

    if (!updatedTree.points.some((point) => {
      return point.x === newPoint.x && point.y === newPoint.y;
    })) {
      updatedTree.points.push(newPoint);
    }
  }

  if (action.type === "REMOVE_SEGMENT") {
    let segmentId = action.segmentId;
    let segment = updatedTree.segments[segmentId];

    updatedTree.points = updatedTree.points.filter((point) => {
      if (point.predefined) {
        return true;
      }

      for (let i = 0; i < updatedTree.segments.length; i++) {
        if (i === segmentId) {
          continue;
        }

        let currSegment = updatedTree.segments[i];

        if (point.x === currSegment.x1 && point.y === currSegment.y1) {
          return true;
        }

        if (point.x === currSegment.x2 && point.y === currSegment.y2) {
          return true;
        }
      }

      return false;
    });

    updatedTree.segments.splice(segmentId, 1);
  }

  return updatedTree;
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

    treeDispatch({ type: "ADD_SEGMENT", segment: segment });
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
  );
}