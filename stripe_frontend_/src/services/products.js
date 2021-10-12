import axios from 'config/axiosConfig'

export const productsCreateService = data => axios.post('/privateUser/products/productsCreate', data)
export const productsUpdateService = data => axios.put('/privateUser/products/productsUpdate', data)
export const productsGetAllService = data => axios.post('/privateUser/products/productsGetAll', data)
export const productsGetIdService = id => axios.get('/privateUser/products/productsGetId/' + id)
export const productsDeleteService = id => axios.delete('/privateUser/products/productsDelete/' + id)

export const pricesCreateService = data => axios.post('/privateUser/products/pricesCreate', data)
export const pricesUpdateService = data => axios.put('/privateUser/products/pricesUpdate', data)
export const pricesGetAllService = data => axios.post('/privateUser/products/pricesGetAll', data)
export const pricesGetIdService = id => axios.get(`/privateUser/products/pricesGetId/${id}`)
export const pricesDeleteService = data => axios.post('/privateUser/products/pricesDelete', data)

export const cuponsCreateService = data => axios.post('/privateUser/products/couponsCreate', data)
export const cuponsUpdateService = data => axios.put('/privateUser/products/couponsUpdate', data)
export const cuponsGetAllService = data => axios.post('/privateUser/products/couponsGetAll', data)
export const cuponsGetIdService = data => axios.post('/privateUser/products/couponsGetId', data)

export const taxCodeCreateService = data => axios.post('/privateUser/products/taxCodeCreate', data)
export const taxCodeUpdateService = data => axios.put('/privateUser/products/taxCodeUpdate', data)
export const taxCodeGetAllService = data => axios.post('/privateUser/products/taxCodeGetAll', data)
export const taxCodeGetIdService = data => axios.post('/privateUser/products/taxCodeGetId', data)

export const taxRateCreateService = data => axios.post('/privateUser/products/taxRatesCreate', data)
export const taxRateUpdateService = data => axios.put('/privateUser/products/taxRatesUpdate', data)
export const taxRateGetAllService = data => axios.post('/privateUser/products/taxRatesGetAll', data)
export const taxRateGetIdService = data => axios.get('/privateUser/products/taxRatesGetId/' + data)

export const promotionsCreateService = data => axios.post('/privateUser/products/promotionCreate', data)
export const promotionsUpdateService = data => axios.put('/privateUser/products/promotionUpdate', data)
export const promotionsGetAllService = data => axios.post('/privateUser/products/promotionGetAll', data)
export const promotionsGetIdService = data => axios.post('/privateUser/products/promotionGetId', data)

export const subscriptionsDeleteDiscountService = data => axios.delete('/privateUser/products/subscriptionsDeleteDiscount', data)
