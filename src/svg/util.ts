export const EPS = 1e-6;

export function scientificToDecimal(str: string) {
  // 如果不是科学计数法，直接返回原始数字
  return str.replace(
    /(-?\d+\.?\d*)e([+-]?\d+)/gi,
    (numStr: string, base: string, exponent: string) => {
      return (parseFloat(base) * Math.pow(10, parseInt(exponent, 10))).toFixed(
        2
      );
    }
  );
}

export function convertAttributeName(key: string): string {
  switch (key) {
    case "strokeOpacity":
      return "stroke-opacity";
    case "lineDash":
      return "stroke-dasharray";
    case "lineDashOffset":
      return "stroke-dashoffset";
    case "lineWidth":
      return "stroke-width";
    case "lineCap":
      return "stroke-linecap";
    case "lineJoin":
      return "stroke-linejoin";
    case "miterLimit":
      return "stroke-miterlimit";
    case "fillOpacity":
      return "fill-opacity";
    case "textAlign":
      return "text-anchor";
    case "textBaseline":
      return "alignment-baseline";
    case "fontSize":
      return "font-size";
    case "fontFamily":
      return "font-family";
    case "fontWeight":
      return "font-weight";
    case "fontVariant":
      return "font-variant";
    case "fontStyle":
      return "font-style";
    default:
      return key;
  }
}

export function isNil(value: any) {
  return value === null || value === undefined;
}

export function generateGradientKey(key: string, graphic: any) {
  return `gradient-${key}-${graphic._uid}`;
}

export function convertCommonStyle(
  attribute: any = {},
  graphic: any
): Record<string, any> {
  const keys = [
    "strokeOpacity",
    "lineDash",
    "lineDashOffset",
    "lineWidth",
    "lineCap",
    "lineJoin",
    "miterLimit",
    "stroke",

    "fillOpacity",
    "fill",
    "opacity",
    "cursor",
  ];

  const res: Record<string, any> = {};

  keys.forEach((key) => {
    const value = attribute[key];

    if (!isNil(value)) {
      if (
        (key === "fill" || key === "stroke") &&
        typeof value === "object" &&
        value.gradient
      ) {
        if (value.gradient === "conical" && graphic.type === "arc") {
          // res.mask = `url(#${generateGradientKey(key, graphic)})`;
          const stops = value.stops;

          if (stops && stops.length) {
            res[convertAttributeName(key)] = stops[0].color;
          }
        } else {
          res[convertAttributeName(key)] = `url(#${generateGradientKey(
            key,
            graphic
          )})`;
        }
      } else if (
        (key === "stroke" && (value instanceof Array || value === true)) ||
        (key === "fill" && value === true)
      ) {
        //
      } else {
        res[convertAttributeName(key)] = value;
      }
    }
  });

  return res;
}

export function generateGradient(style: any, graphic: any): string {
  return ["fill", "stroke"]
    .map((key: string) => {
      const value = style[key];
      if (typeof value === "object" && value.gradient) {
        const gradient = value;
        const stops = gradient.stops || [];
        const stopStr = stops
          .map((stop: any) => {
            const { offset, color, opacity = 1 } = stop;
            return `<stop offset="${(offset * 100).toFixed(
              0
            )}%" stop-color="${color}" stop-opacity="${opacity}" />`;
          })
          .join("");

        if (gradient.gradient === "linear") {
          const { x0 = 0, x1 = 1, y0 = 0, y1 = 0 } = gradient;
          return `<linearGradient id="${generateGradientKey(
            key,
            graphic
          )}" x1="${x0}" x2="${x1}" y1="${y0}" y2="${y1}">${stopStr}</linearGradient>`;
        } else if (gradient.gradient === "radial" && graphic.type === "arc") {
          const {
            x0 = 0.5,
            y0 = 0.5,
            r0 = 0,
            x1 = 0.5,
            y1 = 0.5,
            r1 = 0.5,
          } = gradient;

          return `<radialGradient cx="${x0}" cy="${y0}" r="${r0}" fx="${x1}" fy="${y1}" id="${generateGradientKey(
            key,
            graphic
          )}" ${stopStr}</radialGradient>`;
        } else if (gradient.gradient === "conical") {
          // let { outerRadius, x = 0, y = 0, lineWidth } = style;
          // const { startAngle, endAngle, stops } = gradient;
          // let deltaAngle = endAngle - startAngle;
          // const width = outerRadius;
          // if (
          //   Math.abs(deltaAngle) <= 0 ||
          //   width <= 0 ||
          //   !stops ||
          //   stops.length < 2
          // ) {
          //   return "";
          // }
          // const count = Math.ceil((180 * deltaAngle) / Math.PI);
          // outerRadius += lineWidth;
          // const stopColors = stops
          //   .sort((a: any, b: any) => a.offset - b.offset)
          //   .map((stop: any) => {
          //     return {
          //       ...stop,
          //       rgb: Color.parseColorString(stop.color),
          //     };
          //   });
          // const getColorByRatio = (ratio: number) => {
          //   let fromColor = stopColors[0];
          //   let toColor = stopColors[0];
          //   for (let i = 0, len = stopColors.length; i < len; i++) {
          //     const stop = stopColors[i];
          //     const nextStop = stopColors[i + 1] ?? stop;
          //     if (ratio >= stop.offset && ratio <= nextStop.offset) {
          //       fromColor = stop;
          //       toColor = nextStop;
          //     }
          //   }
          //   if (fromColor.offset === toColor.offset) {
          //     return toColor.color;
          //   }
          //   const colorRatio =
          //     (ratio - fromColor.offset) / (toColor.offset - fromColor.offset);
          //   const r =
          //     fromColor.rgb.r + colorRatio * (toColor.rgb.r - fromColor.rgb.r);
          //   const g =
          //     fromColor.rgb.g + colorRatio * (toColor.rgb.g - fromColor.rgb.g);
          //   const b =
          //     fromColor.rgb.b + colorRatio * (toColor.rgb.b - fromColor.rgb.b);
          //   const a =
          //     fromColor.rgb.opacity +
          //     colorRatio * (toColor.rgb.opacity - fromColor.rgb.opacity);
          //   return new RGB(r, g, b, a).toString();
          // };
          // const stepAngle = deltaAngle / count;
          // let minX = Infinity;
          // let maxX = -Infinity;
          // let minY = Infinity;
          // let maxY = -Infinity;
          // const triangles = new Array(count)
          //   .fill(0)
          //   .map((entry: number, index: number) => {
          //     const ratio = index / count;
          //     const sa = startAngle + index * stepAngle;
          //     const ea = startAngle + (index + 1) * 1.1 * stepAngle;
          //     const x1 = x + Math.cos(sa) * outerRadius;
          //     const y1 = y + Math.sin(sa) * outerRadius;
          //     const x2 = x + Math.cos(ea) * outerRadius;
          //     const y2 = y + Math.sin(ea) * outerRadius;
          //     const color = getColorByRatio(ratio);
          //     minX = Math.min(x1, x2, x, minX);
          //     minY = Math.min(y1, y2, y, minY);
          //     maxX = Math.max(x1, x2, x, minX);
          //     maxY = Math.max(y1, y2, y, minY);
          //     return `<path data-index="${index}" d="M${x},${y}L${x1},${y1}L${x2},${y2}Z" fill="${color}" />`;
          //   });
          // //  patternUnits = "userSpaceOnUse";
          // return `<pattern id="${generateGradientKey(
          //   key,
          //   graphic
          // )}" x="${minX}" y="${minY}" width="${maxX - minX}" height="${
          //   maxY - minY
          // }" patternUnits = "userSpaceOnUse">
          //  <g>
          //  ${triangles.join("")}
          //  </g>
          // </pattern>`;
        }
      }
      return "";
    })
    .join("");
}

export function convertTranslate(attribute: any = {}) {
  const { x = 0, y = 0, dx = 0, dy = 0 } = attribute;

  return { x: x + dx, y: y + dy };
}

export function convertTransformStyle(
  attribute: any = {},
  graphic: any
): Record<string, any> {
  const { x, y } = convertTranslate(attribute);
  const { angle, scaleX, scaleY } = attribute;

  if (x || y || angle || scaleX || scaleY) {
    const { a, b, c, d, e, f } = graphic.transMatrix;
    return {
      transform: `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`,
    };
  }

  return {};
}

export function convertTextAlignValue(str: string) {
  switch (str) {
    case "left":
      return "start";
    case "right":
      return "end";
    case "center":
      return "middle";
    default:
      return str;
  }
}

export function convertTextBaselineValue(str: string) {
  switch (str) {
    case "top":
      return "hanging";
    case "bottom":
      return "baseline";
    default:
      return str;
  }
}

export function convertTextContent(attribute: any = {}, graphic: any): string {
  const layoutData = graphic.cache && graphic.cache.layoutData;

  if (layoutData) {
    const lines = layoutData.lines;

    if (lines && lines.length) {
      return lines.reduce((res: string, line: any, index: number) => {
        return `${res}<text dy="${line.topOffset}" dx="${line.leftOffset}">${line.str}</text>`;
      }, "");
    }
  }

  return `<text ${
    attribute.direction === "vertical" ? 'transform="rotate(-90deg)"' : ""
  } ${convertAttributeName("textBaseline")}="${convertTextBaselineValue(
    attribute["textBaseline"] ?? "middle"
  )}">${attribute.text}</text>`;
}

export function convertRichTextContent(
  attribute: any = {},
  graphic: any
): string {
  const frameCache = graphic.getFrameCache();

  if (frameCache) {
    const lines = frameCache.lines;

    if (lines && lines.length) {
      return lines.reduce((res: string, line: any) => {
        const paragraphs = line.paragraphs;

        paragraphs.forEach((p: any) => {
          const pAttrs = { ...line, ...p, ...p.character };

          res = `${res}<text ${convertStyleToString({
            ...convertCommonStyle(pAttrs, graphic),
            // ...convertTransformStyle(p),
            ...convertTextStyle(pAttrs, graphic),
          })} dy="${line.top + line.baseline}" dx="${line.left}">${
            p.text
          }</text>`;
        });

        return res;
      }, "");
    }
  }

  return `<text  ${convertAttributeName(
    "textBaseline"
  )}="${convertTextBaselineValue(attribute["textBaseline"] ?? "middle")}">${
    attribute.text
  }</text>`;
}

export function convertTextStyle(
  attribute: any = {},
  graphic: any
): Record<string, any> {
  const keys = [
    "textAlign",
    "textBaseline",
    "fontSize",
    "fontFamily",
    "fontWeight",
    "fontVariant",
    "fontStyle",
  ];

  const res: Record<string, any> = {};

  keys.forEach((key) => {
    let value = attribute[key];

    if (key === "textAlign") {
      value = convertTextAlignValue(value);
    } else if (key === "textBaseline") {
      value = convertTextBaselineValue(value);
    }

    if (!isNil(value)) {
      res[convertAttributeName(key)] = value;
    }
  });

  if (attribute.lineHeight && attribute.fontSize) {
  }

  return res;
}

export function convertStyleToString(style: Record<string, any>) {
  return Object.keys(style).reduce((res: string, key: string) => {
    if (isNil(style[key])) {
      return res;
    }

    return `${res} ${key}="${style[key]}" `;
  }, "");
}

export const parsePoints = (points: any[], path: string = ""): string => {
  if (points && points.length) {
    let isFirst = true;
    points.forEach((point) => {
      if (point.defined === false) {
        isFirst = true;
        return;
      }
      if (isFirst) {
        path += `M${point.x},${point.y}`;
      } else {
        path += `L${point.x},${point.y}`;
      }

      isFirst = false;
    });
  }

  return path;
};

export const parsePathFromCurves = (curves: any[]) => {
  let path = "";
  let prevPoint: { x: number; y: number };
  let prevCommand = "";

  curves.forEach((curve: any, index: number) => {
    const p0 = curve.p0;
    const p1 = curve.p1;

    if (!curve.defined) {
      prevPoint = null as unknown as { x: number; y: number };
      prevCommand = "";
      return;
    }

    if (
      !prevPoint ||
      Math.abs(prevPoint.x - p0.x) >= 1e-5 ||
      Math.abs(prevPoint.y - p0.y) >= 1e-5
    ) {
      path += `M${p0.x},${p0.y}`;
    }

    if (curve.type === 0) {
      // CubicBezier
      const p2 = curve.p2;
      const p3 = curve.p3;

      prevCommand = "C";
      prevPoint = p3;
      path += `${prevCommand}${p1.x},${p1.y},${p2.x},${p2.y},${p3.x},${p3.y}`;
    } else if (curve.type === 1) {
      // QuadraticBezier
      const p2 = curve.p2;

      prevCommand = "Q";
      prevPoint = p2;
      path += `${prevCommand}${p1.x},${p1.y},${p2.x},${p2.y}`;
    } else if (curve.type === 2) {
      // arc
      const radius = curve.radius;
      prevCommand = "A";
      prevPoint = p1;
      path += `${prevCommand}${radius},${radius},0,0,0,${p1.x},${p1.y}`;
    } else if (curve.type === 3) {
      // line
      prevPoint = p1;
      prevCommand = "L";

      path += `${prevCommand}${p1.x},${p1.y}`;
    } else if (curve.type === 4) {
      // Ellipse
    } else if (curve.type === 5) {
      // move
      prevPoint = p0;
      prevCommand = "M";
    }
  });

  return path;
};

export function parseCornerRadiusPath(
  points: { x: number; y: number }[],
  cornerRadius: number | number[],
  closePath: boolean = true
) {
  if (points.length < 2) {
    return "";
  } else if (points.length === 2) {
    const [first, second] = points;

    return `M${first.x},${first.y}L${second.x},${second.y}`;
  }

  let path: string = "";

  let startI = 0;
  let endI = points.length - 1;
  if (!closePath) {
    startI += 1;
    endI -= 1;
    path += `M${points[0].x},${points[0].y}`;
  }
  for (let i = startI; i <= endI; i++) {
    const p1 = points[i === 0 ? endI : (i - 1) % points.length];
    const angularPoint = points[i % points.length];
    const p2 = points[(i + 1) % points.length];

    //Vector 1
    const dx1 = angularPoint.x - p1.x;
    const dy1 = angularPoint.y - p1.y;

    //Vector 2
    const dx2 = angularPoint.x - p2.x;
    const dy2 = angularPoint.y - p2.y;

    //Angle between vector 1 and vector 2 divided by 2
    const angle = (Math.atan2(dy1, dx1) - Math.atan2(dy2, dx2)) / 2;

    // The length of segment between angular point and the
    // points of intersection with the circle of a given radius
    const tan = Math.abs(Math.tan(angle));

    // get config radius
    let radius = Array.isArray(cornerRadius)
      ? cornerRadius[i % points.length] ?? 0
      : cornerRadius;
    let segment = radius / tan;

    //Check the segment
    const length1 = getLength(dx1, dy1);
    const length2 = getLength(dx2, dy2);

    const length = Math.min(length1, length2);

    if (segment > length) {
      segment = length;
      radius = length * tan;
    }

    // Points of intersection are calculated by the proportion between
    // the coordinates of the vector, length of vector and the length of the segment.
    const p1Cross = getProportionPoint(
      angularPoint,
      segment,
      length1,
      dx1,
      dy1
    );
    const p2Cross = getProportionPoint(
      angularPoint,
      segment,
      length2,
      dx2,
      dy2
    );

    // Calculation of the coordinates of the circle
    // center by the addition of angular vectors.
    const dx = angularPoint.x * 2 - p1Cross.x - p2Cross.x;
    const dy = angularPoint.y * 2 - p1Cross.y - p2Cross.y;

    const L = getLength(dx, dy);
    const d = getLength(segment, radius);

    const circlePoint = getProportionPoint(angularPoint, d, L, dx, dy);

    //StartAngle and EndAngle of arc
    let startAngle = Math.atan2(
      p1Cross.y - circlePoint.y,
      p1Cross.x - circlePoint.x
    );
    const endAngle = Math.atan2(
      p2Cross.y - circlePoint.y,
      p2Cross.x - circlePoint.x
    );

    //Sweep angle
    let sweepAngle = endAngle - startAngle;

    //Some additional checks
    if (sweepAngle < 0) {
      sweepAngle += Math.PI * 2;
    }

    if (sweepAngle > 2 * Math.PI) {
      sweepAngle -= 2 * Math.PI;
    }

    if (i === 0) {
      path += `M${p1Cross.x},${p1Cross.y}`;
    } else {
      path += `L${p1Cross.x},${p1Cross.y}`;
    }

    if (sweepAngle) {
      path += `A${radius},${radius},0,0,${sweepAngle > Math.PI ? 0 : 1},${
        p2Cross.x
      },${p2Cross.y}`;

      // `arcTo(
      //   angularPoint.x + x,
      //   angularPoint.y + y,
      //   p2Cross.x + x,
      //   p2Cross.y + y,
      //   radius
      // `
    }

    path += `L${p2Cross.x},${p2Cross.y}`;
  }

  if (!closePath) {
    path += `L${points[endI + 1].x},${points[endI + 1].y}`;
  }

  return path;
}

function getLength(dx: number, dy: number) {
  return Math.sqrt(dx * dx + dy * dy);
}

function getProportionPoint(
  point: { x: number; y: number },
  segment: number,
  length: number,
  dx: number,
  dy: number
) {
  const factor = segment / length;

  return {
    x: point.x - dx * factor,
    y: point.y - dy * factor,
  };
}

export function generateDefs(defs: {
  shadow?: string;
  pattern?: string;
  gradient?: string;
}) {
  return defs && (defs.shadow || defs.pattern || defs.gradient)
    ? `<defs>${defs.shadow || ""}${defs.pattern || ""}${
        defs.gradient || ""
      }</defs>`
    : "";
}
