import React from 'react'
import { Route, Switch, BrowserRouter as Router, HashRouter } from 'react-router-dom'
import ProtectedRoute from 'components/ProtectedRoute'

//page
import Login from 'page/Login'
import Register from 'page/Register'
import NotFound from 'page/NotFound'
import Home from 'page/Home'

import Payment from 'page/Payment/Main'
import PaymentInput from 'page/Payment/Main/Input'

import TopUps from 'page/Payment/TopUps'
import Reviews from 'page/Payment/Reviews'
import Payouts from 'page/Payment/Payouts'
import Disputes from 'page/Payment/Disputes'
import AllTransactions from 'page/Payment/AllTransactions'
import Subscriptions from 'page/Payment/Subscriptions'
import SubscriptionsInput from 'page/Payment/Subscriptions/Input'

import Quotes from 'page/Payment/Quotes'
import Invoices from 'page/Payment/Invoices'
import CollectedFees from 'page/Payment/CollectedFees'

import BalancesOverview from 'page/Balances/Overview'
import BalancesPayouts from 'page/Balances/Payouts'
import BalancesTopUp from 'page/Balances/TopUp'
import BalancesTransfers from 'page/Balances/Transfers'

import Setting from 'page/Setting'

import Products from 'page/Products/Main'
import ProductsInput from 'page/Products/Main/Input'
import ProductsDetail from 'page/Products/Main/Detail'
import Coupons from 'page/Products/Coupons'
import CouponsInput from 'page/Products/Coupons/Input'
import PaymentLinks from 'page/Products/PaymentLinks'
import Shipping from 'page/Products/Shipping'
import TaxRate from 'page/Products/TaxRate'

import Issuing from 'page/Issuing/Main'
import CardNew from 'page/Issuing/Main/New'
import Authorizations from 'page/Issuing/Authorizations'
import Cardholders from 'page/Issuing/Cardholders'
import DisputesIssuing from 'page/Issuing/Disputes'
import Transactions from 'page/Issuing/Transactions'

import Customers from 'page/Customer/Main'
import CustomersEdit from 'page/Customer/Edit'

import "assets/scss/general/nano.scss"
import "assets/index.css"

function App () {
  // const role = localStorage.getItem("role")
  return (
    <HashRouter>
      <Router>
        <Switch>
          {/* <ProtectedRoute exact path='/' component={Home} /> */}
          <ProtectedRoute exact path='/' component={Customers} />
          <Route path='/login' component={Login} />
          {/* <Route path='/register' component={Register} /> */}

          <ProtectedRoute exact path='/payment/main' component={Payment} />
          <ProtectedRoute path='/payment/input' component={PaymentInput} />
          <ProtectedRoute path='/payment/top-ups' component={TopUps} />
          <ProtectedRoute path='/payment/reviews' component={Reviews} />
          <ProtectedRoute path='/payment/disputes' component={Disputes} />
          <ProtectedRoute path='/payment/payouts' component={Payouts} />
          <ProtectedRoute path='/payment/all-transactions' component={AllTransactions} />
          <ProtectedRoute exact path='/payment/subscriptions' component={Subscriptions} />
          <ProtectedRoute path='/payment/subscriptions/input' component={SubscriptionsInput} />

          <ProtectedRoute path='/payment/quotes' component={Quotes} />
          <ProtectedRoute path='/payment/invoices' component={Invoices} />
          <ProtectedRoute path='/payment/collected-fees' component={CollectedFees} />

          <ProtectedRoute path='/balances/overview' component={BalancesOverview} />
          <ProtectedRoute path='/balances/top-up' component={BalancesTopUp} />
          <ProtectedRoute path='/balances/payouts' component={BalancesPayouts} />
          <ProtectedRoute path='/balances/transfers' component={BalancesTransfers} />

          <ProtectedRoute path='/setting/account ' component={Setting} />

          <ProtectedRoute exact path='/products/main' component={Products} />
          <ProtectedRoute exact path='/products/input' component={ProductsInput} />
          <ProtectedRoute path='/products/input/:id' component={ProductsInput} />
          <ProtectedRoute exact path='/products/coupons' component={Coupons} />
          <ProtectedRoute exact path='/products/coupons/input' component={CouponsInput} />
          <ProtectedRoute path='/products/detail/:id' component={ProductsDetail} />

          <ProtectedRoute path='/products/paymentLinks' component={PaymentLinks} />
          <ProtectedRoute path='/products/shipping-rates' component={Shipping} />
          <ProtectedRoute path='/products/tax-rates' component={TaxRate} />

          <ProtectedRoute exact path='/issuing/main' component={Issuing} />
          <ProtectedRoute path='/issuing/authorizations' component={Authorizations} />
          <ProtectedRoute path='/issuing/cardholders' component={Cardholders} />
          <ProtectedRoute path='/issuing/disputes' component={DisputesIssuing} />
          <ProtectedRoute path='/issuing/transactions' component={Transactions} />
          <ProtectedRoute path='/issuing/new-card' component={CardNew} />

          <ProtectedRoute exact path='/customers/main' component={Customers} />
          <ProtectedRoute exact path='/customers/edit/:id' component={CustomersEdit} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </HashRouter>
  )
}

export default App