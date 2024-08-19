export function convertSymbolStyle(
  attribute: any = {},
  graphic: any
): Record<string, any> {
  const { size, symbolType } = attribute;
  const style: Record<string, any> = {};
  const path = graphic.getParsedPath();

  if (path.pathStr) {
    if (Array.isArray(size) && symbolType === "rect") {
      const [width, height] = size;
      style.d = `M${-width / 2},${-height / 2}L${width / 2},${-height / 2}L${
        width / 2
      },${height / 2}L${-width / 2},${height / 2}`;
    } else {
      if (symbolType === "star") {
        graphic.attribute.size = graphic.attribute.size / 2;
      }
      // built-in symbol
      style.d = graphic.toCustomPath().toString();
    }
  } else {
    const size = attribute.size;
    style.d = path.path
      .toString()
      .replace(/(-?\d+\.?\d*)/gi, (numStr: string) => {
        return `${parseFloat(numStr) * size}`;
      });
  }

  return style;
}
