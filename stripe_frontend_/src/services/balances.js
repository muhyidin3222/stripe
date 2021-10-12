import axios from 'config/axiosConfig'

export const createBankAccountService = data => axios.post(`/privateUser/balances/createBankAccount`, data)
export const balanceRetrieveService = () => axios.get(`/privateUser/balances/balanceRetrieve`)
export const customersCreateSourceService = data => axios.post(`/privateUser/balances/customersCreateSource`, data)
export const balanceTransactionsListService = data => axios.post(`/privateUser/balances/balanceTransactionsList`, data)