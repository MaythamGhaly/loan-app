export default defineEventHandler(async (event) => {
    const mainConfig = useRuntimeConfig();
    const { loan_name,amount,loan_term,currency } = await readBody(event);
    try {
        const res = await $fetch(mainConfig.public.apiBaseUrl + '/loan', {
            method: 'post',
            body:{
                loan_name,
                amount,
                loan_term,
                currency
            }
        });
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
});