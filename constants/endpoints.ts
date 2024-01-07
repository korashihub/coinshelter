const API_BASE_URL = "https://api.coincap.io/v2";
const API_SOCKET_URL = "wss://ws.coincap.io";

export const ENDPOINTS = {
  API: {
    BASE: {
      ASSETS: `${API_BASE_URL}/assets`,
    },
    SOCKET: {
      TRADES: `${API_SOCKET_URL}/trades`,
      PRICES: `${API_SOCKET_URL}/prices`,
    },
  },
};
