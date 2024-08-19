const getPatternRadius = (size: number, padding: number) => {
  return (size - padding * 2) / 2;
};

export function generateCirclePattern(
  color: string,
  size: number,
  padding: number
) {
  const r = getPatternRadius(size, padding);

  return `<circle fill="${color}" cx="${size / 2}" cy="${
    size / 2
  }" r="${r}" />`;
}

export function generateDiamondPattern(
  color: string,
  size: number,
  padding: number
) {
  const r = getPatternRadius(size, padding);
  const x = size / 2;
  const y = x;

  return `<path fill="${color}" d="M${x},${y - r}L${r + x},${y}L${x},${y + r}L${
    x - r
  },${y}Z" />`;
}

export function generateRectPattern(
  color: string,
  size: number,
  padding: number
) {
  const width = size - padding * 2;

  return `<rect fill="${color}" x="${padding}" y="${padding}" width="${width}" height="${width}" />`;
}

export function generateVerticalLinePattern(
  color: string,
  size: number,
  padding: number
) {
  const r = getPatternRadius(size, padding);
  const x = padding;
  const y = 0;

  return `<rect fill="${color}" x="${x}" y="${y}" width="${
    r * 2
  }" height="${size}" />`;
}

export function generateHorizontalLinePattern(
  color: string,
  size: number,
  padding: number
) {
  const r = getPatternRadius(size, padding);
  const x = 0;
  const y = padding;

  return `<rect fill="${color}" x="${x}" y="${y}" width="${size}" height="${
    r * 2
  }" />`;
}

export function generateBiasLRLinePattern(
  color: string,
  size: number,
  padding: number
) {
  const r = getPatternRadius(size, padding);
  const dx = size / 2;
  const dy = -dx;
  return `<path stroke="${color}" stroke-width="${r}" d="M0,0L${size},${size}M${dx},${dy}L${
    dx + size
  },${dy + size}M${-dx},${-dy}L${-dx + size},${-dy + size}" />`;
}

export function generateBiasRLLinePattern(
  color: string,
  size: number,
  padding: number
) {
  const r = getPatternRadius(size, padding);
  const dx = size / 2;
  const dy = dx;
  return `<path stroke="${color}" stroke-width="${r}" d="M${size},0L0,${size}M${
    size + dx
  },${dy}L${dx},${dy + size}M${size - dx},${-dy}L${-dx},${-dy + size}" />`;
}

export function generateGridPattern(
  color: string,
  size: number,
  padding: number
) {
  const r = getPatternRadius(size, padding);
  const x = padding;
  const y = x;

  return `<rect fill="${color}" x="${x}" y="${y}" width="${r}" height="${r}" />
   <rect fill="${color}" x="${x + r}" y="${
    y + r
  }" width="${r}" height="${r}" />`;
}

export function generatePatternId(graphic: any) {
  return `pattern-${graphic._uid}`;
}

export function generatePattern(
  attribute: {
    texture: string;
    textureColor: string;
    textureSize: number;
    texturePadding: number;
  },
  graphic: any
): string {
  const {
    texture,
    textureColor = "black",
    textureSize = 10,
    texturePadding = 2,
  } = attribute;
  if (!texture) {
    return "";
  }

  let patternShape = "";

  switch (texture) {
    case "circle":
      patternShape = generateCirclePattern(
        textureColor,
        textureSize,
        texturePadding
      );
      break;
    case "diamond":
      patternShape = generateDiamondPattern(
        textureColor,
        textureSize,
        texturePadding
      );
      break;
    case "rect":
      patternShape = generateRectPattern(
        textureColor,
        textureSize,
        texturePadding
      );
      break;
    case "vertical-line":
      patternShape = generateVerticalLinePattern(
        textureColor,
        textureSize,
        texturePadding
      );
      break;
    case "horizontal-line":
      patternShape = generateHorizontalLinePattern(
        textureColor,
        textureSize,
        texturePadding
      );
      break;
    case "bias-lr":
      patternShape = generateBiasLRLinePattern(
        textureColor,
        textureSize,
        texturePadding
      );
      break;
    case "bias-rl":
      patternShape = generateBiasRLLinePattern(
        textureColor,
        textureSize,
        texturePadding
      );
      break;
    case "grid":
      patternShape = generateGridPattern(
        textureColor,
        textureSize,
        texturePadding
      );
      break;
  }

  if (!patternShape) {
    return "";
  }

  return `<pattern id="${generatePatternId(
    graphic
  )}" width="${textureSize}" height="${textureSize}" patternUnits="userSpaceOnUse">
      ${patternShape}
    </pattern>`;
}
