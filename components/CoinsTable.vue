<template>
  <div
    class="bg-white dark:bg-gradient-to-br dark:from-[#2C3442] dark:to-[#192126] p-5 rounded-xl"
  >
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-lg font-medium text-gray-700 dark:text-tgray-200">
        Market
      </h1>
      <div class="relative flex items-center">
        <input
          v-model="q"
          placeholder="Search..."
          class="text-lg text-black dark:text-white dark:placeholder:text-tblack-400 pl-4 pr-11 py-2.5 outline-none bg-transparent ring-1 ring-black/20 dark:ring-tblack-200 focus:ring-black/40 dark:focus:ring-tblack-300 rounded-full w-64 transition-all duration-300"
        />
        <Icon
          name="i-solar-minimalistic-magnifer-linear"
          class="absolute right-4 text-black/50 dark:text-tblack-400"
        />
      </div>
    </div>
    <UTable
      sort-asc-icon="i-heroicons-arrow-up-20-solid"
      sort-desc-icon="i-heroicons-arrow-down-20-solid"
      :columns="columns"
      :rows="filteredCoins"
      :ui="{
        divide: 'divide-y divide-gray-150 dark:divide-tgray-500/15',
        thead: 'border-t border-gray-150 dark:border-tgray-500/15',
        tbody: 'divide-y divide-gray-150 dark:divide-tgray-500/15',
        th: {
          padding: 'px-3 py-5',
          color: 'dark:text-tblack-400',
        },
        td: {
          padding: 'px-3 py-4',
          color: 'dark:text-white',
          size: 'text-base',
        },
      }"
    >
      <template #market-data="{ row }">
        <div class="flex items-center gap-2">
          <img
            :src="`https://assets.coincap.io/assets/icons/${row.symbol.toLowerCase()}@2x.png`"
            class="w-10"
          />
          <div>{{ row.market + ` (${row.symbol})` }}</div>
        </div>
      </template>
      <template #24h-change-data="{ row }">
        <div
          :class="{
            'text-green-500': row['24h-change'] > 0,
            'text-red-500': row['24h-change'] < 0,
          }"
        >
          {{ row["24h-change"] }}%
        </div>
      </template>
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="coinStore.coins.length"
        :inactive-button="{ color: 'gray' }"
        :prev-button="{ color: 'gray' }"
        :next-button="{ color: 'gray' }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const coinStore = useCoinStore();

const columns = ref([
  {
    key: "market",
    label: "Market",
    sortable: true,
  },
  {
    key: "price",
    label: "Price",
    sortable: true,
  },
  {
    key: "24h-change",
    label: "24H Change",
    sortable: true,
  },
  {
    key: "24h-lowest",
    label: "24H Lowest",
    sortable: true,
  },
  {
    key: "24h-highest",
    label: "24H Highest",
    sortable: true,
  },
  {
    key: "24h-volume",
    label: "24H Volume",
    sortable: true,
  },
  {
    key: "24h-value",
    label: "24H Value",
    sortable: true,
  },
]);

const coins = computed(() =>
  coinStore.coins.map((coin: any) => {
    return {
      market: coin.name,
      price: fixedNumber(parseFloat(coin.priceUsd)),
      "24h-change": parseFloat(coin.changePercent24Hr).toFixed(2),
      "24h-lowest": 0,
      "24h-highest": 0,
      "24h-volume": abbreviateNumber(parseFloat(coin.volumeUsd24Hr)),
      "24h-value": abbreviateNumber(parseFloat(coin.marketCapUsd)),
      symbol: coin.symbol,
    };
  })
);

const q = ref("");

const page = ref(1);
const pageCount = 10;

const filteredCoins = computed(() => {
  if (!q.value) {
    return coins.value.slice(
      (page.value - 1) * pageCount,
      page.value * pageCount
    );
  }

  return coins.value
    .filter((coin: any) => {
      return coin.market.toLowerCase().includes(q.value.toLowerCase());
    })
    .slice((page.value - 1) * pageCount, page.value * pageCount);
});

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
