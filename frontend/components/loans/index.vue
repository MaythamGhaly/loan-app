<template>
    <div class="overflow-x-auto mx-10">
        <table class="min-w-full table-auto bg-white shadow-lg rounded-lg">
            <thead>
                <tr class="bg-[#100D35]">
                    <th class="px-6 py-3 text-left text-sm font-medium text-[#C7D91F] cursor-pointer"
                        @click="sortBy('name')">
                        Name
                        <i :class="sortOrder === 1 ? 'fas fa-caret-up' : 'fas fa-caret-down'"></i>
                    </th>
                    <th class="px-6 py-3 text-left text-sm font-medium text-[#C7D91F] cursor-pointer"
                        @click="sortBy('amountUSD')">
                        Amount (USD)
                        <i :class="sortOrder === 1 ? 'fas fa-caret-up' : 'fas fa-caret-down'"></i>
                    </th>
                    <th class="px-6 py-3 text-left text-sm font-medium text-[#C7D91F] cursor-pointer"
                        @click="sortBy('amountGBP')">
                        Amount (GBP)
                        <i :class="sortOrder === 1 ? 'fas fa-caret-up' : 'fas fa-caret-down'"></i>
                    </th>
                    <th class="px-6 py-3 text-left text-sm font-medium text-[#C7D91F] cursor-pointer"
                        @click="sortBy('originalCurrency')">
                        Amount (Original Currency)
                        <i :class="sortOrder === 1 ? 'fas fa-caret-up' : 'fas fa-caret-down'"></i>
                    </th>
                    <th class="px-6 py-3 text-left text-sm font-medium text-[#C7D91F] cursor-pointer"
                        @click="sortBy('term')">
                        Term (per month)
                        <i :class="sortOrder === 1 ? 'fas fa-caret-up' : 'fas fa-caret-down'"></i>
                    </th>
                    <th class="px-6 py-3 text-left text-sm font-medium text-[#C7D91F] cursor-pointer"
                        @click="sortBy('date')">
                        Date
                        <i :class="sortOrder === 1 ? 'fas fa-caret-up' : 'fas fa-caret-down'"></i>
                    </th>
                    <th class="px-6 py-3 text-left text-sm font-medium text-[#C7D91F]">Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- If no loans, show message -->
                <tr v-if="sortedLoans.length === 0">
                    <td colspan="7" class="text-center py-4 text-gray-600">
                        No loans data.
                    </td>
                </tr>
                <!-- Render loan rows -->
                <tr v-for="loan in sortedLoans" :key="loan._id" :id="loan._id" class="border-b hover:bg-gray-200">
                    <td class="px-6 py-4 text-sm text-gray-800">{{ loan.loan_name }}</td>
                    <td class="px-6 py-4 text-sm text-gray-800">${{ loan.loan_amount.USD.toFixed(2) }}</td>
                    <td class="px-6 py-4 text-sm text-gray-800">£{{ loan.loan_amount.GBP.toFixed(2) }}</td>
                    <td class="px-6 py-4 text-sm text-gray-800">{{
                        loan.loan_amount.original_currency.amount.toLocaleString() }} {{
                            loan.loan_amount.original_currency.currency }}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">{{ loan.loan_term }}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">{{ loan.createdAt }}</td>
                    <td class="px-6 py-4 text-sm">
                        <nuxt-link :to="{ path: '/loan', query: { id: loan._id } }"
                            class="bg-[#100D35] text-[#C7D91F] px-4 py-2 rounded hover:bg-blue-700">
                            View
                        </nuxt-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Fetch loan data
const { data: loanData, error } = await useFetch('/api/loans');

// Sorting setup
const sortKey = ref('');
const sortOrder = ref(1); // 1 for ascending, -1 for descending

const sortedLoans = computed(() => {
    if (!sortKey.value) return loanData.value;

    return [...loanData.value].sort((a, b) => {
        let aValue, bValue;
        switch (sortKey.value) {
            case 'amountUSD':
                aValue = a.loan_amount.USD;
                bValue = b.loan_amount.USD;
                break;
            case 'amountGBP':
                aValue = a.loan_amount.GBP;
                bValue = b.loan_amount.GBP;
                break;
            case 'originalCurrency':
                aValue = a.loan_amount.original_currency.amount;
                bValue = b.loan_amount.original_currency.amount;
                break;
            case 'term':
                aValue = a.loan_term;
                bValue = b.loan_term;
                break;
            case 'date':
                aValue = new Date(a.createdAt);
                bValue = new Date(b.createdAt);
                break;
            default:
                return 0;
        }
        return (aValue > bValue ? 1 : -1) * sortOrder.value;
    });
});

function sortBy(key) {
    if (sortKey.value === key) {
        sortOrder.value *= -1;
    } else {
        sortKey.value = key;
        sortOrder.value = 1;
    }
}
</script>

<style scoped></style>