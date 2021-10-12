import React from 'react';

//material
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AppsIcon from '@material-ui/icons/Apps';
import PaymentIcon from '@material-ui/icons/Payment';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import GroupIcon from '@material-ui/icons/Group';

export default [
    {
        "path": "/customers/main",
        "name": "Customers",
        "icon": <GroupIcon />
    },
    // {
    //     "path": "/",
    //     "name": "Home",
    //     "icon": <AppsIcon />
    // },
    {
        "path": "/payment",
        "name": "Payment",
        "icon": <PaymentIcon />,
        "subMenu": [
            {
                "path": "/payment/main",
                "name": "Main",
                "manPath": '/payment'
            },
            {
                "path": "/payment/reviews",
                "name": "Reviews",
                "manPath": '/payment'
            },
            {
                "path": "/payment/disputes",
                "name": "Disputes",
                "manPath": '/payment'
            },
            // {
            //     "path": "/payment/top-ups",
            //     "name": "Top-ups",
            //     "manPath": '/payment'
            // },
            {
                "path": "/payment/payouts",
                "name": "Payouts",
                "manPath": '/payment'
            },
            {
                "path": "/payment/all-transactions",
                "name": "All transactions",
                "manPath": '/payment'
            },
            {
                "path": "/payment/invoices",
                "name": "Invoices",
                "manPath": '/payment'
            },
            {
                "path": "/payment/subscriptions",
                "name": "Subscriptions",
                "manPath": '/payment'
            },
            {
                "path": "/payment/quotes",
                "name": "Quotes",
                "manPath": '/payment'
            },
        ]
    },
    {
        "path": "/balances",
        "name": "Balances",
        "icon": <AccountBalanceWalletIcon />,
        "subMenu": [
            {
                "path": "/balances/overview",
                "name": "overview",
                "manPath": '/balances'
            },
            {
                "path": "/balances/top-up",
                "name": "Top-up",
                "manPath": '/balances'
            },
            {
                "path": "/balances/transfers",
                "name": "Transfers",
                "manPath": '/balances'
            },
            {
                "path": "/balances/payouts",
                "name": "Payouts",
                "manPath": '/balances'
            },
        ]
    },
    {
        "path": "/products",
        "name": "Products",
        "icon": <ShoppingBasketIcon />,
        "subMenu": [
            {
                "path": "/products/main",
                "name": "Main",
                "manPath": '/products'
            },
            {
                "path": "/products/coupons",
                "name": "Coupons",
                "manPath": '/products'
            },
            // {
            //     "path": "/products/shipping-rates",
            //     "name": "Shipping rates",
            //     "manPath": '/products'
            // },
            {
                "path": "/products/tax-rates",
                "name": "Tax rates",
                "manPath": '/products'
            },
            // {
            //     "path": "/products/payment-links",
            //     "name": "Payment links",
            //     "manPath": '/products'
            // }
        ]
    },
    {
        "path": "/issuing",
        "name": "Issued Card",
        "icon": <AccountTreeIcon />,
        "subMenu": [
            {
                "path": "/issuing/main",
                "name": "Main",
                "manPath": '/issuing'
            },
            {
                "path": "/issuing/cardholders",
                "name": "Cardholders",
                "manPath": '/issuing'
            },
            {
                "path": "/issuing/authorizations",
                "name": "Authorizations",
                "manPath": '/issuing'
            },
            {
                "path": "/issuing/transactions",
                "name": "Transactions",
                "manPath": '/issuing'
            },
            {
                "path": "/issuing/disputes",
                "name": "Disputes",
                "manPath": '/issuing'
            }
        ]
    },
    {
        "path": "/setting/main",
        "name": "Setting",
        "icon": <SettingsIcon />,
        "subMenu": [
            {
                "path": "/setting/account",
                "name": "Account",
                "manPath": '/setting'
            },
        ]
    },
]