import {
  getLength,
  overlapHorizontally,
  overlapVertically,
  insideSegment,
  horizontal,
  vertical
} from "../services/Segments";

export function treeReducer(tree, action) {
  let updatedTree = JSON.parse(JSON.stringify(tree));

  if (action.type === "ADD_SEGMENT") {
    let segment = action.segment;

    if (getLength(segment) === 0) {
      return updatedTree;
    }

    for (let i = 0; i < updatedTree.segments.length; i++) {
      let treeSegment = updatedTree.segments[i];

      if (overlapHorizontally(segment, treeSegment)) {
        return updatedTree;
      }

      if (overlapVertically(segment, treeSegment)) {
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

    return updatedTree;
  }

  if (action.type === "REMOVE_SEGMENT") {
    let segmentId = action.segmentId;

    updatedTree.points = updatedTree.points.filter((point) => {
      if (point.predefined) {
        return true;
      }

      for (let i = 0; i < updatedTree.segments.length; i++) {
        let currSegment = updatedTree.segments[i];

        if (i === segmentId) {
          if (!insideSegment(point, currSegment)) {
            return true;
          }

          if (
            horizontal(currSegment) &&
            point.x > Math.min(currSegment.x1, currSegment.x2) &&
            point.x < Math.max(currSegment.x1, currSegment.x2)
          ) {
            return true;
          }

          if (
            vertical(currSegment) &&
            point.y > Math.min(currSegment.y1, currSegment.y2) &&
            point.y < Math.max(currSegment.y1, currSegment.y2)
          ) {
            return true;
          }
        } else {
          if (point.x === currSegment.x1 && point.y === currSegment.y1) {
            return true;
          }

          if (point.x === currSegment.x2 && point.y === currSegment.y2) {
            return true;
          }
        }
      }

      return false;
    });

    updatedTree.segments.splice(segmentId, 1);

    return updatedTree;
  }

  if (action.type === "ADD_POINT") {
    let newPoint = {
      x: action.point.x,
      y: action.point.y,
      predefined: false
    };

    if (updatedTree.points.some((point) => {
      return point.x === newPoint.x && point.y === newPoint.y;
    })) {
      return updatedTree;
    }

    for (let i = 0; i < updatedTree.segments.length; i++) {
      let currSegment = updatedTree.segments[i];

      if (insideSegment(newPoint, currSegment)) {
        return updatedTree;
      }
    }

    updatedTree.points.push(newPoint);

    return updatedTree;
  }

  return updatedTree;
}
