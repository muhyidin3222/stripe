import React, { useState, useEffect } from 'react';

import ArchLayout from 'components/layout/ArchLayout'
import { useSelector, useDispatch } from 'react-redux'
import { createBankAccountDispatch, balanceRetrieveDispatch, customersCreateSourceDispatch } from 'redux/actions'
import Skeleton from '@material-ui/lab/Skeleton';
import { Button, TextField, Box } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import useStyles from './styles'

import Modal from 'components/general/Modal'
import balancesCss from 'assets/scss/balances.module.scss'
import config from 'assets/scss/config.module.scss'

import Color from 'config/Color'

const { gray } = Color.Border

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { balance: { balanceRetrieveData }, loading: { loadingGet }, loading } = useSelector(state => state)
    const [openModalCreate, setOpenModalCreate] = useState(false)
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

    console.log(loadingGet, loading, "loadingGet, loading")
    return (
        <ArchLayout>
            <div>
                <div className={balancesCss.contentTop}>
                    <div className={balancesCss.contentLeft}>
                        <ErrorOutlineIcon />
                        <div className={balancesCss.text}>Please add a USD denominated bank account to pay out your USD balance.</div>
                    </div>
                    <Button variant="outlined" size="small" onClick={() => setOpenModalCreate(true)} className={balancesCss.buttonRight} style={{ textTransform: "none" }}>Add Bank Account</Button>
                </div>
                {
                    loadingGet ?
                        <div style={{ marginTop: 12 }}>
                            <Skeleton />
                            <Skeleton animation={false} />
                            <Skeleton animation="wave" />
                        </div>
                        :
                        <div className={balancesCss.contentMiddle}>
                            <div className={`${balancesCss.titleXl}  ${balancesCss.paddingBottom}`} >Balances</div>
                            <div className={`${balancesCss.titleX} `}>USD Balance</div>
                            <Box borderBottom={1} style={{ color: gray }} />
                            {
                                balanceRetrieveData?.available?.map((value, index) => (
                                    <div key={index} className={balancesCss.cardList}>
                                        <div>Currently on the way to your bank account</div>
                                        <div>$ {value.amount}</div>
                                    </div>
                                ))
                            }
                            {
                                balanceRetrieveData?.pending?.map((value, index) => (
                                    <div key={index} className={balancesCss.cardList}>
                                        <div>Funds on hold</div>
                                        <div>$ {value.amount}</div>
                                    </div>
                                ))
                            }
                            <Box borderBottom={1} style={{ color: gray }} />
                            <div className={balancesCss.cardList}>
                                <div>Total</div>
                                <div>$ {totalAmount}</div>
                            </div>
                        </div>
                }

            </div>
            <Modal
                open={openModalCreate}
                setOpen={setOpenModalCreate}
            >
                <div className={balancesCss.wpModal}>
                    <div>Your bank account</div>
                    <div>We'll send your USD payouts to this bank account.</div>
                    <TextField
                        label="Normal"
                        id="outlined-margin-normal"
                        defaultValue={dataCreate.country || ""}
                        className={classes.textField}
                        InputProps={{
                            classes: {
                                input: classes.fontSize,
                            }
                        }}
                        onChange={onChange}
                        margin="normal"
                        name="Account holder name"
                        size="small"
                        variant="outlined"
                    />
                    <TextField
                        label="Normal"
                        id="outlined-margin-normal"
                        defaultValue={dataCreate.routing_number || ""}
                        className={classes.textField}
                        InputProps={{
                            classes: {
                                input: classes.fontSize,
                            }
                        }}
                        onChange={onChange}
                        margin="normal"
                        name="Routing number"
                        size="small"
                        variant="outlined"
                    />
                    <TextField
                        label="Normal"
                        id="outlined-margin-normal"
                        defaultValue={dataCreate.account_number || ""}
                        className={classes.textField}
                        InputProps={{
                            classes: {
                                input: classes.fontSize,
                            }
                        }}
                        onChange={onChange}
                        margin="normal"
                        name="Account number"
                        size="small"
                        variant="outlined"
                    />
                    <div className={dataCreate.textBottom}>Your bank account must be a checking account.</div>
                    <TextField
                        label="Normal"
                        id="outlined-margin-normal"
                        defaultValue={dataCreate.account_number_repeat || ""}
                        className={classes.textField}
                        InputProps={{
                            classes: {
                                input: classes.fontSize,
                            }
                        }}
                        onChange={onChange}
                        margin="normal"
                        name="Confirm account number"
                        size="small"
                        variant="outlined"
                    />
                    <div className={balancesCss.buttonModal}>
                        <Button variant="outlined" size="small" style={{ textTransform: "none" }} onClick={() => setOpenModalCreate(false)}>Cancel</Button>
                        <Button variant="outlined" size="small" color="primary" style={{ textTransform: "none", marginLeft: 5 }} onClick={createBankAccount}>Add bank account</Button>
                    </div>
                </div>
            </Modal>
        </ArchLayout>
    )
}