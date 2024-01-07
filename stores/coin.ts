import { defineStore } from "pinia";
import { useAxios } from "~/composables/useAxios";
import { ENDPOINTS } from "~/constants/endpoints";

export const useCoinStore = defineStore("coinStore", {
  state: () => ({
    coins: [],
  }),
  getters: {
    getCoins(): any[] {
      return this.coins;
    },
  },
  actions: {
    updatePrices(data: any) {
      this.coins.forEach((coin: any) => {
        const coinData = data[coin.id];
        if (coinData) {
          coin.priceUsd = coinData;
        }
      });
    },
    async updateCoins() {
      const response = await useAxios(ENDPOINTS.API.BASE.ASSETS);
      this.coins.map((coin: any) => {
        const coinData = response.data.find(
          (item: any) => item.id === coin.id
        );
        if (coinData) {
          coin.rank = coinData.rank;
          coin.symbol = coinData.symbol;
          coin.name = coinData.name;
          coin.supply = coinData.supply;
          coin.maxSupply = coinData.maxSupply;
          coin.marketCapUsd = coinData.marketCapUsd;
          coin.volumeUsd24Hr = coinData.volumeUsd24Hr;
          coin.changePercent24Hr = coinData.changePercent24Hr;
          coin.vwap24Hr = coinData.vwap24Hr;
        }
      });
    },
    async fetchAssets() {
      const response = await useAxios(ENDPOINTS.API.BASE.ASSETS);
      this.coins = response.data;
    },
  },
  persist: true,
});
