<template>
  <main class="px-8 py-7 w-full">
    <div class="flex flex-col gap-6">
      <BasicWidgets />
      <div class="flex gap-5">
        <div class="basis-3/4">
          <TradingChart />
        </div>
        <div class="basis-1/4">
          <TradingWidget />
        </div>
      </div>
      <CoinsTable />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ENDPOINTS } from "~/constants/endpoints";
const coinStore = useCoinStore();
await coinStore.fetchAssets();

onMounted(async () => {
  const pricesWs = new WebSocket(`${ENDPOINTS.API.SOCKET.PRICES}?assets=ALL`);
  pricesWs.onmessage = async (msg) => {
    const data = JSON.parse(msg.data);
    coinStore.updatePrices(data);
  };
});
</script>
