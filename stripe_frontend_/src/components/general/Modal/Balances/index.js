import React, { useState, useEffect } from 'react'
import { Modal, Input, Form, Typography, Card } from 'antd';
import { useDispatch } from 'react-redux'
import { customersBankDispatch, payOutCreateDispatch, topUpCreateDispatch } from 'redux/actions';
import { useSelector } from 'react-redux'
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import FlipToBackIcon from '@material-ui/icons/FlipToBack';

const { Title } = Typography

export default function Index (props) {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const { modal, setModal, amountTotal } = props
    const { loading: { loadingCreate } } = useSelector(state => state)
    const [amount, onChangeAmount] = useState("")
    const [typeCard, setTypeCard] = useState("")

    // useEffect(() => {
    //     const apiBalance = async () => {
    //         await dispatch(customersBankDispatch({ limit: 3 }))
    //     }
    //     apiBalance()

    //     return () => {
    //     }
    // }, [])

    const submit = () => {
        form
            .validateFields()
            .then(async values => {
                form.resetFields();
                if (typeCard === "refundsDisputes") {
                    //topup
                    await dispatch(topUpCreateDispatch({
                        currency: 'usd',
                        amount
                    }))
                }
                if (typeCard === "connectedAccount") {
                    //payout
                    await dispatch(payOutCreateDispatch({
                        currency: 'usd',
                        amount
                    }))
                }
                if (typeCard === "issuingBalance") {
                }
                setModal(false)
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="Add funds to your Stripe balance"
            visible={modal}
            onOk={submit}
            loading={loadingCreate}
            onCancel={() => setModal(false)}
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
                                {/* <Title level={5} style={{ marginTop: 0 }}>$ {totalAmount}</Title> */}
                            </div>
                            <div>Pay back a current negative balance, or set aside funds for refunds and chargebacks to avoid future negative balances</div>
                        </div>
                    </div>
                </Card>
                : ""}

            {
                // typeCard === "" || typeCard === "issuingBalance" ? <Card
                //     hoverable={true}
                //     onClick={() => setTypeCard("issuingBalance")}
                //     style={{ marginTop: 10 }}
                // >
                //     <div style={{ display: "flex" }}>
                //         <ExitToAppIcon />
                //         <div style={{ marginLeft: 10, width: '100%' }}>
                //             <div style={{ display: "flex", justifyContent: "space-between" }}>
                //                 <Title level={5}>Issuing balance</Title>
                //                 {/* <Title level={5} style={{ marginTop: 0 }}>$ {totalIssuing}</Title> */}
                //             </div>
                //             <div>For funds to your Strpe balance</div>
                //         </div>
                //     </div>
                // </Card>
                //     : ""
            }
            {typeCard && typeCard?.length ?
                <Form
                    layout="vertical"
                    form={form}
                    style={{ marginTop: 20 }}
                    onFinish={submit}
                >
                    <Form.Item
                        label="Amount"
                        rules={[{ required: true, message: 'Please input the amount!' }]}
                        name="amount"
                    >
                        <Input
                            value={amount || ""}
                            onChange={(e) => onChangeAmount(e.target.value)}
                            name="amount"
                            size="small"
                        />
                    </Form.Item>
                </Form>
                : ""}
        </Modal>
    )
}