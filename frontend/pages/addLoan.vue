<template>
    <div class="max-w-2xl mx-auto p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Submit a Loan</h2>
        <form @submit.prevent="submitLoan" class="space-y-4">
            <div class="flex flex-col">
                <label for="loan_name" class="text-sm font-medium text-gray-700">Name</label>
                <input v-model="loanForm.loan_name" id="loan_name" type="text"
                    class="mt-2 p-2 border border-gray-300 rounded-lg" placeholder="Enter your name" required />
            </div>

            <div class="flex flex-col">
                <label for="amount" class="text-sm font-medium text-gray-700">Loan Amount</label>
                <div class="flex space-x-2">
                    <input v-model="loanForm.amount" id="amount" type="number"
                        class="mt-2 p-2 border border-gray-300 rounded-lg w-full" placeholder="Enter loan amount"
                        required />
                    <select v-model="loanForm.currency" id="currency"
                        class="mt-2 p-2 border border-gray-300 rounded-lg w-28">
                        <!-- Dynamically generate options -->
                        <option v-for="currency in fetchedcurrencies[0].currencies" :key="currency" :value="currency">{{
                            currency }}</option>
                    </select>
                </div>
            </div>

            <div class="flex flex-col">
                <label for="loan_term" class="text-sm font-medium text-gray-700">Loan Term (per month)</label>
                <input v-model="loanForm.loan_term" id="loan_term" type="number"
                    class="mt-2 p-2 border border-gray-300 rounded-lg" placeholder="Enter loan term in months"
                    required />
            </div>

            <!-- Success or error message -->
            <div v-if="message" :class="message.type === 'success' ? 'text-green-500' : 'text-red-500'"
                class="mt-4 text-center">
                {{ message.text }}
            </div>

            <div class="text-center flex gap-5 w-full justify-center">
                <button type="submit"
                    class="bg-[#100D35] text-[#C7D91F] px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none">
                    Submit Loan
                </button>
                <nuxt-link :to="{ path: '/' }"
                    class="bg-[#100D35] text-[#C7D91F] px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none">
                    Back
                </nuxt-link>
            </div>
        </form>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "home",
});
import { ref } from 'vue';

const { data: fetchedcurrencies, error } = await useFetch('/api/currencies');

const loanForm = ref({
    loan_name: '',
    amount: '',
    currency: 'USD',
    loan_term: ''
});

// Message state for showing success or error
const message = ref(null);

const submitLoan = async () => {
    try {
        // Call your API to submit the loan form data
        await useFetch('/api/loans', {
            method: 'POST',
            body: loanForm.value
        });

        // Set the success message and reset after 3 seconds
        message.value = { text: 'Loan submitted successfully!', type: 'success' };
        setTimeout(() => {
            message.value = null;
        }, 3000); // Hide message after 3 seconds

        loanForm.value = { loan_name: '', amount: '', currency: 'USD', loan_term: '' }; // Reset form
    } catch (error) {
        console.error('Error submitting loan:', error);

        // Set the error message and reset after 3 seconds
        message.value = { text: 'Failed to submit loan', type: 'error' };
        setTimeout(() => {
            message.value = null;
        }, 3000); // Hide message after 3 seconds
    }
};
</script>