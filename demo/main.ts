import VChart, {
  ILineChartSpec,
  IPieChartSpec,
  registerLiquidChart,
} from "@visactor/vchart";
import "./style.css";
import { convertVChartToSvg } from "../src";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="chart-container">
  </div>
  <div id="svg-container">
   <p class="title">svg转换效果</p>
   <div class="svg-content"></div>
  </div>
`;
const pointerPath =
  "M-0.020059 -0.978425 C-0.018029 -0.9888053 -0.013378 -1 0 -1 C0.01342 -1 0.01812 -0.989146 0.0201 -0.978425 C0.02161 -0.9702819 0.0692 -0.459505 0.09486 -0.184807 C0.10298 -0.097849 0.1089 -0.034548 0.11047 -0.018339 C0.11698 0.04908 0.07373 0.11111 0.00002 0.11111 C-0.07369 0.11111 -0.117184 0.04991 -0.110423 -0.018339 C-0.103662 -0.086591 -0.022089 -0.9680447 -0.020059 -0.978425Z";
const circlePath =
  "M1 0 C1 0.55228 0.55228 1 0 1 C-0.552285 1 -1 0.55228 -1 0 C-1 -0.552285 -0.552285 -1 0 -1 C0.55228 -1 1 -0.552285 1 0Z";

const spec = {
  type: "gauge",
  data: [
    {
      id: "id0",
      values: [
        {
          type: "目标A",
          value: 0.6,
        },
      ],
    },
  ],
  radiusField: "type",
  angleField: "value",
  seriesField: "type",
  outerRadius: 0.8,
  innerRadius: 0.5,
  startAngle: -225,
  endAngle: 45,
  gauge: {
    type: "circularProgress",
    progress: {
      style: {
        fill: {
          gradient: "conical",
          stops: [
            {
              offset: 0,
              color: "#4FC6B4",
            },
            {
              offset: 1,
              color: "#31679E",
            },
          ],
        },
      },
    },
    track: {
      style: {
        fill: "#ccc",
      },
    },
  },
  pointer: {
    width: 0.5,
    height: 0.5,
    style: {
      path: pointerPath,
      fill: "#5A595E",
    },
  },
  pin: {
    style: {
      path: circlePath,
      fill: "#888",
    },
  },
  pinBackground: {
    width: 0.08,
    height: 0.08,
    style: {
      path: circlePath,
      fill: "#ddd",
    },
  },
};

const vchart = new VChart(spec, {
  dom: "chart-container",
  animation: false,
});
vchart.renderSync();

const svgContainer = document.querySelector(".svg-content");

if (svgContainer) {
  const svgContent = convertVChartToSvg(vchart);

  if (svgContent) {
    svgContainer.innerHTML = svgContent;
  }
}
