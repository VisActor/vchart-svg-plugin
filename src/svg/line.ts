import { convertCommonStyle, parsePathFromCurves } from "./util";

export function convertLineStyle(
  attribute: any = {},
  graphic: any
): Record<string, any> {
  const style: Record<string, any> = {};
  const cache = Array.isArray(graphic.cache)
    ? graphic.cache
    : graphic.cache
    ? [graphic.cache]
    : null;

  if (cache && cache.length) {
    const paths: string[] = [];
    cache.forEach((cache: any) => {
      if (cache && cache.curves && cache.curves.length) {
        paths.push(parsePathFromCurves(cache.curves));
      }
    });

    style.d = paths;
  } else {
    style.d = [graphic.toCustomPath().toString()];
  }

  if (attribute.segments && attribute.segments.length) {
    style.segmentsStyles = attribute.segments.map((seg: any) => seg);
  }

  return style;
}
