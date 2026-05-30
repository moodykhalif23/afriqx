// Tree-shaken ECharts registration shared by all chart components.
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import {
  BarChart,
  CandlestickChart,
  LineChart,
  MapChart,
  PieChart,
} from "echarts/charts";
import {
  GraphicComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TooltipComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  CandlestickChart,
  PieChart,
  MapChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
  GraphicComponent,
]);
