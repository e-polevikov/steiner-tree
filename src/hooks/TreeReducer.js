

export function treeReducer(tree, action) {
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
