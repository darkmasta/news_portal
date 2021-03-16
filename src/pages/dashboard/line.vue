<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
      gradient2: null,
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 100);
    this.gradient.addColorStop(0, "rgba(244, 255, 220, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(244, 255, 220, 0.25)");
    this.gradient.addColorStop(1, "rgba(244, 255, 220, 0)");

    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2.addColorStop(0, "rgba(238, 244, 255, 1)");
    this.gradient2.addColorStop(0.4, "rgba(238, 244, 255, 0.4)");
    this.gradient2.addColorStop(1, "rgba(238, 244, 255, 0)");

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
            borderWidth: 3,
            backgroundColor: this.gradient,
            borderColor: "#A4E808",
            fill: true,
            display: false,
          },
          {
            data: [11000, 16000, 24000, 31000, 21000, 27000, 15000],
            borderWidth: 3,
            backgroundColor: this.gradient2,
            borderColor: "#282F65",
            display: false,
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
                color: "rgba(200, 200, 200, 0.05)",
                lineWidth: 1,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgba(180, 189, 202, 0.53)",
                lineWidth: 1,
              },
            },
          ],
        },
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0.5,
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