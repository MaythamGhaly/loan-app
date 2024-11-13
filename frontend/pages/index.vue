<template>
    <div class="w-full flex justify-center my-5">
        <nuxt-link :to="{ path: '/addLoan' }" class="bg-[#100D35] text-[#C7D91F] px-4 py-2 rounded-2xl hover:bg-blue-700">
            Add Loan
        </nuxt-link>
    </div>
    <loans />
</template>

<script setup>
definePageMeta({
    layout: "home",
});
const { data: currencies, error } = await useFetch('/api/addcurrencies');

</script>