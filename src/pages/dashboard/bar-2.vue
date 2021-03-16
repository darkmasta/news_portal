<script>
import { Bar } from "vue-chartjs";


export default {
  extends: Bar,
  data() {
    return {
      gradient: null,
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 200);
    this.gradient.addColorStop(0, "rgba(188, 195, 205, 1)");
    this.gradient.addColorStop(1, "rgba(221, 228, 239, 1)");

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
            borderWidth: 0,
            borderRadius: 10,
            backgroundColor: this.gradient,
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