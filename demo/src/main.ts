import VChart, { registerMediaQuery } from "@visactor/vchart";
import "./style.css";
import { convertVChartToSvg } from "../../src";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="chart-container" >
  </div>
  <div id="svg-container" >
   <p class="title">svg转换效果</p>
   <div class="svg-content"></div>
  </div>
`;

registerMediaQuery();
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
  animation: false,
});
vchart.renderSync();

const svgContainer = document.querySelector(".svg-content");

if (svgContainer) {
  const svgContent = convertVChartToSvg(vchart);

  console.log(svgContent);

  if (svgContent) {
    svgContainer.innerHTML = svgContent;
  }
}
