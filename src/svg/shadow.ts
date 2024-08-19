export function generateShadowId(graphic: any) {
  return `shadow-${graphic._uid}`;
}

export function generateShadow(
  attribute: {
    shadowBlur?: number;
    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
  },
  graphic: any
): string {
  const {
    shadowBlur = 0,
    shadowColor = "black",
    shadowOffsetX = 0,
    shadowOffsetY = 0,
  } = attribute;
  if (!shadowBlur) {
    return "";
  }
  const bounds = graphic.AABBBounds;
  const size = Math.max(bounds.width(), bounds.height()) / 2;
  const ratio = shadowBlur / size;

  return `<filter id="${generateShadowId(graphic)}" >
        <feDropShadow 
            dx="${shadowOffsetX / shadowBlur}" dy="${
    shadowOffsetY / shadowBlur
  }" stdDeviation="${ratio}"
  flood-color="${shadowColor}" />
      </pattern>`;
}
