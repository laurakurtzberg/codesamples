import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { pointPath } from "../common";
import data from "./hurricane.json";

const wind_speed_array = data.features.map(f => f.properties.wind_speed);
const max_wind_speed = wind_speed_array.sort(d3.descending)[0];
const rMin = 0.2;
const rMax = 20;
const rScale = d3
  .scaleSqrt()
  .domain([0, max_wind_speed])
  .range([rMin, rMax]);

const hurricaneColor = d => {
  if (max_wind_speed) {
    const colorScale = d3
      .scaleLinear()
      .domain([1, max_wind_speed])
      .range([d3.rgb("#fff842"), d3.rgb("#a30303")]);
    return colorScale(d.properties.wind_speed);
  } else {
    return "#a30303";
  }
};

data.features.forEach(c => {
  c.properties.radius = rScale(c.properties.wind_speed);
});

const Hurricane = () => {
  const ref = useRef();

  useEffect(() => {
    const hurricanefeatures = d3.select(ref.current);
    const hurricanePoints = hurricanefeatures
      .selectAll("path.hurricanePoints")
      .data(data.features);

    hurricanePoints.exit().remove();

    hurricanePoints
      .enter()
      .append("path")
      .attr("class", "hurricanePoints")
      .merge(hurricanePoints)
      .attr("d", pointPath)
      .style("fill", d => hurricaneColor(d))
      .style("fill-opacity", 0)
      .transition()
      .delay((d, i) => {
        return i * 50;
      })
      .duration(100)
      .style("fill-opacity", 0.6)
      .transition()
      .duration(2500)
      .style("fill-opacity", 0);
  }, []);

  useEffect(() => {
    d3.select(ref.current)
      .selectAll(".hurricanePoints")
      .attr("d", pointPath);
  });

  return <g ref={ref} />;
};

export default Hurricane;
