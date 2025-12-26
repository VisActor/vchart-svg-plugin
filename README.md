<div align="center">
  <a href="https://github.com/VisActor#gh-light-mode-only" target="_blank">
    <img alt="VisActor Logo" width="200" src="https://github.com/VisActor/.github/blob/main/profile/logo_500_200_light.svg"/>
  </a>
  <a href="https://github.com/VisActor#gh-dark-mode-only" target="_blank">
    <img alt="VisActor Logo" width="200" src="https://github.com/VisActor/.github/blob/main/profile/logo_500_200_dark.svg"/>
  </a>
</div>

<div align="center">
  <h1>vchart-svg-plugin</h1>
</div>

<div align="center">
vchart-svg-plugin is a vchart plugin used to convert the rendered content of vchart into svg, making it convenient for use in printing, SSR, and other environments.

![](https://github.com/visactor/vchart-svg-plugin/actions/workflows/bug-server.yml/badge.svg)
![](https://github.com/visactor/vchart-svg-plugin/actions/workflows/unit-test.yml/badge.svg)
[![npm Version](https://img.shields.io/npm/v/@visactor/vchart-svg-plugin.svg)](https://www.npmjs.com/package/@visactor/vchart-svg-plugin)
[![npm Download](https://img.shields.io/npm/dm/@visactor/vchart-svg-plugin.svg)](https://www.npmjs.com/package/@visactor/vchart-svg-plugin)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/visactor/vchart-svg-plugin/blob/main/CONTRIBUTING.md#your-first-pull-request)

![](https://img.shields.io/badge/language-TypeScript-red.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/visactor/vchart-svg-plugin/blob/main/LICENSE)

</div>

<div align="center">

English| [简体中文](./README.zh-CN.md) 

</div>

## Introduction

VChart is a chart component library in the VisActor visualization system, based on vchart-svg-plugin, which can easily convert charts into SVG files.

## 🔨 Usage

### 📦 Installation

```bash
# npm
$ npm install @visactor/vchart-svg-plugin

# yarn
$ yarn add @visactor/vchart-svg-plugin
```
### Usage Notes

- **Animation**: Disable animation (`animation: false`) when converting to ensure accurate SVG output

### 📊 A Simple Chart
![demo svg](./demo.svg)

```typescript
import VChart from "@visactor/vchart";
import { convertVChartToSvg } from "@visactor/vchart-svg-plugin";

const spec = {
  type: "pie",
  data: [
    {
      id: "id0",
      values: [
        { type: "oxygen", value: "46.60" },
        { type: "silicon", value: "27.72" },
        { type: "aluminum", value: "8.13" },
        { type: "iron", value: "5" },
        { type: "calcium", value: "3.63" },
        { type: "sodium", value: "2.83" },
        { type: "potassium", value: "2.59" },
        { type: "others", value: "3.5" },
      ],
    },
  ],
  animation: false, // Note: Do not enable animation, otherwise you need to listen for animation end event before converting to SVG
  outerRadius: 0.8,
  valueField: "value",
  categoryField: "type",
  title: {
    visible: true,
    text: "Statistics of Surface Element Content",
  },
  legends: {
    visible: true,
    orient: "left",
  },
  label: {
    visible: true,
  },
  tooltip: {
    mark: {
      content: [
        {
          key: (datum) => datum["type"],
          value: (datum) => datum["value"] + "%",
        },
      ],
    },
  },
};

const vchart = new VChart(spec, {
  dom: "chart-container",
  animation: false, // Note: Do not enable animation, otherwise you need to listen for animation end event before converting to SVG
});
vchart.renderSync();

const svgContent = convertVChartToSvg(vchart);
```

### render on node

```typescript
const VChart = require("@visactor/vchart");
const Canvas = require("canvas");
const { convertVChartToSvg } = require("@visactor/vchart-svg-plugin");

const spec = {
  type: "pie",
  data: [
    {
      id: "id0",
      values: [
        { type: "oxygen", value: "46.60" },
        { type: "silicon", value: "27.72" },
        { type: "aluminum", value: "8.13" },
        { type: "iron", value: "5" },
        { type: "calcium", value: "3.63" },
        { type: "sodium", value: "2.83" },
        { type: "potassium", value: "2.59" },
        { type: "others", value: "3.5" },
      ],
    },
  ],
  animation: false, // Note: Do not enable animation, otherwise you need to listen for animation end event before converting to SVG
  outerRadius: 0.8,
  valueField: "value",
  categoryField: "type",
  title: {
    visible: true,
    text: "Statistics of Surface Element Content",
  },
  legends: {
    visible: true,
    orient: "left",
  },
  label: {
    visible: true,
  },
  tooltip: {
    mark: {
      content: [
        {
          key: (datum) => datum["type"],
          value: (datum) => datum["value"] + "%",
        },
      ],
    },
  },
};
const vchart = new VChart(spec, {
  // Declare the rendering environment used and pass the corresponding rendering environment parameters
  mode: "node",
  modeParams: Canvas,
  animation: false,
});
vchart.renderSync();

const svgContent = convertVChartToSvg(vchart);
```

## �️ Development

### Environment Setup

```bash
# Clone the repository
git clone https://github.com/visactor/vchart-svg-plugin.git
cd vchart-svg-plugin

# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run linting
yarn lint
```

### Project Structure

```
vchart-svg-plugin/
├── src/                          # Source code
│   ├── svg/                      # SVG conversion modules
│   │   ├── arc.ts               # Arc shape conversion
│   │   ├── area.ts              # Area shape conversion
│   │   ├── convert.ts           # Main conversion logic
│   │   ├── graphic.ts           # Base graphic conversion
│   │   ├── group.ts             # Group element conversion
│   │   ├── line.ts              # Line shape conversion
│   │   ├── pattern.ts           # Pattern conversion
│   │   ├── polygon.ts           # Polygon shape conversion
│   │   ├── rect.ts              # Rectangle conversion
│   │   ├── shadow.ts            # Shadow effects
│   │   ├── symbol.ts            # Symbol conversion
│   │   └── util.ts              # Utility functions
│   └── index.ts                 # Main entry point
├── demo/                         # Demo application
│   ├── src/                     # Demo source code
│   ├── index.html               # Demo HTML
│   └── vite.config.ts           # Vite configuration
├── package.json                 # Project dependencies and scripts
├── rollup.config.js            # Rollup build configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

### Core Modules

#### SVG Conversion Modules

The plugin converts VChart rendered graphics to SVG through specialized modules:

- **convert.ts**: Main conversion entry point and orchestration
- **graphic.ts**: Base graphic element conversion logic
- **arc.ts**: Arc and pie chart segment conversion
- **line.ts**: Line and path element conversion
- **rect.ts**: Rectangle and rounded rectangle conversion
- **area.ts**: Area chart and polygon conversion
- **symbol.ts**: Symbol and marker conversion
- **pattern.ts**: Pattern and gradient conversion
- **shadow.ts**: Shadow effect conversion
- **group.ts**: Group element handling
- **util.ts**: Utility functions for SVG generation

### Development Workflow

1. **Local Development**
   ```bash
   # Start the demo server
   yarn dev
   
   # The demo will be available at http://localhost:5173
   ```

2. **Code Style**
   - Use TypeScript for type safety
   - Follow ESLint configuration
   - Maintain consistent code formatting

3. **Building**
   ```bash
   # Build all formats (ESM, CJS, UMD)
   yarn build
   
   # Output will be in:
   # - esm/     (ES modules)
   # - cjs/     (CommonJS)
   # - umd/     (UMD bundle)
   ```

4. **Testing**
   - Run the demo to test changes
   - Verify SVG output quality
   - Test with different chart types

### API Reference

#### Main Function

##### `convertVChartToSvg(vchart: VChart): string`

Converts a rendered VChart instance to SVG string.

**Parameters:**
- `vchart`: A rendered VChart instance

**Returns:**
- `string`: SVG content as string




- **Node.js**: For server-side rendering, use `mode: "node"` and provide canvas implementation
- **Performance**: Large charts may take longer to convert; consider using `renderAsync()` for complex visualizations

#### Environment Support

- **Browser**: Full support with DOM-based VChart
- **Node.js**: Supported with canvas backend (e.g., `canvas` package)
- **SSR**: Compatible with server-side rendering workflows

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with the demo
5. Ensure code passes linting
6. Submit a pull request

For detailed contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md)

## �🔗 Related Links

- [Home](https://www.visactor.io/vchart)
- [VCharts Graph Examples](https://www.visactor.io/vchart/example)
- [VChart Graph Tutorial](https://www.visactor.io/vchart/guide/tutorial_docs/VChart_Website_Guide)
- [VChart Graph Configuration Options](https://www.visactor.io/vchart/option/)
- [VChart API](https://www.visactor.io/vchart/api/API/vchart)
- [VGrammar](https://www.visactor.io/vgrammar)
- [VRender](https://www.visactor.io/vrender)
- [FAQ](https://www.visactor.io/vchart/guide/tutorial_docs/FAQ)
- [CodeSandbox Template](https://codesandbox.io/s/the-template-of-visactor-vchart-vl84ww?file=/src/index.ts) for submitting bugs

## 🤝 Contribution [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/visactor/vchart-svg-plugin/blob/main/CONTRIBUTING.md#your-first-pull-request)

If you would like to contribute, please read the [Code of Conduct](./CODE_OF_CONDUCT.md) and [Contribution Guidelines](./CONTRIBUTING.zh-CN.md).

Small streams make a river, and rivers flow into the sea!

<a href="https://github.com/visactor/vchart-svg-plugin/graphs/contributors"><img src="https://contrib.rocks/image?repo=visactor/vchart-svg-plugin" /></a>
