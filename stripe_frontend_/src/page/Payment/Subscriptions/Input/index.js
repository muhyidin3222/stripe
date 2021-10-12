import React, { useState, useEffect, Fragment, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Card, Button, Typography, Table, Radio, message, InputNumber } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { paymentCreateDispatch, productsCreate, productsGetId, subscriptionsCreateDispatch } from 'redux/actions'
import DeleteIcon from '@material-ui/icons/Delete';
import AutoCompleteCustomer from 'components/general/Input/AutoCompleteCustomer'
import AutoCompleteProductName from 'components/general/Input/ProductName'
import { tooltip } from 'components/general/Help'
import ArchLayout from 'components/layout/ArchLayout'
import { FormInstance } from 'antd/lib/form';
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { getCookie } from 'utils/cookies';
import { loadStripe } from "@stripe/stripe-js";

const EditableContext = React.createContext(null);


const { Title } = Typography


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

const InputPayment = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const stripe = useStripe();
    const elements = useElements();
    const id = history.location.id
    const { products: { resProductsGetAll, resPricesGetAll }, customers: { resCustomersList }, loading: { loadingCreate }, loading } = useSelector(state => state)
    const [selectCustomer, setSelectCustomer] = useState({})
    const [selectPrice, setSelectPrice] = useState([])
    const [manualCard, onClickManual] = useState(false)
    const [cardToCustomer, setCardToCustomer] = useState(false)
    const [dataCreate, setdataCreate] = useState({
        name: "",
        description: "",
        statement_descriptor: "",
        // unit_label: "",
        // metadata: "",
    })
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
        }
        apiBalance()
        return () => { }
    }, [])

    const onSelectCustomer = (email) => {
        setSelectCustomer(resCustomersList?.data?.find(val => val.email === email))
    }

    const onSelectPrice = (resPriceParam) => {
        resPriceParam.total = resPriceParam.unit_amount
        resPriceParam.qty = 1
        if (resPriceParam?.id)
            setSelectPrice([...selectPrice, resPriceParam])
    }


    const columns = [
        {
            title: 'PRODUCT',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                const valuePrice = selectPrice.find(val => val.id == id)
                return <div> {valuePrice?.unit_amount || ""} {valuePrice?.currency} {valuePrice?.recurring?.interval ? "/" + valuePrice?.recurring?.interval : ""}</div>
            }
        },
        {
            title: 'QTY',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                let valuePrice = selectPrice.find(val => val.id === id)
                const onChangeQty = value => {
                    if (value > 0 || value > "0") {
                        const filterSelectPrice = selectPrice.map(val => {
                            return ({
                                ...val,
                                qty: val.id === id ? value : val.qty
                            })
                        })
                        setSelectPrice(filterSelectPrice)
                    }
                }
                return <InputNumber defaultValue={valuePrice.qty} value={valuePrice.qty} onChange={onChangeQty} />
            }
        },
        {
            title: 'TOTAL',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                const valuePrice = selectPrice.find(val => val.id === id)
                return valuePrice.total * valuePrice.qty
            }
        },
        {
            title: 'ACTION',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                const valuePrice = selectPrice.filter(val => val.id !== id)
                const deletePrice = () => setSelectPrice(valuePrice)
                return <Button onClick={deletePrice} danger size="small">Delete</Button>
            }
        }
    ]

    const onSave = async () => {
        console.log(selectPrice?.length && selectCustomer?.id)
        const { amount, statement_descriptor, description } = dataCreate


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


        if (selectPrice?.length && selectCustomer?.id) {
            const mapingPrice = selectPrice.map(val => ({
                price: val.id,
                quantity: val.qty,
            }))
            let paramPaymentCreate = {
                customer: selectCustomer?.id,
                items: mapingPrice
            }
            const resCreat = await dispatch(subscriptionsCreateDispatch(paramPaymentCreate))
            if (resCreat)
                history.goBack()
        }
    }

    console.log(selectPrice)
    return (
        <ArchLayout>
            <Form
                layout="vertical"
                size="middle"
            >
                <Card
                    title={<Title level={3}>Create a subscription</Title>}
                    style={{ width: "80%" }}
                    loading={loadingCreate}
                    actions={[
                        <div style={{ justifyContent: "flex-end", display: "flex", paddingRight: 30 }}>
                            <Button size="small" style={{ justifyContent: "flex-end", display: "flex", marginRight: 15 }}>Cancel</Button>
                            <Button size="small" type="primary" onClick={onSave}>Save</Button>
                        </div>
                    ]}
                >
                    <div style={{ width: "80%", display: "flex", justifyContent: 'center' }}>
                        <div style={{ width: "80%" }}>
                            <Title level={5} style={{ marginBottom: 12 }}>Customer</Title>
                            <Form.Item
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
                                name="customer"
                                tooltip={tooltip}
                            // size="small"
                            >
                                <AutoCompleteProductName
                                    onSelect={onSelectPrice}
                                />
                            </Form.Item>

                            <Table
                                dataSource={selectPrice}
                                columns={columns}
                                pagination={false}
                                size="small"
                            />

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
                                // onClick={() => onClickManual(false)}
                                >
                                    <div>Eamil your customer a hosted invoice with Strip Billing</div>
                                    {
                                        !manualCard ?
                                            <Fragment>
                                                <div>Invoice due in</div>
                                                <Input
                                                    // size="small"
                                                    // defaultValue={dataCreate?.invoice || ""}
                                                    // onChange={onChange}
                                                    placeholder="0"
                                                    name="invoice"
                                                    suffix="day"
                                                />
                                            </Fragment>
                                            : ""
                                    }
                                </Radio>
                            </div>

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