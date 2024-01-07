<template>
  <div
    class="bg-white dark:bg-gradient-to-br dark:from-[#2C3442] dark:to-[#192126] p-5 rounded-xl"
  >
    <h1 class="text-lg font-medium text-gray-700 dark:text-tgray-200">
      BTC Price Change
    </h1>
    <div
      class="mt-3.5 mb-6 flex border-gray-150 dark:border-tgray-500/15 w-full border-t border-solid"
    ></div>
    <div class="flex flex-col space-y-5">
      <div class="flex justify-between">
        <div class="text-gray-500 dark:text-tblack-400 text-lg">All</div>
        <div
          :class="{
            'text-tsuccess': totalChanges > 0,
            'text-twarning': totalChanges < 0,
          }"
        >
          {{ totalChanges + "%" }}
        </div>
      </div>
      <div class="flex justify-between">
        <div class="text-gray-500 dark:text-tblack-400 text-lg">365 days</div>
        <div
          :class="{
            'text-tsuccess': changes['365d'] > 0,
            'text-twarning': changes['365d'] < 0,
          }"
        >
          {{ changes["365d"] + "%" }}
        </div>
      </div>
      <div class="flex justify-between">
        <div class="text-gray-500 dark:text-tblack-400 text-lg">180 days</div>
        <div
          :class="{
            'text-tsuccess': changes['180d'] > 0,
            'text-twarning': changes['180d'] < 0,
          }"
        >
          {{ changes["180d"] + "%" }}
        </div>
      </div>
      <div class="flex justify-between">
        <div class="text-gray-500 dark:text-tblack-400 text-lg">60 days</div>
        <div
          :class="{
            'text-tsuccess': changes['60d'] > 0,
            'text-twarning': changes['60d'] < 0,
          }"
        >
          {{ changes["60d"] + "%" }}
        </div>
      </div>
      <div class="flex justify-between">
        <div class="text-gray-500 dark:text-tblack-400 text-lg">30 days</div>
        <div
          :class="{
            'text-tsuccess': changes['30d'] > 0,
            'text-twarning': changes['30d'] < 0,
          }"
        >
          {{ changes["30d"] + "%" }}
        </div>
      </div>
      <div class="flex justify-between">
        <div class="text-gray-500 dark:text-tblack-400 text-lg">5 days</div>
        <div
          :class="{
            'text-tsuccess': changes['5d'] > 0,
            'text-twarning': changes['5d'] < 0,
          }"
        >
          {{ changes["5d"] + "%" }}
        </div>
      </div>
      <div class="flex justify-between">
        <div class="text-gray-500 dark:text-tblack-400 text-lg">24 H</div>
        <div
          :class="{
            'text-tsuccess': changes['24h'] > 0,
            'text-twarning': changes['24h'] < 0,
          }"
        >
          {{ changes["24h"] + "%" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const changes = ref({
  "24h": 0,
  "5d": 0,
  "30d": 0,
  "60d": 0,
  "180d": 0,
  "365d": 0,
});

const totalChanges = computed(() => {
  return Object.values(changes.value).reduce((a, b) => a + b, 0);
});

onMounted(async () => {
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

  changes.value["24h"] = parseFloat(calculateChangePercantage(changes24h.data));
  changes.value["5d"] = parseFloat(calculateChangePercantage(changes5d.data));
  changes.value["30d"] = parseFloat(calculateChangePercantage(changes30d.data));
  changes.value["60d"] = parseFloat(calculateChangePercantage(changes60d.data));
  changes.value["180d"] = parseFloat(
    calculateChangePercantage(changes180d.data)
  );
  changes.value["365d"] = parseFloat(
    calculateChangePercantage(changes365d.data)
  );
});

const calculateChangePercantage = (changes: any) => {
  const firstPrice = changes[0].priceUsd;
  const lastPrice = changes[changes.length - 1].priceUsd;
  const change = lastPrice - firstPrice;
  const percentage = (change / firstPrice) * 100;
  return percentage.toFixed(2);
};
</script>
