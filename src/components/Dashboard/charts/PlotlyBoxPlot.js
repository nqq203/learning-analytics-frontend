import Plot from "react-plotly.js";

export default function PlotlyBoxPlot({ data, layout, config, style }) {
  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      style={style}
    />
  );
} 