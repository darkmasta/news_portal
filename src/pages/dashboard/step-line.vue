<script>
import { generateChart } from "vue-chartjs";
import Chart from "chart.js";

Chart.controllers.ShadowChart = Chart.defaults.line;
let draw = Chart.controllers.line.prototype.draw;
Chart.controllers.ShadowChart = Chart.controllers.line.extend({
  draw: function () {
    draw.apply(this, arguments);
    let ctx = this.chart.chart.ctx;
    let _stroke = ctx.stroke;
    ctx.stroke = function () {
      ctx.save();
      ctx.shadowColor = "rgba(40, 47, 101, 0.18)";
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 9;
      _stroke.apply(this, arguments);
      ctx.restore();
    };
  },
});

const ShadowChart = generateChart('shadow-chart', 'ShadowChart');

export default {
  extends: ShadowChart,
  data() {
    return {
      gradient: null,
    };
  },
  mounted() {
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            data: [17000, 20000, 28000, 35000, 25000, 31000, 19000],
            borderWidth: 1,
            borderColor: "#93D302",
            backgroundColor: "#FFFFFF",
            pointerBackgroundColor: "#FFFFFF",
            pointBorderColor: "#93D303",
            pointBorderWidth: 2,
            fill: false,
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          easing: "easeInOutQuad",
          duration: 520,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                lineWidth: 1,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                lineWidth: 1,
              },
            },
          ],
        },
        elements: {
          line: {
            tension: 0,
          },
          point: {
            radius: 7,
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          titleFontFamily: "Manrope",
          backgroundColor: "#ffffff",
          titleFontColor: "#282F65",
          textColor: "#282F65",
          caretSize: 10,
          cornerRadius: 13,
          xPadding: 50,
          yPadding: 10,
        },
      }
    );
  },
};
</script>