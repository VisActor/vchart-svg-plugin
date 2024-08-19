/**
 * algorithm detail see: https://stackoverflow.com/a/24780108
 */

import { IPolygon, IPolygonGraphicAttribute } from "@visactor/vrender-core";
import { parseCornerRadiusPath } from "./util";

export function convertPolygonStyle(
  attribute: IPolygonGraphicAttribute = {},
  graphic: IPolygon
): Record<string, any> {
  const style: Record<string, any> = {};
  const { cornerRadius, points, closePath } = attribute;

  if (cornerRadius) {
    style.d = parseCornerRadiusPath(
      points as { x: number; y: number }[],
      cornerRadius,
      closePath
    );
  } else {
    let customPath = (graphic as any).toCustomPath().toString();

    if (!closePath) {
      customPath = customPath.slice(0, customPath.length - 1);
    }

    style.d = customPath;
  }

  return style;
}