import axios from 'config/axiosConfig'

export const paymentCreateService = data => axios.post(`/privateUser/payment/paymentCreate`, data)
export const paymentUpdateService = data => axios.put(`/privateUser/payment/paymentUpdate`, data)
export const paymentGetIdService = id => axios.get(`/privateUser/payment/paymentGetId/${id}`)
export const paymentListService = data => axios.post(`/privateUser/payment/paymentList`, data)
export const paymentConfirmService = data => axios.post(`/privateUser/payment/paymentConfirm`, data)
export const paymentCaptureService = data => axios.post(`/privateUser/payment/paymentCapture`, data)
export const paymentCancelService = data => axios.post(`/privateUser/payment/paymentCancel`, data)
export const reviewApproveService = data => axios.post(`/privateUser/payment/reviewsApprove`, data)
export const reviewGetIdService = data => axios.post(`/privateUser/payment/reviewsGetId`, data)
export const reviewListService = data => axios.post(`/privateUser/payment/reviewsList`, data)

export const paymentMethodGetIdService = data => axios.post(`/privateUser/paymentMethodGetId`, data)
export const paymentMethodUpdateService = data => axios.post(`/privateUser/paymentMethodUpdate`, data)
export const paymentMethodCreateService = data => axios.post(`/privateUser/paymentMethodCreate`, data)
export const paymentMethodListService = data => axios.post(`/privateUser/paymentMethodList`, data)

export const applicationFeesListService = data => axios.post(`/privateUser/applicationFeesList`, data)
export const applicationFeesGetIdService = data => axios.post(`/privateUser/applicationFeesGetId`, data)

export const transactionsPaymentCreateService = data => axios.post(`/privateUser/payment/transactionsCreate`, data)
export const transactionsPaymentUpdateService = data => axios.put(`/privateUser/payment/transactionsUpdate`, data)
export const transactionsPaymentGetAllService = data => axios.get(`/privateUser/payment/transactionsGetAll`, data)
export const transactionsPaymentGetIdService = data => axios.get(`/privateUser/payment/transactionsGetId`, data)
