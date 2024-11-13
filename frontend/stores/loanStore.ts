import { defineStore } from 'pinia';

export const useLoanStore = defineStore('loan', {
  state: () => ({
    loans: [],
  }),
  actions: {
    setLoans(data: any) {
      this.loans = data;
    },
  },
  getters: {
    getLoans(state) {
      return state.loans;
    },
  },
});