<template>
  <div class="grid grid-cols-4 gap-5">
    <div
      class="bg-white dark:bg-gradient-to-b dark:from-[#222B32] dark:to-[#1C2329] p-5 rounded-xl"
    >
      <h1 class="text-lg font-medium text-gray-700 dark:text-tgray-200">
        Price (BTC)
      </h1>
      <div
        class="my-3.5 flex border-gray-150 dark:border-tgray-500/15 w-full border-t border-solid"
      ></div>
      <div class="flex justify-between">
        <div class="flex flex-col space-y-2">
          <div class="text-black dark:text-white text-2xl font-bold">
            ${{ parseFloat((btcPrice ?? 0).toString()) }}
          </div>
          <div class="text-gray-500 dark:text-tblack-400 text-lg">
            Price
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white dark:bg-gradient-to-b dark:from-[#222B32] dark:to-[#1C2329] p-5 rounded-xl"
    >
      <h1 class="text-lg font-medium text-gray-700 dark:text-tgray-200">
        24H Price Change (BTC)
      </h1>
      <div
        class="my-3.5 flex border-gray-150 dark:border-tgray-500/15 w-full border-t border-solid"
      ></div>
      <div class="flex justify-between">
        <div class="flex flex-col space-y-2">
          <div class="text-black dark:text-white text-2xl font-bold">
            {{ changes["length"] }}
          </div>
          <div
            class="text-lg"
            :class="{
              'text-tsuccess': changes['24h'] > 0,
              'text-twarning': changes['24h'] < 0,
            }"
          >
            {{ changes["24h"] > 0 ? "+" : "" }}{{ changes["24h"] }}%
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white dark:bg-gradient-to-b dark:from-[#222B32] dark:to-[#1C2329] p-5 rounded-xl"
    >
      <h1 class="text-lg font-medium text-gray-700 dark:text-tgray-200">
        Total Market Cap (BTC)
      </h1>
      <div
        class="my-3.5 flex border-gray-150 dark:border-tgray-500/15 w-full border-t border-solid"
      ></div>
      <div class="flex justify-between">
        <div class="flex flex-col space-y-2">
          <div class="text-black dark:text-white text-2xl font-bold">
            ${{ abbreviateNumber(parseFloat((btcMarketCap ?? 0).toString())) }}
          </div>
          <div class="text-tblack-400 text-lg">Market Cap</div>
        </div>
      </div>
    </div>
    <div
      class="bg-white dark:bg-gradient-to-b dark:from-[#222B32] dark:to-[#1C2329] p-5 rounded-xl"
    >
      <h1 class="text-lg font-medium text-gray-700 dark:text-tgray-200">
        Supply (BTC)
      </h1>
      <div
        class="my-3.5 flex border-gray-150 dark:border-tgray-500/15 w-full border-t border-solid"
      ></div>
      <div class="flex justify-between">
        <div class="flex flex-col space-y-2">
          <div class="text-black dark:text-white text-2xl font-bold">
            ${{ abbreviateNumber(parseFloat((btcSupply ?? 0).toString())) }}
          </div>
          <div class="text-gray-500 dark:text-tblack-400 text-lg">
            Listed Cryptos
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const coinStore = useCoinStore();

const btcMarketCap = computed(() => {
  const btc: { marketCapUsd?: number } | undefined = coinStore.coins.find(
    (coin: any) => coin.symbol === "BTC"
  );
  return btc && (btc as { marketCapUsd?: number }).marketCapUsd
    ? (btc as { marketCapUsd?: number }).marketCapUsd
    : 0;
});

const btcSupply = computed(() => {
  const btc: { supply?: number } | undefined = coinStore.coins.find(
    (coin: any) => coin.symbol === "BTC"
  );
  return btc && (btc as { supply?: number }).supply
    ? (btc as { supply?: number }).supply
    : 0;
});

const btcPrice = computed(() => {
  const btc: { priceUsd?: number } | undefined = coinStore.coins.find(
    (coin: any) => coin.symbol === "BTC"
  );
  return btc && (btc as { priceUsd?: number }).priceUsd
    ? (btc as { priceUsd?: number }).priceUsd
    : 0;
});

const changes = ref({
  "24h": 0,
  length: 0,
});

onMounted(async () => {
  const changes24h = await useAxios(
    "https://api.coincap.io/v2/assets/bitcoin/history?interval=m1"
  );

  changes.value["24h"] = parseFloat(calculateChangePercantage(changes24h.data));
  changes.value["length"] = changes24h.data.length;
});

const calculateChangePercantage = (changes: any) => {
  const firstPrice = changes[0].priceUsd;
  const lastPrice = changes[changes.length - 1].priceUsd;
  const change = lastPrice - firstPrice;
  const percentage = (change / firstPrice) * 100;
  return percentage.toFixed(2);
};

const abbreviateNumber = (number: number) => {
  const SI_SYMBOL = ["", "k", "m", "b", "t"];

  const tier = (Math.log10(number) / 3) | 0;

  if (tier === 0 || Math.abs(tier) < 1) return number;

  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
};

const fixedNumber = (number: number) => {
  return number === 0 || Math.abs(number) < 1 ? number : number.toFixed(2);
};
</script>
