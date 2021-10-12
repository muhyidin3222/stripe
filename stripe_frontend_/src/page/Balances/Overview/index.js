import React, { useState, useEffect } from 'react';

import ArchLayout from 'components/layout/ArchLayout'
import { useSelector, useDispatch } from 'react-redux'
import { createBankAccountDispatch, balanceRetrieveDispatch, customersCreateSourceDispatch } from 'redux/actions'
// import Skeleton from '@material-ui/lab/Skeleton';
import { DollarOutlined } from '@ant-design/icons'
import { Button, Input, Card, Typography, Modal, Form } from 'antd';
import useStyles from './styles'
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import balancesCss from 'assets/scss/balances.module.scss'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Color from 'config/Color'
import { currencyFromat } from 'utils/format'
import ModalPayOut from 'components/general/Modal/Payout'
import ModelBalance from 'components/general/Modal/Balances'

const { gray } = Color.Border
const { Title } = Typography

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { balance: { balanceRetrieveData }, loading: { loadingGet }, loading } = useSelector(state => state)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [customerPayout, setCustomerPayout] = useState(false)
    const [amount, onChangeAmount] = useState("")
    const [typeCard, setTypeCard] = useState("")

    const [dataCreate, setdataCreate] = useState({
        country: 'US',
        currency: 'usd',
        account_holder_name: 'Jenny Rosen',
        account_holder_type: 'individual',
        routing_number: '110000000',
        account_number: '000123456789',
        account_number_repeat: '000123456789',
    })

    // country: 'US',
    //     currency: 'usd',
    //     account_holder_name: 'Jenny Rosen',
    //     account_holder_type: 'individual',
    //     routing_number: '110000000',
    //     account_number: '000123456789',
    //     account_number_repeat: "000123456789"

    // "object": "bank_account",
    // "account_holder_name": "Jane Austen",
    // "account_holder_type": "individual",
    // "account_type": null,
    // "bank_name": "STRIPE TEST BANK",
    // "country": "US",
    // "currency": "usd",
    // "customer": "cus_K5oFcRXWd0ErtN",
    // "fingerprint": "1JWtPxqbdX5Gamtz",
    // "last4": "6789",
    // "metadata": {},
    // "routing_number": "110000000",
    // "status": "new"

    useEffect(() => {
        const apiBalance = async () => {
            await dispatch(balanceRetrieveDispatch())
        }
        apiBalance()

        return () => {
        }
    }, [])

    const createBankAccount = () => {
        if (dataCreate.account_number_repeat === dataCreate.account_number) {
            dispatch(createBankAccountDispatch({
                country: dataCreate.country,
                currency: dataCreate.currency,
                account_holder_name: dataCreate.account_holder_name,
                account_holder_type: dataCreate.account_holder_type,
                routing_number: dataCreate.routing_number,
                account_number: dataCreate.account_number,
            }))
        } else {

        }
    }



    const submit = async (e) => {
        const dataPushSkill = []
        // dataList.map(item => skillData.map(val => val === item.name && dataPushSkill.push(item.id)))
        // data.skill = dataPushSkill.toString()
        // if (paymentTipsData) {
        //     delete data.paymentTipsData
        // }
        // const res = await dispatch(updateUser(data))
        // if (res) {
        //     history.push("/user/list")
        // }
    }

    const onChange = e => {
        setdataCreate({
            ...dataCreate,
            [e.target.name]: e.target.value
        })
    }

    const addBankAccount = async () => {
        // console.log(dataCreate)
        await dispatch(customersCreateSourceDispatch(dataCreate))
        setOpenModalCreate(false)
    }

    const totalAmount = balanceRetrieveData?.available?.reduce((t, value) => t + value?.amount || 0).amount || 0 + balanceRetrieveData?.pending?.reduce((t, value) => t + value?.amount || 0).amount || 0
    const totalIssuing = balanceRetrieveData?.issuing?.available?.reduce((t, value) => t + value?.amount || 0).amount || 0 + balanceRetrieveData?.issuing?.pending?.reduce((t, value) => t + value?.amount || 0).amount || 0
    const balanceCurrency = balanceRetrieveData?.available?.reduce((t, value) => t + value?.amount || 0)?.amount
    const availableSoon = balanceRetrieveData?.pending?.reduce((t, value) => t + value?.amount || 0)?.amount
    // console.log(balanceRetrieveData)
    return (
        <ArchLayout>
            <Card
                title="Balances"
                style={{ width: "80%" }}
                loading={loadingGet}
                extra={
                    <div style={{ display: 'flex' }}>
                        <Button size="small" type="primary" onClick={() => setCustomerPayout(true)}>Pay out to bank</Button>
                        <Button size="small" style={{ marginLeft: 20 }} onClick={() => setOpenModalCreate(true)}>Add Bank Account</Button>
                    </div>
                }
            >
                <div className={balancesCss.contentMiddle}>
                    <div className={`${balancesCss.titleX} `}>USD Balance</div>
                    {/* {
                        balanceRetrieveData?.available?.map((value, index) => (
                            <div key={index} className={balancesCss.cardList}>
                                {console.log(value)}
                                <div>Available to pay out to your bank account</div>
                                <div>{currencyFromat({ amount: value.amount, currency: value.currency })}</div>
                            </div>
                        ))
                    } */}
                    <div className={balancesCss.cardList}>
                        <div>Currently on the way to your bank account</div>
                        <div>$ {balanceCurrency}</div>
                    </div>
                    <div className={balancesCss.cardList}>
                        <div>Will be available soon</div>
                        <div>$ {availableSoon}</div>
                    </div>
                    <div className={balancesCss.cardList}>
                        <div className={balancesCss.titleLg}>Total</div>
                        <div>$ {totalAmount}</div>
                    </div>

                    <div className={`${balancesCss.titleX} `}>Outgoing from Stripe</div>
                    {
                        balanceRetrieveData?.available?.map((value, index) => (
                            <div key={index}>
                                <div className={balancesCss.titleLg}>Available to pay out to your bank account</div>
                                <div>You are using manual payouts. To set up automatic payouts, adjust your </div>
                                {/* <div>{currencyFromat({amount: value.amount, currency: value.currency})}</div> */}
                                <div className={balancesCss.total}>
                                    <div className={balancesCss.titleLg}>Total</div>
                                    <div>{currencyFromat({ amount: value?.amount, currency: value?.currency })}</div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        balanceRetrieveData?.pending?.map((value, index) => (
                            <div key={index}>
                                <div className={balancesCss.titleLg}>Currently on the way to your bank account</div>
                                <div>These funds should arrive in your bank account soon.</div>
                                <div className={balancesCss.total}>
                                    <div className={balancesCss.titleLg}>Total</div>
                                    <div>{currencyFromat({ amount: value?.amount, currency: value?.currency })}</div>
                                </div>
                            </div>
                        ))
                    }

                    <div className={`${balancesCss.titleX} `}>Incoming to Stripe</div>
                    {
                        balanceRetrieveData?.connect_reserved?.map((value, index) => (
                            <div key={index}>
                                <div className={balancesCss.titleLg}>Will be available in Stripe soon</div>
                                <div>This amount is estimated because transactions are still accumulating.</div>
                                <div className={balancesCss.total}>
                                    <div className={balancesCss.titleLg}>Total</div>
                                    <div>{currencyFromat({ amount: value.amount, currency: value.currency })}</div>
                                </div>
                            </div>
                        ))
                    }
                    <div className={`${balancesCss.titleX} `}>Issuing balance</div>
                    {
                        balanceRetrieveData?.issuing?.available && balanceRetrieveData?.issuing?.available?.map((value, index) => (
                            <div key={index} className={balancesCss.cardList}>
                                <div>Available to spend on your issued cards</div>
                                {/* {console.log(value.amount,"balanceRetrieveData?.issuing?.available")} */}
                                {value.amount}
                                {/* <div>{currencyFromat({ amount: value.amount, currency: value.currency })}</div> */}
                            </div>
                        ))
                    }
                    {
                        balanceRetrieveData?.issuing?.pending?.map((value, index) => (
                            <div key={index} className={balancesCss.cardList}>
                                <div>Will be available soon on your issued cards</div>
                                <div>{currencyFromat({ amount: value.amount, currency: value.currency })}</div>
                            </div>
                        ))
                    }

                    <div className={balancesCss.cardList}>
                        <div className={balancesCss.titleLg}>Total</div>
                        <div>$ {totalIssuing}</div>
                    </div>
                </div>
            </Card>

            <ModelBalance
                modal={openModalCreate}
                setModal={setOpenModalCreate}
            />

            {/* <Modal
                title="Add funds to your Stripe balance"
                visible={openModalCreate}
                onOk={setOpenModalCreate}
                onCancel={() => setOpenModalCreate(false)}
            >
                <Title level={5} style={{ marginBottom: 10 }}>Choose where to add funds</Title>
                {typeCard === "" || typeCard === "connectedAccount" ? <Card
                    hoverable={true}
                    onClick={() => setTypeCard("connectedAccount")}
                    style={{ marginTop: 10 }}
                >
                    <div
                        style={{ display: "flex" }}
                    >
                        <SettingsInputComponentIcon />
                        <div style={{ marginLeft: 10 }}>
                            <Title level={5}>Connected account</Title>
                            <div>Add funds for future payouts to connected accounts</div>
                        </div>
                    </div>
                </Card> : ""}

                {typeCard === "" || typeCard === "refundsDisputes" ?
                    <Card
                        hoverable={true}
                        onClick={() => setTypeCard("refundsDisputes")}
                        style={{ marginTop: 10 }}
                    >
                        <div style={{ display: "flex" }}>
                            <FlipToBackIcon />
                            <div style={{ marginLeft: 10 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Title level={5}>Refunds and disputes</Title>
                                    <Title level={5} style={{ marginTop: 0 }}>$ {totalAmount}</Title>
                                </div>
                                <div>Pay back a current negative balance, or set aside funds for refunds and chargebacks to avoid future negative balances</div>
                            </div>
                        </div>
                    </Card>
                    : ""}

                {typeCard === "" || typeCard === "issuingBalance" ? <Card
                    hoverable={true}
                    onClick={() => setTypeCard("issuingBalance")}
                    style={{ marginTop: 10 }}
                >
                    <div style={{ display: "flex" }}>
                        <ExitToAppIcon />
                        <div style={{ marginLeft: 10, width: '100%' }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Title level={5}>Issuing balance</Title>
                                <Title level={5} style={{ marginTop: 0 }}>$ {totalIssuing}</Title>
                            </div>
                            <div>For funds to your Strpe balance</div>
                        </div>
                    </div>
                </Card>
                    : ""}
                {typeCard ? <Form
                    layout="vertical"
                    style={{ marginTop: 20 }}
                >
                    <Form.Item
                        label="Amount"
                        required
                        name="amount"
                    >
                        <Input
                            value={amount || ""}
                            onChange={(e) => onChangeAmount(e.target.value)}
                            name="amount"
                            size="small"
                        />
                    </Form.Item>
                </Form> : ""}
            </Modal> */}


            <ModalPayOut
                modal={customerPayout}
                setModal={setCustomerPayout}
            />
        </ArchLayout>
    )
}