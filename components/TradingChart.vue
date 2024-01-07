<template>
  <div
    class="bg-white dark:bg-gradient-to-br dark:from-[#2C3442] dark:to-[#192126] p-5 rounded-xl h-full"
  >
    <div class="h-full">
      <Line :data="data" :options="options" class="h-full" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ENDPOINTS } from "~/constants/endpoints";
const chartOptions = ref({});
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const changes = ref({
  "24h": 0,
  "5d": 0,
  "30d": 0,
  "60d": 0,
  "180d": 0,
  "365d": 0,
});

const calculateChangePercantage = (changes: any) => {
  const firstPrice = changes[0].priceUsd;
  const lastPrice = changes[changes.length - 1].priceUsd;
  const change = lastPrice - firstPrice;
  const percentage = (change / firstPrice) * 100;
  return percentage.toFixed(2);
};

const changes24h = await useAxios(
  "https://api.coincap.io/v2/assets/bitcoin/history?interval=m1"
);
const changes5d = await useAxios(
  "https://api.coincap.io/v2/assets/bitcoin/history?interval=m5"
);
const changes30d = await useAxios(
  "https://api.coincap.io/v2/assets/bitcoin/history?interval=h1"
);
const changes60d = await useAxios(
  "https://api.coincap.io/v2/assets/bitcoin/history?interval=h2"
);
const changes180d = await useAxios(
  "https://api.coincap.io/v2/assets/bitcoin/history?interval=h6"
);
const changes365d = await useAxios(
  "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1"
);

changes.value["24h"] = changes24h.data;
changes.value["5d"] = changes5d.data;
changes.value["30d"] = changes30d.data;
changes.value["60d"] = changes60d.data;
changes.value["180d"] = changes180d.data;
changes.value["365d"] = changes365d.data;

const realTimeData: any = ref([]);

onMounted(async () => {
  const pricesWs = new WebSocket(
    `${ENDPOINTS.API.SOCKET.PRICES}?assets=bitcoin`
  );
  pricesWs.onmessage = async (msg) => {
    const data = JSON.parse(msg.data);
    const schema = {
      label: new Date().toLocaleTimeString("en-us"),
      data: data.bitcoin,
    };
    realTimeData.value.push(schema);
  };
});

const data = computed(() => {
  const updatedData = {
    labels: Array.isArray(changes.value["365d"])
      ? changes.value["365d"].map((item: any) =>
          new Date(item.date).toLocaleDateString("en-us")
        )
      : [],
    datasets: [
      {
        label: "Bitcoin",
        backgroundColor: (context: any) => {
          const bgColors = [
            "rgba(142, 152, 255, 0.6)",
            "rgba(142, 152, 255, 0)",
          ];

          if (!context.chart.chartArea) return;

          const {
            ctx,
            data,
            chartArea: { top, bottom },
          } = context.chart;

          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(0, bgColors[0]);
          gradientBg.addColorStop(1, bgColors[1]);
          return gradientBg;
        },
        borderColor: "#8E98FF",
        borderWidth: 1,
        data: Array.isArray(changes.value["365d"])
          ? changes.value["365d"].map((item: any) => item.priceUsd)
          : [],
        fill: true,
      },
    ],
  };

  if (realTimeData.value) {
    realTimeData.value.forEach((item: any) => {
      updatedData.labels.push(item.label);
      updatedData.datasets[0].data.push(item.data);
    });
  }

  return updatedData;
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  radius: 0,
};
</script>
