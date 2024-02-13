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

function getSegmentsLength(segments) {
  let totalLength = 0;

  for (let i = 0; i < segments.length; i++) {
    totalLength += Math.abs(segments[i].x1 - segments[i].x2);
    totalLength += Math.abs(segments[i].y1 - segments[i].y2);
  }

  return totalLength;
}

function treeReducer(tree, action) {
  let updatedTree = JSON.parse(JSON.stringify(tree));

  if (action.type === "ADD_SEGMENT") {
    let segment = action.segment;

    if (segment.x1 === segment.x2 && segment.y1 === segment.y2) {
      return updatedTree;
    }

    for (let i = 0; i < updatedTree.segments.length; i++) {
      let treeSegment = updatedTree.segments[i];

      if (segment.y1 === segment.y2 && treeSegment.y1 === treeSegment.y2) {
        if (segment.y1 !== treeSegment.y1) {
          continue;
        }

        if (
          Math.min(segment.x1, segment.x2) <= Math.min(treeSegment.x1, treeSegment.x2) &&
          Math.max(segment.x1, segment.x2) <= Math.min(treeSegment.x1, treeSegment.x2)
        ) {
          continue;
        }

        if (
          Math.min(segment.x1, segment.x2) >= Math.max(treeSegment.x1, treeSegment.x2) &&
          Math.max(segment.x1, segment.x2) >= Math.max(treeSegment.x1, treeSegment.x2)
        ) {
          continue;
        }

        return updatedTree;
      }

      if (segment.x1 === segment.x2 && treeSegment.x1 === treeSegment.x2) {
        if (segment.x1 !== treeSegment.x1) {
          continue;
        }

        if (
          Math.min(segment.y1, segment.y2) <= Math.min(treeSegment.y1, treeSegment.y2) &&
          Math.max(segment.y1, segment.y2) <= Math.min(treeSegment.y1, treeSegment.y2)
        ) {
          continue;
        }

        if (
          Math.min(segment.y1, segment.y2) >= Math.max(treeSegment.y1, treeSegment.y2) &&
          Math.max(segment.y1, segment.y2) >= Math.max(treeSegment.y1, treeSegment.y2)
        ) {
          continue;
        }

        return updatedTree;
      }
    }

    updatedTree.segments.push(segment);

    let newPoint = {
      x: segment.x1,
      y: segment.y1,
      predefined: false
    };

    if (!updatedTree.points.some((point) => {
      return point.x === newPoint.x && point.y === newPoint.y;
    })) {
      updatedTree.points.push(newPoint);
    }
  }

  if (action.type === "REMOVE_SEGMENT") {
    let segmentId = action.segmentId;

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
