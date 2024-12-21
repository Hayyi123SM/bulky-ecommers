import { createApi } from "@reduxjs/toolkit/query/react"
import axios from "axios"
import Cookies from "js-cookie"

const getToken = () => {
    const token = Cookies.get("token")
    return token ? JSON.parse(token) : null
}
// Create an axios baseQuery function for RTK Query
const axiosBaseQuery =
    ({ baseUrl }) =>
    async ({
        url,
        method,
        data,
        params,
        headers = { "Content-Type": "application/json" },
    }) => {
        try {
            const token = getToken()
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                params,
                headers: {
                    ...headers,
                    Authorization: `Bearer ${token}`,
                },
            })
            return { data: result.data }
        } catch (axiosError) {
            let err = axiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

export const apiWithTokenSlice = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }),
    endpoints: builder => ({
        // POST
        login: builder.mutation({
            query: credentials => ({
                url: "/login",
                method: "POST",
                data: credentials,
            }),
        }),
        loginWithGoogle: builder.mutation({
            query: idToken => ({
                url: "/login/social",
                method: "POST",
                data: idToken,
            }),
        }),
        logout: builder.mutation({
            query: credentials => ({
                url: "/logout",
                method: "POST",
                data: credentials,
            }),
        }),
        register: builder.mutation({
            query: userData => ({
                url: "/register",
                method: "POST",
                data: userData,
            }),
        }),
        forgotPassword: builder.mutation({
            query: email => ({
                url: "/forgot-password",
                method: "POST",
                data: email,
            }),
        }),
        otp: builder.mutation({
            query: data => ({
                url: "/validate-otp",
                method: "POST",
                data: data,
            }),
        }),
        resetPassword: builder.mutation({
            query: data => ({
                url: "/create-new-password",
                method: "POST",
                data: data,
            }),
        }),
        validatePassword: builder.mutation({
            query: data => ({
                url: "/validate-password",
                method: "POST",
                data: data,
            }),
        }),
        resetPin: builder.mutation({
            query: data => ({
                url: "/create-new-pin",
                method: "POST",
                data: data,
            }),
        }),
        updateProfile: builder.mutation({
            query: data => ({
                url: "/profile/update",
                method: "POST",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        }),
        validatePin: builder.mutation({
            query: data => ({
                url: "/validate-pin",
                method: "POST",
                data: data,
            }),
        }),
        updateDocument: builder.mutation({
            query: ({ formData, applicant_id, document_id }) => ({
                url: `/visa-applicant/document/${applicant_id}/${document_id}/update`,
                method: "POST",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        }),
        updateVisaApplicant: builder.mutation({
            query: ({ data, applicant_id }) => ({
                url: `/visa-applicants/${applicant_id}/update`,
                method: "POST",
                data: data,
            }),
        }),
        storeVisaApplicant: builder.mutation({
            query: data => ({
                url: "/create/visa-applicants",
                method: "POST",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        }),
        changePassword: builder.mutation({
            query: data => ({
                url: "/change-password",
                method: "POST",
                data: data,
            }),
        }),
        storeBankAccount: builder.mutation({
            query: data => ({
                url: "/bank-account",
                method: "POST",
                data: data,
            }),
        }),
        updateBankAccount: builder.mutation({
            query: ({ data, bank_account_id }) => ({
                url: `/bank-account/${bank_account_id}`,
                method: "PUT",
                data: data,
            }),
        }),
        storePartner: builder.mutation({
            query: data => ({
                url: "/partners",
                method: "POST",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        }),
        storeWithdrawal: builder.mutation({
            query: data => ({
                url: "/partner/withdraw",
                method: "POST",
                data: data,
            }),
        }),
        storeVisaOrder: builder.mutation({
            query: data => ({
                url: "/create/visa-order",
                method: "POST",
                data: data,
            }),
        }),
        storeAllMissingRequirement: builder.mutation({
            query: data => ({
                url: "/get-missing-requirements",
                method: "POST",
                data: data,
            }),
        }),
        storeAddDocument: builder.mutation({
            query: ({ formData, applicant_id, requirements_id }) => ({
                url: `/visa-applicant/${applicant_id}/add-document/${requirements_id}`,
                method: "POST",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        }),
        storeMerchant: builder.mutation({
            query: data => ({
                url: "/merchants",
                method: "POST",
                data: data,
            }),
        }),
        storeSubscription: builder.mutation({
            query: data => ({
                url: "/subscriptions",
                method: "POST",
                data: data,
            }),
        }),
        storeMerchantWithdrawal: builder.mutation({
            query: data => ({
                url: "/merchant/withdraw",
                method: "POST",
                data: data,
            }),
        }),
        storeMerchantVoucher: builder.mutation({
            query: data => ({
                url: "/merchant/voucher",
                method: "POST",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        }),
        updateMerchantVoucher: builder.mutation({
            query: ({ data, voucher_id }) => ({
                url: `/merchant/voucher/${voucher_id}`,
                method: "POST",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        }),
        storeMerchantReview: builder.mutation({
            query: data => ({
                url: "/merchant-review",
                method: "POST",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        }),

        // GET
        profile: builder.query({
            query: params => ({
                url: "/profile",
                method: "GET",
                params: params,
            }),
        }),
        getAllApplicants: builder.query({
            query: params => ({
                url: "/visa-applicants",
                method: "GET",
                params: params,
            }),
        }),
        getAllApplicantById: builder.query({
            query: visa_applicant_id => ({
                url: `/visa-applicants/${visa_applicant_id}`,
                method: "GET",
            }),
        }),
        getVisaDestination: builder.query({
            query: () => ({
                url: "/visa-destination",
                method: "GET",
            }),
        }),
        getPurposeVisit: builder.query({
            query: () => ({
                url: "/purpose-of-visit",
                method: "GET",
            }),
        }),
        getListSponsor: builder.query({
            query: () => ({
                url: "/sponsor",
                method: "GET",
            }),
        }),
        getDurationStay: builder.query({
            query: () => ({
                url: "/duration-stay",
                method: "GET",
            }),
        }),
        getAllProduct: builder.query({
            query: () => ({
                url: "/products",
                method: "GET",
            }),
        }),
        getDetailProduct: builder.query({
            query: product_id => ({
                url: `/products/${product_id}`,
                method: "GET",
            }),
        }),
        getDownloadDocument: builder.query({
            query: ({ applicant_id, document_id }) => ({
                url: `/visa-applicant/document/${applicant_id}/${document_id}/download`,
                method: "GET",
            }),
        }),
        getAboutUs: builder.query({
            query: () => ({
                url: "/about-onmawe",
                method: "GET",
            }),
        }),
        getPrivacyPolice: builder.query({
            query: () => ({
                url: "/privacy-policy",
                method: "GET",
            }),
        }),
        getListAllBank: builder.query({
            query: () => ({
                url: "/list-bank",
                method: "GET",
            }),
        }),
        getListBankAccount: builder.query({
            query: () => ({
                url: "/bank-account",
                method: "GET",
            }),
        }),
        getTermsAndCondition: builder.query({
            query: () => ({
                url: "/terms-conditions",
                method: "GET",
            }),
        }),
        getPartner: builder.query({
            query: () => ({
                url: "/partners",
                method: "GET",
            }),
        }),
        getPartnerStep: builder.query({
            query: () => ({
                url: "/partner/step",
                method: "GET",
            }),
        }),
        getPartnerWithdrawHistory: builder.query({
            query: type => ({
                url: `/partner/history?type=${type}`,
                method: "GET",
            }),
        }),
        getSyncDocument: builder.query({
            query: ({ applicant_id, product_id }) => ({
                url: `/visa-applicant/sync-document/${applicant_id}/${product_id}`,
                method: "GET",
            }),
        }),
        getAllMissingRequirement: builder.query({
            query: applicant_id => ({
                url: `/visa-applicant/${applicant_id}/missing-requirements`,
                method: "GET",
            }),
        }),
        getCurrentVisa: builder.query({
            query: () => ({
                url: `/current-visa?type=stay`,
                method: "GET",
            }),
        }),
        getBusinessCategory: builder.query({
            query: () => ({
                url: "/merchant/category",
                method: "GET",
            }),
        }),
        getSubBusinessCategory: builder.query({
            query: category_id => ({
                url: `/merchant/category/sub_category/${category_id}`,
                method: "GET",
            }),
        }),
        getMerchantStep: builder.query({
            query: () => ({
                url: "/merchant/step",
                method: "GET",
            }),
        }),
        getMerchant: builder.query({
            query: () => ({
                url: "/merchants",
                method: "GET",
            }),
        }),
        getSubcription: builder.query({
            query: () => ({
                url: "/subscriptions",
                method: "GET",
            }),
        }),
        getMerchantWithdrawHistory: builder.query({
            query: ({ filter, search, start_date, end_date }) => {
                const params = new URLSearchParams({
                    ...(filter && { filter }), // Handle "this_week" or "this_month"
                    ...(search && { search }), // Handle search keyword
                    ...(start_date && { start_date }), // Handle specific start date
                    ...(end_date && { end_date }), // Handle specific end date
                })

                return {
                    url: `/merchant/history${params.toString() ? `?${params.toString()}` : ""}`,
                    method: "GET",
                }
            },
        }),
        getMerchantVoucher: builder.query({
            query: () => ({
                url: `/merchant/voucher`,
                method: "GET",
            }),
        }),
        getDetailMerchantVoucher: builder.query({
            query: voucher_id => ({
                url: `/merchant/voucher/${voucher_id}/show`,
                method: "GET",
            }),
        }),
        getDistrictBali: builder.query({
            query: () => ({
                url: "/districts-bali",
                method: "GET",
            }),
        }),
        getExperienceCategory: builder.query({
            query: () => ({
                url: "/merchant/category",
                method: "GET",
            }),
        }),
        getExperienceSubCategory: builder.query({
            query: category_id => ({
                url: `/merchant/category/sub_category/${category_id}`,
                method: "GET",
            }),
        }),
        getMerchantSubCategory: builder.query({
            query: sub_category_id => ({
                url: `/merchants/sub-category/${sub_category_id}`,
                method: "GET",
            }),
        }),
        getMerchantDetail: builder.query({
            query: merchant_id => ({
                url: `/merchants/${merchant_id}/details`,
                method: "GET",
            }),
        }),
        getVoucherFavorite: builder.query({
            query: () => ({
                url: "/voucher-favorites",
                method: "GET",
            }),
        }),
        getActivityOrder: builder.query({
            query: ({ order_status }) => ({
                url: `/activity/order${order_status}`,
                method: "GET",
            }),
        }),
        getActivityOrderDetail: builder.query({
            query: activity_order_id => ({
                url: `/activity/order/${activity_order_id}`,
                method: "GET",
            }),
        }),

        // DELETE
        removeDocument: builder.mutation({
            query: ({ applicant_id, document_id }) => ({
                url: `/visa-applicant/document/${applicant_id}/${document_id}/delete`,
                method: "DELETE",
            }),
        }),
        deleteBankAccount: builder.mutation({
            query: bank_account_id => ({
                url: `/bank-account/${bank_account_id}`,
                method: "DELETE",
            }),
        }),
        deleteMerchantVoucher: builder.mutation({
            query: voucher_id => ({
                url: `/merchant/voucher/${voucher_id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useLoginWithGoogleMutation,
    useLogoutMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    useOtpMutation,
    useResetPasswordMutation,
    useValidatePasswordMutation,
    useResetPinMutation,
    useUpdateProfileMutation,
    useValidatePinMutation,
    useUpdateDocumentMutation,
    useUpdateVisaApplicantMutation,
    useStoreVisaApplicantMutation,
    useChangePasswordMutation,
    useStoreBankAccountMutation,
    useUpdateBankAccountMutation,
    useStorePartnerMutation,
    useStoreWithdrawalMutation,
    useStoreVisaOrderMutation,
    useStoreAllMissingRequirementMutation,
    useStoreAddDocumentMutation,
    useStoreMerchantMutation,
    useStoreSubscriptionMutation,
    useStoreMerchantWithdrawalMutation,
    useStoreMerchantVoucherMutation,
    useUpdateMerchantVoucherMutation,
    useStoreMerchantReviewMutation,

    useProfileQuery,
    useGetAllApplicantsQuery,
    useGetAllApplicantByIdQuery,
    useGetVisaDestinationQuery,
    useGetPurposeVisitQuery,
    useGetListSponsorQuery,
    useGetDurationStayQuery,
    useGetAllProductQuery,
    useGetDetailProductQuery,
    useGetDownloadDocumentQuery,
    useGetAboutUsQuery,
    useGetPrivacyPoliceQuery,
    useGetListAllBankQuery,
    useGetListBankAccountQuery,
    useGetTermsAndConditionQuery,
    useGetPartnerQuery,
    useGetPartnerStepQuery,
    useGetPartnerWithdrawHistoryQuery,
    useGetSyncDocumentQuery,
    useGetAllMissingRequirementQuery,
    useGetCurrentVisaQuery,
    useGetBusinessCategoryQuery,
    useGetSubBusinessCategoryQuery,
    useGetMerchantStepQuery,
    useGetMerchantQuery,
    useGetSubcriptionQuery,
    useGetMerchantWithdrawHistoryQuery,
    useGetMerchantVoucherQuery,
    useGetDetailMerchantVoucherQuery,
    useGetDistrictBaliQuery,
    useGetExperienceCategoryQuery,
    useGetExperienceSubCategoryQuery,
    useGetMerchantSubCategoryQuery,
    useGetMerchantDetailQuery,
    useGetVoucherFavoriteQuery,
    useGetActivityOrderQuery,
    useGetActivityOrderDetailQuery,

    useRemoveDocumentMutation,
    useDeleteBankAccountMutation,
    useDeleteMerchantVoucherMutation,
} = apiWithTokenSlice
