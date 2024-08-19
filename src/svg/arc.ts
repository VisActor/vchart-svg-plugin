import { cornerTangents, IArc, intersect } from "@visactor/vrender-core";
import { EPS } from "./util";
import { normalizeAngle } from "@visactor/vutils";

export const isLargeAngle = (
  startAngle: number,
  endAngle: number,
  clockwise?: boolean
) => {
  const start = normalizeAngle(startAngle);
  const end = normalizeAngle(endAngle);

  if (clockwise) {
    return (end >= start ? end : end + 2 * Math.PI) - start > Math.PI ? 1 : 0;
  }

  return (start >= end ? start : start + 2 * Math.PI) - end > Math.PI ? 1 : 0;
};

export function calculateArcCornerRadius(
  arc: IArc,
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  outerRadius: number
) {
  const deltaAngle = Math.abs(endAngle - startAngle);
  const cornerRadius = arc.getParsedCornerRadius();
  const cornerRadiusIsArray = Array.isArray(cornerRadius);
  // Or is it a circular or annular sector?
  const {
    outerDeltaAngle,
    innerDeltaAngle,
    outerStartAngle,
    outerEndAngle,
    innerEndAngle,
    innerStartAngle,
  } = arc.getParsePadAngle(startAngle, endAngle);

  const outerCornerRadiusStart = cornerRadiusIsArray
    ? cornerRadius[0]
    : cornerRadius;
  const outerCornerRadiusEnd = cornerRadiusIsArray
    ? cornerRadius[1]
    : cornerRadius;
  const innerCornerRadiusEnd = cornerRadiusIsArray
    ? cornerRadius[2]
    : cornerRadius;
  const innerCornerRadiusStart = cornerRadiusIsArray
    ? cornerRadius[3]
    : cornerRadius;
  const maxOuterCornerRadius = Math.max(
    outerCornerRadiusEnd,
    outerCornerRadiusStart
  );
  const maxInnerCornerRadius = Math.max(
    innerCornerRadiusEnd,
    innerCornerRadiusStart
  );
  let limitedOcr = maxOuterCornerRadius;
  let limitedIcr = maxInnerCornerRadius;

  const xors = outerRadius * Math.cos(outerStartAngle);
  const yors = outerRadius * Math.sin(outerStartAngle);
  const xire = innerRadius * Math.cos(innerEndAngle);
  const yire = innerRadius * Math.sin(innerEndAngle);

  // Apply rounded corners?
  let xore = outerRadius * Math.cos(outerEndAngle);
  let yore = outerRadius * Math.sin(outerEndAngle);
  let xirs = innerRadius * Math.cos(innerStartAngle);
  let yirs = innerRadius * Math.sin(innerStartAngle);
  if (maxInnerCornerRadius > EPS || maxOuterCornerRadius > EPS) {
    // Restrict the corner radius according to the sector angle.
    if (deltaAngle < Math.PI) {
      const oc = intersect(xors, yors, xirs, yirs, xore, yore, xire, yire);

      if (oc) {
        const ax = xors - oc[0];
        const ay = yors - oc[1];
        const bx = xore - oc[0];
        const by = yore - oc[1];
        const kc =
          1 /
          Math.sin(
            Math.acos(
              (ax * bx + ay * by) /
                (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))
            ) / 2
          );
        const lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);

        limitedIcr = Math.min(
          maxInnerCornerRadius,
          (innerRadius - lc) / (kc - 1)
        );
        limitedOcr = Math.min(
          maxOuterCornerRadius,
          (outerRadius - lc) / (kc + 1)
        );
      }
    }
  }

  return {
    outerDeltaAngle,
    xors,
    yors,
    xirs,
    yirs,
    xore,
    yore,
    xire,
    yire,
    limitedOcr,
    limitedIcr,
    outerCornerRadiusStart,
    outerCornerRadiusEnd,
    maxOuterCornerRadius,
    maxInnerCornerRadius,
    outerStartAngle,
    outerEndAngle,
    innerDeltaAngle,
    innerEndAngle,
    innerStartAngle,
    innerCornerRadiusStart,
    innerCornerRadiusEnd,
  };
}

export function convertArcStyle(
  attribute: any = {},
  arc: any
): Record<string, any> {
  const style: Record<string, any> = {};
  let path: string = "";

  let {
    innerRadius,
    outerRadius,
    outerPadding = 0,
    innerPadding = 0,
    stroke,
  } = attribute;
  innerRadius -= innerPadding;
  outerRadius += outerPadding;

  const cx = 0;
  const cy = 0;
  const partStroke =
    Array.isArray(stroke) &&
    stroke.some((entry) => !entry) &&
    stroke.some((entry) => entry)
      ? stroke
      : null;

  const { startAngle, endAngle } = arc.getParsedAngle();

  const deltaAngle = Math.abs(endAngle - startAngle);
  const clockwise: boolean = endAngle > startAngle;
  let collapsedToLine: boolean = false;
  // 规范化outerRadius和innerRadius
  if (outerRadius < innerRadius) {
    const temp = outerRadius;
    outerRadius = innerRadius;
    innerRadius = temp;
  }
  // Is it a point?
  if (outerRadius <= EPS) {
    path += `M${cx}, ${cy}`;
  } else if (deltaAngle >= Math.PI * 2 - EPS) {
    // 是个完整的圆环
    // Or is it a circle or annulus?
    let x = cx + outerRadius * Math.cos(startAngle);
    let y = cy + outerRadius * Math.sin(startAngle);
    path += `M${x},${y}`;
    path += `A${outerRadius},${outerRadius},0,1,0,${x},${y}`;

    if (innerRadius > EPS) {
      (x = cx + innerRadius * Math.cos(endAngle)),
        (y = cy + innerRadius * Math.sin(endAngle));
      path += `M${x},${y}`;
      path += `A${innerRadius},${innerRadius},0,1,1,${x},${y}`;
    }
  } else {
    const {
      outerDeltaAngle,
      xors,
      yors,
      xirs,
      yirs,
      limitedOcr,
      outerCornerRadiusStart,
      outerCornerRadiusEnd,
      maxOuterCornerRadius,
      xore,
      yore,
      xire,
      yire,
      outerStartAngle,
      outerEndAngle,
      limitedIcr,
      innerDeltaAngle,
      innerEndAngle,
      innerStartAngle,
      innerCornerRadiusStart,
      innerCornerRadiusEnd,
      maxInnerCornerRadius,
    } = calculateArcCornerRadius(
      arc,
      startAngle,
      endAngle,
      innerRadius,
      outerRadius
    );
    // Is the sector collapsed to a line?
    // 角度过小，会将acr处理为圆心到半径的一条线
    if (outerDeltaAngle < 0.001) {
      // 如果有左右边的话
      if (partStroke && (partStroke[3] || partStroke[1])) {
        path += `M${cx + xors},${cy + yors}`;
      }
      collapsedToLine = true;
    } else if (limitedOcr > EPS) {
      const cornerRadiusStart = Math.min(outerCornerRadiusStart, limitedOcr);
      const cornerRadiusEnd = Math.min(outerCornerRadiusEnd, limitedOcr);
      // Does the sector’s outer ring have rounded corners?
      const t0 = cornerTangents(
        xirs,
        yirs,
        xors,
        yors,
        outerRadius,
        cornerRadiusStart,
        Number(clockwise)
      );
      const t1 = cornerTangents(
        xore,
        yore,
        xire,
        yire,
        outerRadius,
        cornerRadiusEnd,
        Number(clockwise)
      );

      // Have the corners merged?
      if (
        limitedOcr < maxOuterCornerRadius &&
        cornerRadiusStart === cornerRadiusEnd
      ) {
        if (!partStroke || partStroke[0]) {
          path += `M${cx + t0.cx + t0.x01}, ${cy + t0.cy + t0.y01}`;
          path += `A${limitedOcr},${limitedOcr},0,${isLargeAngle(
            Math.atan2(t0.y01, t0.x01),
            Math.atan2(t1.y01, t1.x01),
            clockwise
          )},${+clockwise},${cx + t1.cx + t1.x01},${cy + t1.cy + t1.y01}`;
        } else {
          path += `M${
            cx + t0.cx + limitedOcr * Math.cos(Math.atan2(t1.y01, t1.x01))
          },
            ${cy + t0.cy + limitedOcr * Math.sin(Math.atan2(t1.y01, t1.x01))}
          `;
        }
      } else {
        // Otherwise, draw the two corners and the ring.
        if (!partStroke || partStroke[0]) {
          path += `M${cx + t0.cx + t0.x01}, ${cy + t0.cy + t0.y01}`;
          cornerRadiusStart > 0 &&
            (path += `A${cornerRadiusStart},${cornerRadiusStart},0,${isLargeAngle(
              Math.atan2(t0.y01, t0.x01),
              Math.atan2(t0.y11, t0.x11),
              clockwise
            )},${+clockwise},${cx + t0.cx + t0.x11},${cx + t0.cy + t0.y11}`);

          path += `A${outerRadius},${outerRadius},0,${isLargeAngle(
            Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11),
            Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11),
            clockwise
          )},${+clockwise},${cx + t1.cx + t1.x11},${cx + t1.cy + t1.y11}`;

          //   atan2(t0.cy + t0.y11, t0.cx + t0.x11),
          //   atan2(t1.cy + t1.y11, t1.cx + t1.x11),

          cornerRadiusEnd > 0 &&
            (path += `A${cornerRadiusEnd},${cornerRadiusEnd},0,${isLargeAngle(
              Math.atan2(t1.y11, t1.x11),
              Math.atan2(t1.y01, t1.x01),
              clockwise
            )},${+clockwise},${cx + t1.cx + t1.x01}, ${cy + t1.cy + t1.y01}`);
        } else {
          if (cornerRadiusEnd > 0) {
            path += `M${
              cx +
              t1.cx +
              cornerRadiusEnd * Math.cos(Math.atan2(t1.y01, t1.x01))
            }
              ,
              ${
                cy +
                t1.cy +
                cornerRadiusEnd * Math.sin(Math.atan2(t1.y01, t1.x01))
              }
            `;
          } else {
            path += `M${cx + xore},
              ${cy + outerRadius * Math.sin(outerEndAngle)}`;
          }
        }
      }
    } else {
      // Or is the outer ring just a circular arc?
      if (!partStroke || partStroke[0]) {
        path += `M${cx + xors}, ${cy + yors}`;

        path += `A${outerRadius},${outerRadius},0,${isLargeAngle(
          outerStartAngle,
          outerEndAngle,
          clockwise
        )},${+clockwise},${xore},${yore}`;
      } else {
        path += `M
          ${cx + outerRadius * Math.cos(outerEndAngle)},
          ${cy + outerRadius * Math.sin(outerEndAngle)}
        `;
      }
    }
    // Is there no inner ring, and it’s a circular sector?
    // Or perhaps it’s an annular sector collapsed due to padding?
    if (!(innerRadius > EPS) || innerDeltaAngle < 0.001) {
      if (!partStroke || partStroke[1]) {
        path += `L${cx + xire}, ${cy + yire}`;
      } else {
        path += `M${cx + xire}, ${cy + yire}`;
      }
      collapsedToLine = true;
    } else if (limitedIcr > EPS) {
      const cornerRadiusStart = Math.min(innerCornerRadiusStart, limitedIcr);
      const cornerRadiusEnd = Math.min(innerCornerRadiusEnd, limitedIcr);
      // Does the sector’s inner ring (or point) have rounded corners?
      const t0 = cornerTangents(
        xire,
        yire,
        xore,
        yore,
        innerRadius,
        -cornerRadiusEnd,
        Number(clockwise)
      );
      const t1 = cornerTangents(
        xors,
        yors,
        xirs,
        yirs,
        innerRadius,
        -cornerRadiusStart,
        Number(clockwise)
      );

      if (!partStroke || partStroke[1]) {
        path += `L${cx + t0.cx + t0.x01},${cy + t0.cy + t0.y01}`;
      } else {
        path += `M${cx + t0.cx + t0.x01}, ${cy + t0.cy + t0.y01}`;
      }

      // Have the corners merged?
      if (
        limitedIcr < maxInnerCornerRadius &&
        cornerRadiusStart === cornerRadiusEnd
      ) {
        const arcEndAngle = Math.atan2(t1.y01, t1.x01);
        if (!partStroke || partStroke[2]) {
          path += `A${limitedIcr},${limitedIcr},0,${isLargeAngle(
            Math.atan2(t0.y01, t0.x01),
            arcEndAngle,
            clockwise
          )},${+clockwise},${cx + t1.cx + t1.x01},${cy + t1.cy + t1.y01}`;
        } else {
          path += `M${cx + t0.cx + Math.cos(arcEndAngle)}
            ,
            ${cy + t0.cy + Math.sin(arcEndAngle)}
          `;
        }
      } else {
        // Otherwise, draw the two corners and the ring.
        if (!partStroke || partStroke[2]) {
          cornerRadiusEnd > 0 &&
            (path += `A${cornerRadiusEnd},${cornerRadiusEnd},0,${isLargeAngle(
              Math.atan2(t0.y01, t0.x01),
              Math.atan2(t0.y11, t0.x11),
              clockwise
            )},${+clockwise},${cx + t0.cx + t0.x11},${cy + t0.cy + t0.y11}`);
          path += `A${innerRadius},${innerRadius},0,${isLargeAngle(
            Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11),
            Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11),
            !clockwise
          )},${+!clockwise},${cx + t1.cx + t1.x11},${cy + t1.cy + t1.y11}`;
          cornerRadiusStart > 0 &&
            (path += `A${cornerRadiusStart},${cornerRadiusStart},0,${isLargeAngle(
              Math.atan2(t1.y11, t1.x11),
              Math.atan2(t1.y01, t1.x01),
              clockwise
            )},${+clockwise},${cx + t1.cx + t1.x01},${cx + t1.cy + t1.y01}`);
        } else {
          if (cornerRadiusStart > 0) {
            path += `M${
              cx +
              t1.cx +
              cornerRadiusStart * Math.cos(Math.atan2(t1.y01, t1.x01))
            },
              ${
                cy +
                t1.cy +
                cornerRadiusStart * Math.sin(Math.atan2(t1.y01, t1.x01))
              }`;
          } else {
            path += `M${cx + xirs},${cy + yirs}`;
          }
        }
      }
    } else {
      // Or is the inner ring just a circular arc?
      if (!partStroke || partStroke[1]) {
        path += `L${cx + xire},${cy + yire}`;
      } else {
        path += `M${cx + xire}, ${cy + yire}`;
      }
      if (!partStroke || partStroke[2]) {
        path += `A${innerRadius},${innerRadius},0,${isLargeAngle(
          innerEndAngle,
          innerStartAngle,
          !clockwise
        )},${+!clockwise},${cx + xirs}, ${cy + yirs}`;
      } else {
        path += `M${cx + innerRadius * Math.cos(innerStartAngle)},${
          cy + innerRadius * Math.sin(innerStartAngle)
        }`;
      }
    }
  }

  if (!partStroke) {
    path += `Z`;
  } else if (partStroke[3]) {
    path += `L${cx + outerRadius * Math.cos(startAngle)},${
      cy + outerRadius * Math.sin(startAngle)
    }`;
  }

  style.d = path;
  return style;
}
