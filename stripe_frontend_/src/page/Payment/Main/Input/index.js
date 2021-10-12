import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Card, Button, Select, Typography, Tabs, Radio, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { paymentCreateDispatch, productsCreate, productsGetId } from 'redux/actions'
import DeleteIcon from '@material-ui/icons/Delete';
import AutoCompleteCustomer from 'components/general/Input/AutoCompleteCustomer'
import { tooltip } from 'components/general/Help'
import ArchLayout from 'components/layout/ArchLayout'
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./styles.css";
import { getCookie } from 'utils/cookies';

const ELEMENTS_OPTIONS = {
    fonts: [
        {
            cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
        }
    ]
};

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            // iconColor: "#c4f0ff",
            color: "#000000",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                color: "#00000"
            },
            "::placeholder": {
                color: "#00000"
            }
        },
        invalid: {
            iconColor: "red",
            color: "red"
        }
    }
};


const { Title } = Typography
const { TabPane } = Tabs;

const InputPayment = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const stripe = useStripe();
    const elements = useElements();
    const id = history.location.id
    const { payment: { balanceRetrieveData }, customers: { resCustomersList }, products: { resProductsGetId }, loading: { loadingCreate }, loading } = useSelector(state => state)
    const [selectCustomer, setSelectCustomer] = useState({})
    const [cardToCustomer, setCardToCustomer] = useState(false)
    const [activatedTabs, setActivatedTabs] = useState("1")
    const [dataCreate, setdataCreate] = useState({
        name: "",
        description: "",
        statement_descriptor: "",
        // unit_label: "",
        // metadata: "",
    })
    const [manualCard, onClickManual] = useState(true)
    const onChange = e => {
        setdataCreate({
            ...dataCreate,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const apiBalance = async () => {
            if (id)
                await dispatch(productsGetId(id))
            setdataCreate(resProductsGetId)
        }
        apiBalance()

        return () => {
        }
    }, [])

    // const addMoreMetadata = () => {
    //     const objectval = {
    //         key: "",
    //         value: ""
    //     }
    //     setMetadata([...metadata, objectval])
    // }

    const onChangeTabsClick = (param) => {
        if (activatedTabs === "1")
            setActivatedTabs(param)
        if (activatedTabs === "1")
            history.push("/payment/subscriptions/input")
    }

    const onSelectCustomer = (email) => {
        setSelectCustomer(resCustomersList?.data?.find(val => val.email === email))
    }

    const onSave = async () => {
        const { amount, statement_descriptor, description } = dataCreate
        try {
            let dataCreatePaymentMethod = {
                type: "card",
                card: elements.getElement(CardElement)
            }
            let payload = {
            }
            let paramPaymentCreate = {
                amount: amount,
                currency: "usd",
                customer: selectCustomer?.id,
                statement_descriptor,
                description
            }
            if (cardToCustomer)
                dataCreatePaymentMethod.billing_details = {
                    email: selectCustomer?.email,
                    phone: selectCustomer?.phone,
                    name: selectCustomer?.name
                }
            if (manualCard) {
                payload = await stripe.createPaymentMethod(dataCreatePaymentMethod);
                paramPaymentCreate.payment_method = payload?.id
                paramPaymentCreate.payment_method_types = payload?.card
            }
            const resCreat = await dispatch(paymentCreateDispatch(paramPaymentCreate))
            if (resCreat)
                history.goBack()
        } catch (error) {
            message.error(error.message)
            console.log(error)
        }
    }

    console.log(dataCreate)

    return (
        <ArchLayout>
            <Form
                layout="vertical"
                onFinish={onSave}
                size="middle"
            >
                <Card
                    title={<Title level={3}>Create a card</Title>}
                    style={{ width: "80%" }}
                    loading={loadingCreate}
                    actions={[
                        <div style={{ justifyContent: "flex-end", display: "flex", paddingRight: 30 }}>
                            <Button size="small" style={{ justifyContent: "flex-end", display: "flex", marginRight: 15 }}>Cancel</Button>
                            <Button size="small" type="primary" htmlType="submit">Save</Button>
                        </div>
                    ]}
                >
                    <div style={{ width: "80%", display: "flex", justifyContent: 'center' }}>
                        <div style={{ width: "80%" }}>
                            <Title level={2}>Payment information</Title>
                            <Title level={5} style={{ marginBottom: 12 }}>Payment details</Title>

                            <Tabs
                                type="card"
                                defaultActiveKey={activatedTabs}
                                activeKey={activatedTabs}
                                centered
                                onChange={onChangeTabsClick}
                            >
                                <TabPane tab="One-time" key="1">
                                    <Form.Item label="Amount" required name="amount" style={{ marginTop: 40 }}>
                                        <Input.Group style={{ display: 'flex' }}>
                                            <Input
                                                // size="small"
                                                prefix={"$"}
                                                required
                                                defaultValue={dataCreate.amount}
                                                onChange={onChange}
                                                name="amount"
                                                style={{ width: '90%' }}
                                            />
                                            <Select
                                                defaultValue={"US"}
                                                // size="small"
                                                name="currency"
                                                style={{ width: '10%' }}
                                            // filterOption={(input, option) =>
                                            //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            // }
                                            // showSearch
                                            >
                                                {/* {
                                                                countries.map((value, index) => (
                                                                    <Option value={value.currency} key={index} >{value.name}</Option>
                                                                ))
                                                            } */}
                                            </Select>
                                        </Input.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="Customer"
                                        name="customer"
                                        tooltip={tooltip}
                                    // size="small"
                                    >
                                        {
                                            !selectCustomer?.email ?
                                                <AutoCompleteCustomer
                                                    onSelect={onSelectCustomer}
                                                />
                                                :
                                                <Card
                                                    style={{ maxWidth: "70%" }}
                                                    size="small"
                                                >
                                                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                                        <div>
                                                            <div style={{ fontSize: "bold" }}>{selectCustomer?.email || ""}</div>
                                                            <div>{selectCustomer?.name || ""}</div>
                                                        </div>
                                                        <Button
                                                            type="link"
                                                            size="small"
                                                            onClick={() => setSelectCustomer({})}
                                                        >
                                                            <DeleteIcon />
                                                        </Button>
                                                    </div>
                                                </Card>
                                        }
                                    </Form.Item>
                                    <Form.Item
                                        label="Description"
                                        name="description"
                                        tooltip={tooltip}
                                    >
                                        <Input
                                            // size="small"
                                            defaultValue={dataCreate?.description || ""}
                                            onChange={onChange}
                                            name="description"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Statement descriptor"
                                        name="statement_descriptor"
                                        required
                                        tooltip={tooltip}
                                    >
                                        <Input
                                            // size="small"
                                            defaultValue={dataCreate?.statement_descriptor || ""}
                                            onChange={onChange}
                                            name="statement_descriptor"
                                        />
                                    </Form.Item>

                                    <Title level={5}>Payment method</Title>

                                    <div style={{ margin: "30px 0px 0px 0px" }}>
                                        <Radio
                                            checked={manualCard}
                                            onClick={() => onClickManual(true)}
                                        >
                                            <div>Manually enter card information </div>
                                        </Radio>
                                        {manualCard ? <div style={{ margin: "20px 0px 20px 20px" }}>
                                            <form className="Form">
                                                <div className="FormRow">
                                                    <CardElement
                                                        options={CARD_OPTIONS}
                                                        onChange={onChange}
                                                        placeholder="Number Card"
                                                    />
                                                </div>
                                            </form>

                                            <Radio
                                                checked={cardToCustomer}
                                                onClick={() => setCardToCustomer(!cardToCustomer)}
                                            >
                                                <div>Save card to customer</div>
                                            </Radio>

                                            {/* <Collapse defaultActiveKey={['1']} ghost>
                                                        <Panel header="More Informations" key="1" type="primary" style={{ padding: 0 }}>
                                                            <Radio>
                                                                <div>Capture funds later</div>
                                                                <div>Reserve funds now. You must capture the funds within 7 days.</div>
                                                            </Radio>
                                                            <Radio>
                                                                <div>Add billing address</div>
                                                                <div>Card billing details may help improve authorization rates.</div>
                                                            </Radio>
                                                            <Radio>
                                                                <div>Send receipt</div>
                                                                <div>Send a branded receipt to your customer for their records.</div>
                                                            </Radio>
                                                        </Panel>
                                                    </Collapse> */}
                                        </div>
                                            : ""
                                        }
                                    </div>
                                    <div style={{ margin: "30px 0px 0px 0px" }}>
                                        <Radio
                                            checked={!manualCard}
                                            onClick={() => onClickManual(false)}
                                        >
                                            <div>Eamil your customer a hosted invoice with Strip Billing</div>
                                            {
                                                !manualCard ?
                                                    <Fragment>
                                                        <div>Invoice due in</div>
                                                        <Input
                                                            // size="small"
                                                            defaultValue={dataCreate?.invoice || ""}
                                                            onChange={onChange}
                                                            placeholder="0"
                                                            name="invoice"
                                                            suffix="day"
                                                        />
                                                    </Fragment>
                                                    : ""
                                            }
                                        </Radio>
                                    </div>
                                </TabPane>
                                <TabPane tab="Recurring" key="2">
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </Card>
            </Form>
        </ArchLayout>
    )
}

export default props => {
    const public_key = getCookie("public_key")
    const stripePromise = loadStripe(public_key);

    return (
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
            <InputPayment  {...props} />
        </Elements>
    );
};