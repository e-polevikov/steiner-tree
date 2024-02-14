
function horizontal(segment) {
  return segment.y1 === segment.y2;
}

function vertical(segment) {
  return segment.x1 === segment.x2
}

export function overlapHorizontally(segment1, segment2) {
  if (!(horizontal(segment1) && horizontal(segment2))) {
    return false;
  }

  if (segment1.y1 !== segment2.y1) {
    return false;
  }
  
  if (
    Math.min(segment1.x1, segment1.x2) <= Math.min(segment2.x1, segment2.x2) &&
    Math.max(segment1.x1, segment1.x2) <= Math.min(segment2.x1, segment2.x2)
  ) {
    return false;
  }

  if (
    Math.min(segment1.x1, segment1.x2) >= Math.max(segment2.x1, segment2.x2) &&
    Math.max(segment1.x1, segment1.x2) >= Math.max(segment2.x1, segment2.x2)
  ) {
    return false;
  }

  return true;
}

export function overlapVertically(segment1, segment2) {
  if (!(vertical(segment1) && vertical(segment2))) {
    return false;
  }

  if (segment1.x1 !== segment2.x1) {
    return false;
  }

  if (
    Math.min(segment1.y1, segment1.y2) <= Math.min(segment2.y1, segment2.y2) &&
    Math.max(segment1.y1, segment1.y2) <= Math.min(segment2.y1, segment2.y2)
  ) {
    return false;
  }

  if (
    Math.min(segment1.y1, segment1.y2) >= Math.max(segment2.y1, segment2.y2) &&
    Math.max(segment1.y1, segment1.y2) >= Math.max(segment2.y1, segment2.y2)
  ) {
    return false;
  }

  return true;
}

export function intersectHorizontally(segment1, segment2) {
  if (!(horizontal(segment1) && horizontal(segment2))) {
    return false;
  }

  if (segment1.y1 !== segment2.y1) {
    return false;
  }
  
  if (
    Math.min(segment1.x1, segment1.x2) < Math.min(segment2.x1, segment2.x2) &&
    Math.max(segment1.x1, segment1.x2) < Math.min(segment2.x1, segment2.x2)
  ) {
    return false;
  }

  if (
    Math.min(segment1.x1, segment1.x2) > Math.max(segment2.x1, segment2.x2) &&
    Math.max(segment1.x1, segment1.x2) > Math.max(segment2.x1, segment2.x2)
  ) {
    return false;
  }

  return true;
}

export function intersectVertically(segment1, segment2) {
  if (!(vertical(segment1) && vertical(segment2))) {
    return false;
  }

  if (segment1.x1 !== segment2.x1) {
    return false;
  }

  if (
    Math.min(segment1.y1, segment1.y2) < Math.min(segment2.y1, segment2.y2) &&
    Math.max(segment1.y1, segment1.y2) < Math.min(segment2.y1, segment2.y2)
  ) {
    return false;
  }

  if (
    Math.min(segment1.y1, segment1.y2) > Math.max(segment2.y1, segment2.y2) &&
    Math.max(segment1.y1, segment1.y2) > Math.max(segment2.y1, segment2.y2)
  ) {
    return false;
  }

  return true;
}

export function intersectPerpendicularly(segment1, segment2) {
  let horizontalSegment;
  let verticalSegment;

  if (horizontal(segment1) && vertical(segment2)) {
    horizontalSegment = segment1;
    verticalSegment = segment2;
  } else if (horizontal(segment2) && vertical(segment1)) {
    horizontalSegment = segment2;
    verticalSegment = segment1;
  } else {
    return false;
  }

  if (verticalSegment.x1 < Math.min(horizontalSegment.x1, horizontalSegment.x2)) {
    return false;
  }

  if (verticalSegment.x1 > Math.max(horizontalSegment.x1, horizontalSegment.x2)) {
    return false;
  }

  let minY = Math.min(verticalSegment.y1, verticalSegment.y2);
  let maxY = Math.max(verticalSegment.y1, verticalSegment.y2);

  return minY <= horizontalSegment.y1 && maxY >= horizontalSegment.y1;
}

export function intersect(segment1, segment2) {
  return intersectHorizontally(segment1, segment2) ||
    intersectVertically(segment1, segment2) ||
    intersectPerpendicularly(segment1, segment2);
}

export function getLength(segment) {
  let length = 0;

  length += Math.abs(segment.x1 - segment.x2);
  length += Math.abs(segment.y1 - segment.y2);

  return length;
}

export function getTotalLength(segments) {
  let totalLength = 0;

  for (let i = 0; i < segments.length; i++) {
    totalLength += getLength(segments[i]);
  }

  return totalLength;
}

export function connected(tree) {
  return false;
}