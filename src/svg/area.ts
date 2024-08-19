import { convertCommonStyle, parsePathFromCurves, parsePoints } from "./util";

export function parseAreaLine(point: any) {
  const x = point.x;
  const y = point.y;
  const y1 = point.y1 ?? point.y;
  const x1 = point.x1 ?? point.x;

  return `M${x},${y}L${x1},${y1}`;
}

export function convertAreaStyle(
  attribute: any = {},
  graphic: any
): Record<string, any> {
  const style: Record<string, any> = {};
  let cacheArea =
    graphic.cacheArea instanceof Array
      ? graphic.cacheArea
      : graphic.cacheArea
      ? [graphic.cacheArea]
      : null;

  if (cacheArea && cacheArea.length) {
    const paths: string[] = [];
    const strokePaths: string[][] = [];
    cacheArea.forEach((cache: any) => {
      const { top, bottom } = cache;
      if (
        top &&
        top.curves &&
        top.curves.length &&
        bottom &&
        bottom.curves &&
        bottom.curves.length
      ) {
        const count = top.curves.length;
        let startIndex = 0;
        let endIndex = top.curves.findIndex((curve: any, index: number) => {
          return !curve.defined && index > startIndex;
        });

        while (
          startIndex < count &&
          endIndex !== startIndex &&
          startIndex !== -1
        ) {
          if (endIndex === -1) {
            endIndex = count;
          }
          const topPath = parsePathFromCurves(
            top.curves.slice(startIndex, endIndex)
          );
          const bottomPath = parsePathFromCurves(
            bottom.curves.slice(count - endIndex, count - startIndex)
          );

          paths.push(`${topPath}L${bottomPath.slice(1)}Z`);
          strokePaths.push([
            topPath,
            `M${top._lastX},${top._lastY}L${bottom._startX},${bottom._startY}`,
            bottomPath,
            `M${bottom._lastX},${bottom._lastY}L${top._startX},${top._startY}`,
          ]);

          startIndex = top.curves.slice(endIndex).findIndex((curve: any) => {
            return curve.defined;
          });

          if (startIndex >= 0) {
            startIndex += endIndex;

            endIndex = top.curves.slice(startIndex).findIndex((curve: any) => {
              return !curve.defined;
            });

            if (endIndex >= 0) {
              endIndex += startIndex;
            } else {
              endIndex = count;
            }
          }
        }
      }
    });
    style.d = paths;
    style.strokePaths = strokePaths;
  } else {
    style.d = [graphic.toCustomPath().toString()];
    const parseAreaStrokePaths = (points: any[]) => {
      if (!points || !points.length) {
        return [];
      }

      const first = points[0];
      const last = points[points.length - 1];

      return [
        parsePoints(points),
        parseAreaLine(last),
        parsePoints(
          points.map((entry) => {
            return { x: entry.x1 ?? entry.x, y: entry.y1 ?? entry.y };
          })
        ),
        parseAreaLine(first),
      ];
    };

    style.strokePaths =
      attribute.segments && attribute.segments.length
        ? attribute.segments.map(parseAreaStrokePaths)
        : [parseAreaStrokePaths(attribute.points)];
  }

  if (attribute.segments && attribute.segments.length) {
    style.segmentsStyles = attribute.segments.map((seg: any) => seg);
  }

  return style;
}
