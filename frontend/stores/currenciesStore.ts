import { defineStore } from 'pinia';

export const useCurrenciesStore = defineStore('currencies', {
  state: () => ({
    currencies: [],
  }),
  actions: {
    setCurrencies(data: any) {
      this.currencies = data;
    },
  },
  getters: {
    getCurrencies(state) {
      return state.currencies;
    },
  },
});