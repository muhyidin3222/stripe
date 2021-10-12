import { combineReducers } from 'redux'

import auth from './auth'
import balance from './balance'
import issuing from './issuing'
import loading from './loading'
import products from './products'
import customers from './customers'
import payment from './payment'
import disputes from './disputes'
import event from './event'
import topUp from './topUp'
import payOut from './payOut'
import transfers from './transfers'
import invoices from './invoices'
import subscriptions from './subscriptions'
import quote from './quote'
import invoiceItem from './invoiceItem'
import checkout from './checkout'
import account from './account'
import error from './error'
import general from './general'

export default combineReducers({
    auth,
    balance,
    loading,
    issuing,
    products,
    customers,
    payment,
    disputes,
    event,
    topUp,
    payOut,
    transfers,
    invoices,
    subscriptions,
    quote,
    invoiceItem,
    checkout,
    account,
    error,
    general
})