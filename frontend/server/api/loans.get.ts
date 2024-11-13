import { useLoanStore } from '~~/stores/loanStore';

export default defineEventHandler(async (event) => {
    const mainConfig = useRuntimeConfig();
    const loanStore = useLoanStore();

    try {
        const res = await $fetch(mainConfig.public.apiBaseUrl + '/loan', {
            method: 'get',
        });
        // Store the fetched data in Pinia store
        loanStore.setLoans(res);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
});