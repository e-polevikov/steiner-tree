

export function getSegmentsLength(segments) {
  let totalLength = 0;

  for (let i = 0; i < segments.length; i++) {
    totalLength += Math.abs(segments[i].x1 - segments[i].x2);
    totalLength += Math.abs(segments[i].y1 - segments[i].y2);
  }

  return totalLength;
}
