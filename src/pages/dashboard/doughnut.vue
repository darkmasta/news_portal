<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          label: "My Data",
          pointBackgroundColor: "#F8F9FA",
          borderWidth: 0,
          pointBorderColor: "#F8F9FA",
          data: [95, 100 - 95],
          display: false,
          scaleShowLabels: false,
        };
      },
    },
  },
  data() {
    return {
      gradient: null,
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 70, 100);
    this.gradient.addColorStop(0, "#A4E808");
    this.gradient.addColorStop(0.1, "#F8F9FA");
    this.gradient.addColorStop(1.0, "#A4E808");
    this.addPlugin({
      id: "my-plugin",
      beforeDraw: function (chart) {
        var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;
        chart.ctx.restore();
        var fontSize = (height / 6).toFixed(2);
        chart.ctx.font = fontSize + "px sans-serif";
        chart.ctx.textBaseline = "middle";
        var text = "75%",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2 - 13;
        chart.ctx.fillText(text, textX, textY);
        chart.ctx.save();

        chart.ctx.restore();

        var fontSize2 = (height / 14).toFixed(2);
        chart.ctx.font = fontSize2 + "px sans-serif";
        chart.ctx.textBaseline = "middle";
        var text2 = "$2500 / week",
          textX2 = Math.round((width - ctx.measureText(text2).width) / 2),
          textY2 = height / 2 + 18;
        chart.ctx.fillText(text2, textX2, textY2);
        chart.ctx.save();
      },
    });
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            ...this.options,
            backgroundColor: [this.gradient, "#F8F9FA"],
            hoverBackgroundColor: [this.gradient, "#F8F9FA"],
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 95,
        tooltips: {
          enabled: false,
        },
      }
    );
  },
};
</script>