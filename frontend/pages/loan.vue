<template>
    <div class="mx-10 my-6 flex justify-center">
        <div class="bg-white shadow-lg rounded-lg p-6 w-[500px] flex justify-center flex-col align-center w-full">
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
import { useLoanStore } from '~~/stores/loanStore';
import { useRoute } from 'vue-router';

const loanStore = useLoanStore();
const loans = loanStore.getLoans;
const route = useRoute();
const loanId = String(route.query.id);
let loan = null;

// Fetch loans if not already loaded
if (!loans || loans.length === 0) {
    const { data: fetchedLoans, error } = await useFetch('/api/loans');
    if (fetchedLoans) {
        loanStore.setLoans(fetchedLoans); // Use the setLoans action to update the loans
    }
}

// Find the loan with the matching loanId
if (loanId && loans.length > 0) {
    loan = loans.find(l => String(l._id) === loanId);
}

const deleteLoan = async () => {
    try {
        // Call the server-side API to delete the loan
        const { data, error } = await useFetch('/api/loans', {
            method: 'DELETE',
            body: { loanId } // Pass the loanId in the request body
        });

        if (data._rawValue.success) {
            loanStore.setLoans(loans.filter(l => l._id !== loanId)); // Remove the loan from store
            // Optionally, redirect or notify the user
            navigateTo('/'); // Redirect to the homepage or another page after successful deletion
        } else {
            console.error('Failed to delete loan');
        }
    } catch (err) {
        console.error('Error deleting loan:', err);
    }
};
</script>