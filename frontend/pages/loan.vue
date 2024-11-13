<template>
    <div class="mx-10 my-6 flex justify-center">
        <div class="bg-white shadow-lg rounded-lg p-6 w-[500px] flex justify-center flex-col align-center">
            <div class="text-2xl font-bold text-[#100D35] mb-4 text-center">Loan Details</div>

            <!-- Loan Name -->
            <div class="flex justify-between mb-3">
                <div class="text-sm font-medium text-[#C7D91F]">Loan Name:</div>
                <div class="text-sm text-gray-800">{{ loan?.loan_name }}</div>
            </div>

            <!-- Loan Amount (USD) -->
            <div class="flex justify-between mb-3">
                <div class="text-sm font-medium text-[#C7D91F]">Amount (USD):</div>
                <div class="text-sm text-gray-800">${{ loan?.loan_amount.USD.toFixed(2) }}</div>
            </div>

            <!-- Loan Amount (GBP) -->
            <div class="flex justify-between mb-3">
                <div class="text-sm font-medium text-[#C7D91F]">Amount (GBP):</div>
                <div class="text-sm text-gray-800">£{{ loan?.loan_amount.GBP.toFixed(2) }}</div>
            </div>

            <!-- Loan Amount in Original Currency -->
            <div class="flex justify-between mb-3">
                <div class="text-sm font-medium text-[#C7D91F]">Amount (Original Currency):</div>
                <div class="text-sm text-gray-800">
                    {{ loan?.loan_amount.original_currency.amount.toLocaleString() }}
                    {{ loan?.loan_amount.original_currency.currency }}
                </div>
            </div>

            <!-- Loan Term -->
            <div class="flex justify-between mb-3">
                <div class="text-sm font-medium text-[#C7D91F]">Loan Term (per month):</div>
                <div class="text-sm text-gray-800">{{ loan?.loan_term }}</div>
            </div>

            <!-- Created At -->
            <div class="flex justify-between mb-3">
                <div class="text-sm font-medium text-[#C7D91F]">Created At:</div>
                <div class="text-sm text-gray-800">{{ loan?.createdAt }}</div>
            </div>

            <!-- View Action Button -->
            <div class="mt-4 w-full flex justify-center gap-5">
                <nuxt-link :to="{ path: '/' }" class="bg-[#100D35] text-[#C7D91F] px-4 py-2 rounded hover:bg-blue-700">
                    Back
                </nuxt-link>
                <button @click="deleteLoan" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800">
                    Delete
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "home",
});
import { useRoute, useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';

const route = useRoute();
const router = useRouter();
const loanId = route.query.id;
const loan = ref(null);

const { data: loans, error } = await useFetch('/api/loans');

// Watch for loans data to be ready, then set the correct loan
watchEffect(() => {
    if (loanId && loans.value?.length > 0) {
        loan.value = loans.value.find(l => String(l._id) === loanId);
    }
});
const deleteLoan = async () => {
    try {
        const { data, error } = await useFetch('/api/loans', {
            method: 'DELETE',
            body: { loanId } 
        });

        if (data._rawValue.success) {
            navigateTo('/');
        } else {
            console.error('Failed to delete loan');
        }
    } catch (err) {
        console.error('Error deleting loan:', err);
    }
};
</script>