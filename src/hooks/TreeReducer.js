import {
  getLength,
  overlapHorizontally,
  overlapVertically,
  insideSegment,
  horizontal,
  vertical
} from "../services/Segments";

function removeSegment(tree, segmentId) {
  tree.points = tree.points.filter((point) => {
    if (point.predefined) {
      return true;
    }

    for (let i = 0; i < tree.segments.length; i++) {
      let currSegment = tree.segments[i];

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

  tree.segments.splice(segmentId, 1);  
}

function addSegment(tree, segment) {
  if (getLength(segment) === 0) {
    return;
  }

  for (let i = 0; i < tree.segments.length; i++) {
    let treeSegment = tree.segments[i];

    if (overlapHorizontally(segment, treeSegment)) {
      return;
    }

    if (overlapVertically(segment, treeSegment)) {
      return;
    }
  }

  tree.segments.push(segment);

  let newPoint = {
    x: segment.x1,
    y: segment.y1,
    predefined: false
  };

  if (!tree.points.some((point) => {
    return point.x === newPoint.x && point.y === newPoint.y;
  })) {
    tree.points.push(newPoint);
  }
}

function addPoint(tree, point) {
  let newPoint = {
    x: point.x,
    y: point.y,
    predefined: false
  };

  if (tree.points.some((point) => {
    return point.x === newPoint.x && point.y === newPoint.y;
  })) {
    return;
  }

  for (let i = 0; i < tree.segments.length; i++) {
    let currSegment = tree.segments[i];

    if (insideSegment(newPoint, currSegment)) {
      return;
    }
  }

  tree.points.push(newPoint);
}

function removePoint(tree, pointId) {
  let point = tree.points[pointId];

  if (point.predefined) {
    return;
  }
}

export function treeReducer(tree, action) {
  let updatedTree = JSON.parse(JSON.stringify(tree));

  switch (action.type) {
    case "ADD_SEGMENT":
      addSegment(updatedTree, action.segment);
      break;
    case "REMOVE_SEGMENT":
      removeSegment(updatedTree, action.segmentId);
      break;
    case "ADD_POINT":
      addPoint(updatedTree, action.point);
      break;
    case "REMOVE_POINT":
      removePoint(updatedTree, action.pointId);
      break;
  }

  return updatedTree;
}
