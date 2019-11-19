import React from "react";
import ChartistGraph from "react-chartist";
import "chartist/dist/scss/chartist.scss";
import "./MyChart.css";

export default props => {
  const { data, yLabel } = props;

  const delays = 80,
    durations = 500;
  const responsiveOptions = [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ];
  const animation = {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  };
  const barChart = {
    data: {
      labels: data.map(x =>
        new Date(x.date).toLocaleString("default", {
          month: "short",
          day: "2-digit"
        })
      ),
      series: [data.map(x => x.value)]
    },
    options: {
      axisX: {
        showGrid: false
      },
      axisY: {
        offset: 60,
        labelInterpolationFnc: yLabel
      },
      low: 0,
      high: Math.max(...data.map(x => x.value)),
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0
      }
    }
  };

  return (
    <div>
      <ChartistGraph
        className="ct-chart"
        data={barChart.data}
        type="Bar"
        options={barChart.options}
        responsiveOptions={responsiveOptions}
        listener={animation}
      />
    </div>
  );
};
