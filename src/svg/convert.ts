import { parseGroup } from "./graphic";
import {
  convertCommonStyle,
  convertStyleToString,
  generateGradient,
} from "./util";

export const convertVChartToSvg = (vchart: any): string => {
  if (!vchart) {
    return "";
  }
  const stage = vchart.getStage();

  if (!stage) {
    return "";
  }
  const viewBox = stage.viewBox;
  const x = viewBox.x1;
  const y = viewBox.y1;
  const width = viewBox.width();
  const height = viewBox.height();
  const attrs = {
    x: `${x}px`,
    y: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    viewBox: `${x} ${y} ${width} ${height}`,
  };
  const background = stage.background;
  let backgroundRect = "";

  if (background) {
    const style = convertCommonStyle({ fill: background }, stage);
    const gradientStr = generateGradient(style, stage);
    const defs = gradientStr ? `<defs>${gradientStr}</defs>` : "";

    backgroundRect = `${defs}<rect x="${x}" y="${y}" width="${width}" height="${height}" pointer-events="none" ${convertStyleToString(
      style
    )}  />`;
  }

  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ${convertStyleToString(
    attrs
  )} >
  ${backgroundRect}
  ${stage.children.map((child: any) => parseGroup(child)).join("")}
</svg>`;
};
