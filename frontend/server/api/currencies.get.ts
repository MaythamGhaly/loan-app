import { useCurrenciesStore } from '~~/stores/currenciesStore';

export default defineEventHandler(async (event) => {
    const mainConfig = useRuntimeConfig();
    const currenciesStore = useCurrenciesStore();

    try {
        const res = await $fetch(mainConfig.public.apiBaseUrl + '/getcurrencies', {
            method: 'get',
        });
        // Store the fetched data in Pinia store
        currenciesStore.setCurrencies(res);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
});