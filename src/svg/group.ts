import { convertRectStyle } from "./rect";
import { convertSymbolStyle } from "./symbol";
import {
  convertCommonStyle,
  convertStyleToString,
  convertTransformStyle,
} from "./util";
import type { IGroup } from "@visactor/vrender-core";

export function generateClipPathId(group: IGroup) {
  return `clip-path-${group._uid}`;
}

export function convertGroupStyle(
  attribute: any = {},
  graphic: any
): Record<string, any> {
  const style: Record<string, any> = {};
  let { clip, cornerRadius, path, stroke, fill } = attribute;
  const clipPaths: string[] = [];

  if (clip || path) {
    if (!path) {
      const bounds = graphic.AABBBounds;
      const attribute = {
        x: bounds.x1,
        y: bounds.y1,
        width: bounds.width(),
        height: bounds.height(),
        cornerRadius,
      };
      path = [
        {
          type: "rect",
          attribute,
        },
      ];
    }

    path.forEach((entry: any) => {
      const commonStyle = {
        ...convertCommonStyle(attribute, entry),
        ...convertCommonStyle(entry.attribute, entry),
      };
      const transformStyle = convertTransformStyle(entry.attribute, entry);
      if (entry.type === "rect") {
        const rectStyle = convertRectStyle(entry.attribute, entry);

        if (rectStyle.roundedPath) {
          clipPaths.push(
            `<path ${convertStyleToString({
              fill: "none",
              ...commonStyle,
              ...transformStyle,
            })} d="${style.roundedPath}"/>`
          );
        } else {
          clipPaths.push(
            `<rect ${convertStyleToString({
              fill: "none",
              ...commonStyle,
              ...transformStyle,
              ...rectStyle,
            })} />`
          );
        }
      } else if (entry.type === "symbol") {
        clipPaths.push(
          `<path ${convertStyleToString({
            fill: "none",
            ...commonStyle,
            ...transformStyle,
            ...convertSymbolStyle(entry.attribute, entry),
          })} />`
        );
      }
    });

    if (clipPaths.length) {
      if (clip) {
        const clipPathId = generateClipPathId(graphic);

        style.clipString = `<clipPath id="${clipPathId}">
            ${clipPaths.join("")}
          </clipPath>`;
        style["clip-path"] = `url(#${clipPathId})`;
      }

      if (stroke || fill) {
        style.outlinePath = clipPaths.join("");
      }
    }
  }

  return style;
}
