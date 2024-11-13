import { useLoanStore } from '~~/stores/loanStore';

// Define a type for the response data you expect from the API
interface DeleteLoanResponse {
    success: boolean;
    message: string;
}

export default defineEventHandler(async (event) => {
    const mainConfig = useRuntimeConfig();
    const loanStore = useLoanStore();

    // Extract loanId from the request body using readBody
    const { loanId } = await readBody(event);

    if (!loanId) {
        return { error: 'Loan ID is required' };
    }

    try {
        // Make the API call to delete the loan
        const res = await $fetch<DeleteLoanResponse>(mainConfig.public.apiBaseUrl + `/loan/${loanId}`, {
            method: 'DELETE',
        });

        // If successful, remove the loan from the Pinia store
        if (res.success) {
            loanStore.setLoans(loanStore.getLoans.filter(loan => loan._id !== loanId));
            return { success: true, message: 'Loan deleted successfully' };
        }

        return { success: false, message: 'Failed to delete loan' };

    } catch (err) {
        console.log(err);
        return { success: false, message: 'Error deleting loan' };
    }
});