import { isNil, parseCornerRadiusPath } from "./util";

export function convertRectStyle(
  attribute: any = {},
  graphic: any
): Record<string, any> {
  const style: Record<string, any> = {};
  let { x = 0, y = 0, width = 0, height = 0, cornerRadius } = attribute;

  if (!isNil(attribute.width)) {
    width = attribute.width;
  } else if (!isNil(attribute.x1)) {
    width = Math.abs(attribute.x1 - x);
    x = Math.min(x, attribute.x1);
  }

  if (!isNil(attribute.height)) {
    height = attribute.height;
  } else if (!isNil(attribute.y1)) {
    height = Math.abs(attribute.y1 - y);
    y = Math.min(y, attribute.y1);
  }

  style.x = x - (attribute.x ?? 0);
  style.y = y - (attribute.y ?? 0);
  style.width = width;
  style.height = height;

  if (
    (Array.isArray(cornerRadius) &&
      cornerRadius.every((entry) => entry === cornerRadius[0])) ||
    cornerRadius === +cornerRadius
  ) {
    const maxCornerRadius = Math.min(cornerRadius, width / 2, height / 2);
    style.rx = maxCornerRadius;
    style.ry = maxCornerRadius;
  } else if (Array.isArray(cornerRadius)) {
    style.roundedPath = parseCornerRadiusPath(
      [
        { x: style.x, y: style.y },
        { x: style.x + style.width, y: style.y },
        { x: style.x + style.width, y: style.y + style.height },
        { x: style.x, y: style.y + style.height },
      ],
      cornerRadius,
      true
    );
  }

  return style;
}
