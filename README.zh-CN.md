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

vchart-svg-plugin 是 vchart 插件，用于将 vchart 渲染后的内容转换成 svg，方便在打印、SSR 等环境下使用

![](https://github.com/visactor/vchart-svg-plugin/actions/workflows/bug-server.yml/badge.svg)
![](https://github.com/visactor/vchart-svg-plugin/actions/workflows/unit-test.yml/badge.svg)
[![npm Version](https://img.shields.io/npm/v/@visactor/vchart-svg-plugin.svg)](https://www.npmjs.com/package/@visactor/vchart-svg-plugin)
[![npm Download](https://img.shields.io/npm/dm/@visactor/vchart-svg-plugin.svg)](https://www.npmjs.com/package/@visactor/vchart-svg-plugin)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/visactor/vchart-svg-plugin/blob/main/CONTRIBUTING.md#your-first-pull-request)

![](https://img.shields.io/badge/language-TypeScript-red.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/visactor/vchart-svg-plugin/blob/main/LICENSE)

</div>

<div align="center">

[English](./README.md) | 简体中文

</div>

## 简介

VChart 是 VisActor 可视化体系中的图表组件库，基于 vchart-svg-plugin，可以轻松的将图表转换成 svg 文件

## 🔨 使用

### 📦 安装

```bash
# npm
$ npm install @visactor/vchart-svg-plugin

# yarn
$ yarn add @visactor/vchart-svg-plugin
```

### 📊 一个简单的图表

<div>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  x="0px"  y="0px"  width="639px"  height="411px"  viewBox="0 0 639 411"  >
  <rect x="0" y="0" width="639" height="411" pointer-events="none"  fill="#ffffff"   />
  <g class="" ><g class="root" ><g class="title"  transform="matrix(1, 0, 0, 1, 20, 24)" ><g class="title-container" ><g  fill="#21252c"  text-anchor="start"  alignment-baseline="hanging"  font-size="16"  font-weight="bold"  class="mainTitle" ><text dy="16.64" dx="0">Statistics of Surface Element Content</text></g></g></g><g class="regionGroup_6"  transform="matrix(1, 0, 0, 1, 122, 70)" ><g class="seriesGroup_pie_8_11" ><g class="pie_12" ><path  fill="#1664FF"  stroke-width="0"  stroke="#1664FF"  fill-opacity="1"  transform="matrix(1, 0, 0, 1, 248.5, 160.5)"  d="M7.862232450526007e-15, -128.4A128.4,128.4,0,0,1,27.221712913991773,125.48122706615605L0, 0Z"   /><path  fill="#1AC6FF"  stroke-width="0"  stroke="#1AC6FF"  fill-opacity="1"  transform="matrix(1, 0, 0, 1, 248.5, 160.5)"  d="M27.221712913991773, 125.48122706615605A128.4,128.4,0,0,1,-128.2828218808454,5.484305816353947L0, 0Z"   /><path  fill="#FF8A00"  stroke-width="0"  stroke="#FF8A00"  fill-opacity="1"  transform="matrix(1, 0, 0, 1, 248.5, 160.5)"  d="M-128.2828218808454, 5.484305816353947A128.4,128.4,0,0,1,-114.58780375108536,-57.93267844233296L0, 0Z"   /><path  fill="#3CC780"  stroke-width="0"  stroke="#3CC780"  fill-opacity="1"  transform="matrix(1, 0, 0, 1, 248.5, 160.5)"  d="M-114.58780375108536, -57.93267844233296A128.4,128.4,0,0,1,-91.07729527707993,-90.50683004619925L0, 0Z"   /><path  fill="#7442D4"  stroke-width="0"  stroke="#7442D4"  fill-opacity="1"  transform="matrix(1, 0, 0, 1, 248.5, 160.5)"  d="M-91.07729527707993, -90.50683004619925A128.4,128.4,0,0,1,-68.2543569442313,-108.75616193177041L0, 0Z"   /><path  fill="#FFC400"  stroke-width="0"  stroke="#FFC400"  fill-opacity="1"  transform="matrix(1, 0, 0, 1, 248.5, 160.5)"  d="M-68.2543569442313, -108.75616193177041A128.4,128.4,0,0,1,-47.94152988628027,-119.11410374998796L0, 0Z"   /><path  fill="#304D77"  stroke-width="0"  stroke="#304D77"  fill-opacity="1"  transform="matrix(1, 0, 0, 1, 248.5, 160.5)"  d="M-47.94152988628027, -119.11410374998796A128.4,128.4,0,0,1,-28.009592195315932,-125.3077122329352L0, 0Z"   /><path  fill="#B48DEB"  stroke-width="0"  stroke="#B48DEB"  fill-opacity="1"  transform="matrix(1, 0, 0, 1, 248.5, 160.5)"  d="M-28.009592195315932, -125.3077122329352A128.4,128.4,0,0,1,-2.3586697351578022e-14,-128.4L0, 0Z"   /></g><g class="emptyCircle_14" ></g></g><g class="pie-label-0-component_25" ><g class="data-label" ><g class="arc-label" ><g  stroke-width="0"  stroke-linejoin="bevel"  stroke="#ffffff"  fill-opacity="1"  fill="#1664FF"  transform="matrix(1, 0, 0, 1, 434.1262053735279, 144.67890470555147)"  text-anchor="middle"  alignment-baseline="middle"  font-size="14"  font-family="PingFang SC,Helvetica Neue,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol"  font-weight="normal" ><text  alignment-baseline="middle">oxygen</text></g><path  stroke-width="1"  stroke="#1664FF"  d="M376.1682214869747 146.81112779105666L396.0542372949146 144.67890470555147L406.0542372949146 144.67890470555147"  fill="none"  /><g  stroke-width="0"  stroke-linejoin="bevel"  stroke="#ffffff"  fill-opacity="1"  fill="#1AC6FF"  transform="matrix(1, 0, 0, 1, 116.10160185737874, 277.9872291302481)"  text-anchor="middle"  alignment-baseline="middle"  font-size="14"  font-family="PingFang SC,Helvetica Neue,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol"  font-weight="normal" ><text  alignment-baseline="middle">silicon</text></g><path  stroke-width="1"  stroke="#1AC6FF"  d="M170.0579690869725 262.15337075689933L151.70958067817952 277.9872291302481L141.70958067817952 277.9872291302481"  fill="none"  /><g  stroke-width="0"  stroke-linejoin="bevel"  stroke="#ffffff"  fill-opacity="1"  fill="#FF8A00"  transform="matrix(1, 0, 0, 1, 57.132705096804074, 129.17484318103348)"  text-anchor="middle"  alignment-baseline="middle"  font-size="14"  font-family="PingFang SC,Helvetica Neue,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol"  font-weight="normal" ><text  alignment-baseline="middle">aluminum</text></g><path  stroke-width="1"  stroke="#FF8A00"  d="M122.9931728078986 133.39656242887264L103.20567262610095 129.17484318103348L93.20567262610095 129.17484318103348"  fill="none"  /><g  stroke-width="0"  stroke-linejoin="bevel"  stroke="#ffffff"  fill-opacity="1"  fill="#3CC780"  transform="matrix(1, 0, 0, 1, 98.45072338677764, 73.65027210261424)"  text-anchor="middle"  alignment-baseline="middle"  font-size="14"  font-family="PingFang SC,Helvetica Neue,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol"  font-weight="normal" ><text  alignment-baseline="middle">iron</text></g><path  stroke-width="1"  stroke="#3CC780"  d="M144.38562982112327 85.35508718312445L125.81270763970733 73.65027210261424L115.81270763970733 73.65027210261424"  fill="none"  /><g  stroke-width="0"  stroke-linejoin="bevel"  stroke="#ffffff"  fill-opacity="1"  fill="#7442D4"  transform="matrix(1, 0, 0, 1, 103.75086291667162, 50.946925385855124)"  text-anchor="middle"  alignment-baseline="middle"  font-size="14"  font-family="PingFang SC,Helvetica Neue,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol"  font-weight="normal" ><text  alignment-baseline="middle">calcium</text></g><path  stroke-width="1"  stroke="#7442D4"  d="M168.3133216895684 60.21711700624401L143.66383441325365 50.946925385855124L133.66383441325365 50.946925385855124"  fill="none"  /><g  stroke-width="0"  stroke-linejoin="bevel"  stroke="#ffffff"  fill-opacity="1"  fill="#FFC400"  transform="matrix(1, 0, 0, 1, 120.3440130929497, 36.89022715880614)"  text-anchor="middle"  alignment-baseline="middle"  font-size="14"  font-family="PingFang SC,Helvetica Neue,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol"  font-weight="normal" ><text  alignment-baseline="middle">sodium</text></g><path  stroke-width="1"  stroke="#FFC400"  d="M190.17168124521618 46.113081030913605L158.77999484343798 36.89022715880614L148.77999484343798 36.89022715880614"  fill="none"  /><g  stroke-width="0"  stroke-linejoin="bevel"  stroke="#ffffff"  fill-opacity="1"  fill="#304D77"  transform="matrix(1, 0, 0, 1, 130.55325625889662, 22.89022715880614)"  text-anchor="middle"  alignment-baseline="middle"  font-size="14"  font-family="PingFang SC,Helvetica Neue,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol"  font-weight="normal" ><text  alignment-baseline="middle">potassium</text></g><path  stroke-width="1"  stroke="#304D77"  d="M210.3983801804518 37.883416426950575L178.9222214078224 22.89022715880614L168.9222214078224 22.89022715880614"  fill="none"  /><g  stroke-width="0"  stroke-linejoin="bevel"  stroke="#ffffff"  fill-opacity="1"  fill="#B48DEB"  transform="matrix(1, 0, 0, 1, 174.52908113825885, 8.890227158806141)"  text-anchor="middle"  alignment-baseline="middle"  font-size="14"  font-family="PingFang SC,Helvetica Neue,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol"  font-weight="normal" ><text  alignment-baseline="middle">others</text></g><path  stroke-width="1"  stroke="#B48DEB"  d="M234.41011445590985 32.87541331955492L209.98305300105181 8.890227158806141L199.98305300105181 8.890227158806141"  fill="none"  /></g></g></g></g><g class="legend"  transform="matrix(1, 0, 0, 1, 20, 131.10000000000002)" ><g class="innerView" ><g class="" ><g class="legendItem"  cursor="pointer" ><g class=""  transform="matrix(1, 0, 0, 1, 7, 9.8)" ><path  stroke-opacity="1"  stroke-width="0"  stroke="#1664FF"  fill-opacity="1"  fill="#1664FF"  opacity="1"  cursor="pointer"  d="M5 0C5 2.761423749153967 2.761423749153968 5 3.061616997868383e-16 5C-2.7614237491539666 5 -4.999999999999999 2.761423749153968 -5 6.123233995736766e-16C-5 -2.7614237491539666 -2.7614237491539684 -4.999999999999999 -9.184850993605148e-16 -5C2.761423749153966 -5 4.999999999999999 -2.7614237491539684 5 -1.2246467991473533e-15"  class="legendItemShape"   /><g  fill="#606773"  opacity="1"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 11, 0)"  text-anchor="start"  alignment-baseline="middle"  font-size="12"  class="legendItemLabel" ><text  alignment-baseline="middle">oxygen</text></g></g></g><g class="legendItem"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 0, 25.6)" ><g class=""  transform="matrix(1, 0, 0, 1, 7, 9.8)" ><path  stroke-opacity="1"  stroke-width="0"  stroke="#1AC6FF"  fill-opacity="1"  fill="#1AC6FF"  opacity="1"  cursor="pointer"  d="M5 0C5 2.761423749153967 2.761423749153968 5 3.061616997868383e-16 5C-2.7614237491539666 5 -4.999999999999999 2.761423749153968 -5 6.123233995736766e-16C-5 -2.7614237491539666 -2.7614237491539684 -4.999999999999999 -9.184850993605148e-16 -5C2.761423749153966 -5 4.999999999999999 -2.7614237491539684 5 -1.2246467991473533e-15"  class="legendItemShape"   /><g  fill="#606773"  opacity="1"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 11, 0)"  text-anchor="start"  alignment-baseline="middle"  font-size="12"  class="legendItemLabel" ><text  alignment-baseline="middle">silicon</text></g></g></g><g class="legendItem"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 0, 51.2)" ><g class=""  transform="matrix(1, 0, 0, 1, 7, 9.8)" ><path  stroke-opacity="1"  stroke-width="0"  stroke="#FF8A00"  fill-opacity="1"  fill="#FF8A00"  opacity="1"  cursor="pointer"  d="M5 0C5 2.761423749153967 2.761423749153968 5 3.061616997868383e-16 5C-2.7614237491539666 5 -4.999999999999999 2.761423749153968 -5 6.123233995736766e-16C-5 -2.7614237491539666 -2.7614237491539684 -4.999999999999999 -9.184850993605148e-16 -5C2.761423749153966 -5 4.999999999999999 -2.7614237491539684 5 -1.2246467991473533e-15"  class="legendItemShape"   /><g  fill="#606773"  opacity="1"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 11, 0)"  text-anchor="start"  alignment-baseline="middle"  font-size="12"  class="legendItemLabel" ><text  alignment-baseline="middle">aluminum</text></g></g></g><g class="legendItem"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 0, 76.80000000000001)" ><g class=""  transform="matrix(1, 0, 0, 1, 7, 9.8)" ><path  stroke-opacity="1"  stroke-width="0"  stroke="#3CC780"  fill-opacity="1"  fill="#3CC780"  opacity="1"  cursor="pointer"  d="M5 0C5 2.761423749153967 2.761423749153968 5 3.061616997868383e-16 5C-2.7614237491539666 5 -4.999999999999999 2.761423749153968 -5 6.123233995736766e-16C-5 -2.7614237491539666 -2.7614237491539684 -4.999999999999999 -9.184850993605148e-16 -5C2.761423749153966 -5 4.999999999999999 -2.7614237491539684 5 -1.2246467991473533e-15"  class="legendItemShape"   /><g  fill="#606773"  opacity="1"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 11, 0)"  text-anchor="start"  alignment-baseline="middle"  font-size="12"  class="legendItemLabel" ><text  alignment-baseline="middle">iron</text></g></g></g><g class="legendItem"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 0, 102.4)" ><g class=""  transform="matrix(1, 0, 0, 1, 7, 9.8)" ><path  stroke-opacity="1"  stroke-width="0"  stroke="#7442D4"  fill-opacity="1"  fill="#7442D4"  opacity="1"  cursor="pointer"  d="M5 0C5 2.761423749153967 2.761423749153968 5 3.061616997868383e-16 5C-2.7614237491539666 5 -4.999999999999999 2.761423749153968 -5 6.123233995736766e-16C-5 -2.7614237491539666 -2.7614237491539684 -4.999999999999999 -9.184850993605148e-16 -5C2.761423749153966 -5 4.999999999999999 -2.7614237491539684 5 -1.2246467991473533e-15"  class="legendItemShape"   /><g  fill="#606773"  opacity="1"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 11, 0)"  text-anchor="start"  alignment-baseline="middle"  font-size="12"  class="legendItemLabel" ><text  alignment-baseline="middle">calcium</text></g></g></g><g class="legendItem"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 0, 128)" ><g class=""  transform="matrix(1, 0, 0, 1, 7, 9.8)" ><path  stroke-opacity="1"  stroke-width="0"  stroke="#FFC400"  fill-opacity="1"  fill="#FFC400"  opacity="1"  cursor="pointer"  d="M5 0C5 2.761423749153967 2.761423749153968 5 3.061616997868383e-16 5C-2.7614237491539666 5 -4.999999999999999 2.761423749153968 -5 6.123233995736766e-16C-5 -2.7614237491539666 -2.7614237491539684 -4.999999999999999 -9.184850993605148e-16 -5C2.761423749153966 -5 4.999999999999999 -2.7614237491539684 5 -1.2246467991473533e-15"  class="legendItemShape"   /><g  fill="#606773"  opacity="1"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 11, 0)"  text-anchor="start"  alignment-baseline="middle"  font-size="12"  class="legendItemLabel" ><text  alignment-baseline="middle">sodium</text></g></g></g><g class="legendItem"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 0, 153.6)" ><g class=""  transform="matrix(1, 0, 0, 1, 7, 9.8)" ><path  stroke-opacity="1"  stroke-width="0"  stroke="#304D77"  fill-opacity="1"  fill="#304D77"  opacity="1"  cursor="pointer"  d="M5 0C5 2.761423749153967 2.761423749153968 5 3.061616997868383e-16 5C-2.7614237491539666 5 -4.999999999999999 2.761423749153968 -5 6.123233995736766e-16C-5 -2.7614237491539666 -2.7614237491539684 -4.999999999999999 -9.184850993605148e-16 -5C2.761423749153966 -5 4.999999999999999 -2.7614237491539684 5 -1.2246467991473533e-15"  class="legendItemShape"   /><g  fill="#606773"  opacity="1"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 11, 0)"  text-anchor="start"  alignment-baseline="middle"  font-size="12"  class="legendItemLabel" ><text  alignment-baseline="middle">potassium</text></g></g></g><g class="legendItem"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 0, 179.2)" ><g class=""  transform="matrix(1, 0, 0, 1, 7, 9.8)" ><path  stroke-opacity="1"  stroke-width="0"  stroke="#B48DEB"  fill-opacity="1"  fill="#B48DEB"  opacity="1"  cursor="pointer"  d="M5 0C5 2.761423749153967 2.761423749153968 5 3.061616997868383e-16 5C-2.7614237491539666 5 -4.999999999999999 2.761423749153968 -5 6.123233995736766e-16C-5 -2.7614237491539666 -2.7614237491539684 -4.999999999999999 -9.184850993605148e-16 -5C2.761423749153966 -5 4.999999999999999 -2.7614237491539684 5 -1.2246467991473533e-15"  class="legendItemShape"   /><g  fill="#606773"  opacity="1"  cursor="pointer"  transform="matrix(1, 0, 0, 1, 11, 0)"  text-anchor="start"  alignment-baseline="middle"  font-size="12"  class="legendItemLabel" ><text  alignment-baseline="middle">others</text></g></g></g></g></g></g><g class="undefined_interaction"  transform="matrix(1, 0, 0, 1, 122, 70)" ></g></g></g>
</svg>
</div>

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
  animation: false, // 注意，不要开启动画，不然需要监听动画结束事件，再进行svg转换
});
vchart.renderSync();

const svgContent = convertVChartToSvg(vchart);
```

### node 端渲染

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
  // 声明使用的渲染环境以及传染对应的渲染环境参数
  mode: "node",
  modeParams: Canvas,
  animation: false,
});
vchart.renderSync();

const svgContent = convertVChartToSvg(vchart);
```

## 🔗 相关链接

- [主页](https://www.visactor.io/vchart)
- [VCharts 图表示例](https://www.visactor.io/vchart/example)
- [VChart 图表教程](https://www.visactor.io/vchart/guide/tutorial_docs/VChart_Website_Guide)
- [VChart 图表配置项](https://www.visactor.io/vchart/option/)
- [VChart API](https://www.visactor.io/vchart/api/API/vchart)
- [VGrammar](https://www.visactor.io/vgrammar)
- [VRender](https://www.visactor.io/vrender)
- [FAQ](https://www.visactor.io/vchart/guide/tutorial_docs/FAQ)
- [CodeSandbox 模板](https://codesandbox.io/s/the-template-of-visactor-vchart-vl84ww?file=/src/index.ts) 用于 bug 的提交

## 🤝 参与贡献 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/visactor/vchart-svg-plugin/blob/main/CONTRIBUTING.md#your-first-pull-request)

如想参与贡献，请先阅读[行为准则](./CODE_OF_CONDUCT.md) 和[贡献指南](./CONTRIBUTING.zh-CN.md)。

细流成河，终成大海！

<a href="https://github.com/visactor/vchart-svg-plugin/graphs/contributors"><img src="https://contrib.rocks/image?repo=visactor/vchart-svg-plugin" /></a>
