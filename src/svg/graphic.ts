import { convertArcStyle } from "./arc";
import { generatePattern, generatePatternId } from "./parttern";
import { convertPolygonStyle } from "./polygon";
import { convertRectStyle } from "./rect";
import { convertGroupStyle } from "./group";
import { convertSymbolStyle } from "./symbol";
import {
  convertStyleToString,
  convertCommonStyle,
  convertTransformStyle,
  scientificToDecimal,
  convertTextStyle,
  convertTextContent,
  convertRichTextContent,
  generateGradient,
  generateDefs,
} from "./util";
import { convertAreaStyle } from "./area";
import { convertLineStyle } from "./line";
import { generateShadow, generateShadowId } from "./shadow";

export const generateSvgNode = (
  graphic: any,
  type: string,
  style: any,
  defs: { shadow?: string; pattern?: string; gradient?: string }
): string => {
  const name = graphic.name;

  if (name) {
    style.class = name;
  }
  const defContent = generateDefs(defs);

  let nodeStr = `${defContent}<${type} ${convertStyleToString(style)} ${
    defs && defs.shadow
      ? 'filter="url(#' + generateShadowId(graphic) + ')"'
      : ""
  } />`;

  if (defs) {
    if (defs.pattern) {
      if (name) {
        style.class = `${name}-pattern`;
      }
      style.fill = `url(#${generatePatternId(graphic)})`;

      nodeStr = `${nodeStr}<${type} ${convertStyleToString(style)} />`;
    }
  }

  return nodeStr;
};

export const parseSimpleGraphic = (attribute: any, group: any) => {
  const commonStyle = convertCommonStyle(attribute, group);
  const defs = {
    gradient: generateGradient(attribute, group),
    pattern: generatePattern(attribute, group),
    shadow: generateShadow(attribute, group),
  };

  if (group.type === "arc") {
    return generateSvgNode(
      group,
      "path",
      {
        fill: "none",
        ...commonStyle,
        ...convertTransformStyle(attribute, group),
        ...convertArcStyle(attribute, group),
      },
      defs
    );
  }

  if (group.type === "polygon") {
    return generateSvgNode(
      group,
      "path",
      {
        fill: "none",
        ...commonStyle,
        ...convertTransformStyle(attribute, group),
        ...convertPolygonStyle(attribute, group),
      },
      defs
    );
  }

  if (group.type === "path") {
    let customPath = group.toCustomPath().toString();

    return generateSvgNode(
      group,
      "path",
      {
        fill: "none",
        ...commonStyle,
        ...convertTransformStyle(attribute, group),
        d: scientificToDecimal(customPath),
      },
      defs
    );
  }

  if (group.type === "symbol") {
    return generateSvgNode(
      group,
      "path",
      {
        ...commonStyle,
        ...convertTransformStyle(attribute, group),
        ...convertSymbolStyle(attribute, group),
      },
      defs
    );
  }

  if (group.type === "text") {
    return `${generateDefs(defs)}<g ${convertStyleToString({
      ...commonStyle,
      ...convertTransformStyle(attribute, group),
      ...convertTextStyle(attribute, group),
      class: group.name,
    })}>${convertTextContent(attribute, group)}</g>`;
  }

  if (group.type === "richtext") {
    return `${generateDefs(defs)}<g ${convertStyleToString({
      ...commonStyle,
      ...convertTransformStyle(attribute, group),
      ...convertTextStyle(attribute, group),
      class: group.name,
    })}>${convertRichTextContent(attribute, group)}</g>`;
  }

  if (group.type === "line") {
    const { d, segmentsStyles, ...lineStyles } = convertLineStyle(
      attribute,
      group
    );
    const linePaths = d
      .map((path: string, index: number) => {
        const segStyle = segmentsStyles
          ? {
              ...commonStyle,
              ...convertCommonStyle(segmentsStyles[index], {
                _uid: `${group._uid}_${index}`,
              }),
            }
          : commonStyle;

        return `<path ${convertStyleToString({
          ...segStyle,
          ...lineStyles,
          d: path,
          fill: "none",
          class: group.name,
        })} />`;
      })
      .join("");

    return `${generateDefs(defs)}${linePaths}`;
  }

  if (group.type === "area") {
    const { strokePaths, segmentsStyles, d, ...areaStyles } = convertAreaStyle(
      attribute,
      group
    );

    let strokeStyle: any = {};
    let strokePath = "";

    if (strokePaths) {
      const stroke =
        attribute.stroke && attribute.stroke instanceof Array
          ? attribute.stroke
          : [
              attribute.stroke,
              attribute.stroke,
              attribute.stroke,
              attribute.stroke,
            ];

      stroke.forEach((strokeValue: string | boolean, strokeIndex: number) => {
        if (strokeValue) {
          strokePath += strokePaths
            .map((entry: any, segIndex: number) => {
              const segStyle = segmentsStyles
                ? {
                    ...commonStyle,
                    ...convertCommonStyle(segmentsStyles[segIndex], {
                      _uid: `${group._uid}_${segIndex}`,
                    }),
                  }
                : commonStyle;

              return entry && entry.length
                ? `<path ${convertStyleToString({
                    ...segStyle,
                    ...areaStyles,
                    d: entry[strokeIndex],
                    fill: "none",
                    stroke: strokeValue,
                  })} />`
                : "";
            })
            .join("");
        }
      });
    } else if (attribute.stroke) {
      strokeStyle.stroke = commonStyle.stroke;
    }

    const fillPaths = d
      .map((path: string, index: number) => {
        const mockGraphic = segmentsStyles
          ? {
              _uid: `${group._uid}_${index}`,
            }
          : {};
        const segStyle = segmentsStyles
          ? {
              ...attribute,
              ...segmentsStyles[index],
            }
          : commonStyle;

        const segGradient = segmentsStyles
          ? generateGradient(segStyle, mockGraphic)
          : defs.gradient;
        const segPattern = segmentsStyles
          ? generatePattern(segStyle, mockGraphic)
          : defs.gradient;

        return generateSvgNode(
          segmentsStyles ? mockGraphic : group,
          "path",
          {
            ...convertCommonStyle(segStyle, mockGraphic),
            ...areaStyles,
            ...strokeStyle,
            d: path,
          },
          { gradient: segGradient, pattern: segPattern }
        );
      })
      .join("");

    return `${generateDefs(defs)}${fillPaths}${strokePath}`;
  }

  if (group.type === "rect") {
    const { roundedPath, ...sizeAttrs } = convertRectStyle(attribute, group);

    if (roundedPath) {
      return generateSvgNode(
        group,
        "path",
        {
          ...commonStyle,
          ...convertTransformStyle(attribute, group),
          d: roundedPath,
        },
        defs
      );
    } else {
      return generateSvgNode(
        group,
        "rect",
        {
          ...commonStyle,
          ...convertTransformStyle(attribute, group),
          ...sizeAttrs,
        },
        defs
      );
    }
  }

  if (group.type === "image") {
    const { roundedPath, ...sizeAttrs } = convertRectStyle(attribute, group);
    return generateSvgNode(
      group,
      "image",
      {
        ...commonStyle,
        ...convertTransformStyle(attribute, group),
        ...sizeAttrs,
        href: attribute.image,
      },
      defs
    );
  }

  return "";
};

export const parseGroup = (group: any): string => {
  if (!group) {
    return "";
  }
  const combinedTheme = group.theme?.combinedTheme?.[group.type] ?? {};
  const attribute = { ...combinedTheme, ...group.attribute };

  if (!group.isValid() || attribute.visible === false) {
    return "";
  }

  if (group.type === "group") {
    const commonStyle = convertCommonStyle(attribute, group);
    const gradientStr = generateGradient(attribute, group);
    const patternStr = generatePattern(attribute, group);
    const children = group.children;
    children.sort((a: any, b: any) => {
      return (a.attribute.zIndex ?? 0) - (b.attribute.zIndex ?? 0);
    });
    const name = group.name ?? "";
    const groupStyle = convertGroupStyle(attribute, group);

    if (groupStyle["clip-path"]) {
      commonStyle["clip-path"] = groupStyle["clip-path"];
    }

    const defsContent =
      gradientStr || patternStr || groupStyle.clipString
        ? `<defs>${gradientStr}${patternStr}${groupStyle.clipString}</defs>`
        : "";

    return `<g class="${name}" ${convertStyleToString({
      ...commonStyle,
      ...convertTransformStyle(attribute, group),
    })}>${groupStyle.outlinePath || ""}${defsContent}${
      children && children.length
        ? children.map((child: any) => parseGroup(child)).join("")
        : ""
    }</g>`;
  } else if (group.type === "glyph") {
    const gradientStr = generateGradient(attribute, group);
    const patternStr = generatePattern(attribute, group);
    const defsContent =
      gradientStr || patternStr
        ? `<defs>${gradientStr}${patternStr}</defs>`
        : "";
    const sub = group.getSubGraphic();
    const subStr =
      sub && sub.length
        ? sub
            .map((child: any) => {
              child.attribute = { ...attribute, ...child.attribute };
              return parseGroup(child);
            })
            .join("")
        : "";

    return `${defsContent}<g class="${name}">${subStr}</g>`;
  }

  return parseSimpleGraphic(attribute, group);
};
