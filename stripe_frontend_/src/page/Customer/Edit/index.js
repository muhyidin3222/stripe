import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Input, Button, Select, Avatar, Row, Table, Col, Collapse, Typography, Tag, Card } from 'antd';
import { PlusOutlined, InfoCircleOutlined, CloseCircleOutlined, DollarOutlined } from '@ant-design/icons'
import copyClipboard from 'copy-to-clipboard';

import ContainterInput from 'components/general/Input/ContainterInput'
import { useSelector, useDispatch } from 'react-redux'
import { customersGetIdDispatch, paymentMethodListDispatch, invoicesGetIdDispatch, paymentListDispatch, productsCreate, productsGetId, subscriptionsListDispatch, quoteGetIdDispatch, balanceRetrieveDispatch, invoiceItemListDispatch } from 'redux/actions'
import ArchLayout from 'components/layout/ArchLayout'

// import Upload from 'components/general/Upload';
// import AutoCompleteCustomer from 'components/general/Input/AutoCompleteCustomer'
import { tooltip } from 'components/general/Help'
import scss from 'assets/scss/customerEdit.module.scss'
import moment from 'moment';
import ModalMetadata from 'components/general/Modal/Metadata';
import { currencyFromat } from 'utils/format'
import scssCardholderDetail from 'assets/scss/general/cardholderDetail.module.scss'

const { Panel } = Collapse;
// const { TextArea } = Input;
const { Title } = Typography

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { params } = history
    const { id } = useParams()
    const { customers: { resCustomersGetId }, payment: { resPaymentList, resPaymentMethodList }, quote: { resQuoteList }, invoices: { resInvoicesList }, subscriptions: { resSubscriptionsList }, loading: { loadingGet }, balance: { balanceRetrieveData }, invoiceItem: { resInvoiceItemList } } = useSelector(state => state)
    const [showCustomer, setShowCustomer] = useState(false)
    const [showMetadata, setShowMetadata] = useState(false)
    const [dataCreate, setdataCreate] = useState({
        name: "",
        description: "",
        statement_descriptor: "",
        // unit_label: "",
        // metadata: "",
    })

    console.log(params, id)
    useEffect(() => {
        if (id) {
            dispatch(customersGetIdDispatch(id))
            dispatch(paymentListDispatch({ customer: id }))
            dispatch(paymentMethodListDispatch({ customer: id }))
            dispatch(invoicesGetIdDispatch({ customer: id }))
            dispatch(subscriptionsListDispatch({ customer: id }))
            dispatch(quoteGetIdDispatch({ customer: id }))
            dispatch(balanceRetrieveDispatch({ stripeAccount: id }))
            dispatch(invoiceItemListDispatch({ customer: id }))
        }
        return () => { }
    }, [id])

    const handleCreateProduct = () => {
        dispatch(productsCreate(dataCreate))
        history.push("/products")
    }

    const onChange = e => {
        // console.log(e.target.value)
        setdataCreate({
            ...dataCreate,
            [e.target.name]: e.target.value
        })
    }



    // const addMoreMetadata = () => {
    //     const objectval = {
    //         key: "",
    //         value: ""
    //     }
    //     setMetadata([...metadata, objectval])
    // }

    // const onChangMetadata = (e) => {
    //     setdataCreate({
    //         ...dataCreate,
    //         [e.target.name]: e.target.value
    //     })
    // }


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

    const addPrice = () => {

    }

    const columnsPayment = [
        {
            title: "ID",
            dataIndex: 'id',
        },
        {
            title: "Amount",
            dataIndex: 'id',
            render: (idAmount) => {
                const paymentList = resPaymentList?.data?.find(val => val.id === idAmount)
                const { amount, currency } = paymentList
                return paymentList && currency ? <div> {currencyFromat({ number: amount, currency })} {currency}</div> : ""
            }
        },
        {
            title: "Date",
            dataIndex: 'created',
            render: (created) => {
                return moment(created).format("MMM D YYYY")
            }
        },
    ]

    const columnsPaymentMethods = [
        {
            title: "ID",
            dataIndex: 'id',
        },
        {
            title: "Card",
            dataIndex: 'card',
            render: (card) => {
                return card?.brand
            }
        },
        {
            title: "Date",
            dataIndex: 'created',
            render: (created) => {
                return moment(created).format("MMM D YYYY")
            }
        },
    ]

    const columnsInvoice = [
        {
            title: "Amount",
            dataIndex: 'id',
            render: (idAmount) => {
                const invoicesList = resInvoicesList?.data?.find(val => val.id === idAmount)
                const { amount, currency, status } = invoicesList
                console.log(amount)
                return invoicesList && currency ? <div> {currencyFromat({ number: amount, currency })} {currency} <Tag>{status}</Tag> </div> : ""
                // return amount ? currencyFromat({ number: amount, currency })`  ${currency} ${<Tag>{status}</Tag>}` : ""
            }
        },
        {
            title: "INVOICE NUMBER",
            dataIndex: 'number',
        },

        {
            title: "DUE",
            dataIndex: 'due_date',
            render: (due_date) => {
                return moment(due_date).format("MMM D YYYY")
            }
        },
        {
            title: "Created",
            dataIndex: 'created',
            render: (created) => {
                return moment(created).format("MMM D YYYY")
            }
        },
    ]

    const columnsInvoiceItems = [
        {
            title: "Amount",
            dataIndex: 'id',
            render: (idAmount) => {
                const invoiceItemList = resInvoiceItemList?.data?.find(val => val.id == idAmount)
                const { amount, currency, status } = invoiceItemList
                console.log(status)
                return invoiceItemList && currency ? <div> {currencyFromat({ number: amount, currency })} {currency}</div> : ""
            }
        },
        {
            title: "id",
            dataIndex: 'id',
        },
        {
            title: "Created",
            dataIndex: 'created',
            render: (created) => {
                return moment(created).format("MMM D YYYY")
            }
        },
    ]

    const columnsSubscriptions = [
        {
            title: "id",
            dataIndex: 'id',
        },
        {
            title: "Status",
            dataIndex: 'status',
            render: (status) => {
                return <Tag>{status}</Tag>
            }
        },
        {
            title: "Created",
            dataIndex: 'created',
            render: (created) => {
                return moment(created).format("MMM D YYYY")
            }
        },
    ]

    const columnsQuote = [
        {
            title: "id",
            dataIndex: 'id',
        },
        {
            title: "Amount Total",
            dataIndex: 'amount_total'
        },
        {
            title: "Amount Subtotal",
            dataIndex: 'amount_subtotal'
        },
        {
            title: "Status",
            dataIndex: 'status',
            render: (status) => {
                return <Tag>{status}</Tag>
            }
        },
        {
            title: "Amount",
            dataIndex: 'id',
            render: (idAmount) => {
                const invoiceItemList = resInvoiceItemList?.data?.find(val => val.id == idAmount)
                const { amount, currency, status } = invoiceItemList
                console.log(status)
                return invoiceItemList && currency ? <div> {currencyFromat({ number: amount, currency })} {currency}</div> : ""
            }
        },
        {
            title: "Created",
            dataIndex: 'created',
            render: (created) => {
                return moment(created).format("MMM D YYYY")
            }
        },
    ]

    const { object, address, balance, created, currency, default_source, delinquent, description, discount, email, invoice_prefix, livemode, name, next_invoice_sequence, phone, preferred_locales, shipping, tax_exempt, tax, metadata
    } = resCustomersGetId
    // console.log(resCustomersGetId, resPaymentList, "resPaymentList", resSubscriptionsList, "resSubscriptionsList", resQuoteList, "resQuoteList", invoicesList, "invoicesList", resPaymentMethodList, "resPaymentMethodList", "loadingGet, loading")
    console.log(resPaymentMethodList, "balanceRetrieveData")
    return (
        <ArchLayout>
            <Card>
                <Row gutter={24}>
                    <Col span={6} className={scss.right}>
                        <Title level={2}>Payment information</Title>
                        <Title level={5} style={{ marginBottom: 12 }}>Payment details</Title>
                        <div className={scss.label}>{name || ""}</div>
                        <div className={scss.label}>{email || ""}</div>
                        <div>
                            <div>{ }</div>
                            <div>{moment(created).format("MMM D YYYY")}</div>
                            <div>{ }</div>
                        </div>

                        <Collapse
                            defaultActiveKey={['1']}
                            ghost
                            className="collapse-edit-customer"
                            style={{ marginTop: 16 }}
                            bordered={true}
                        >
                            <Panel
                                header={
                                    <div className={scss.headerEdit}>
                                        <div>Detail</div>
                                        <Button
                                            type="link"
                                            onClick={() => setShowCustomer(true)}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                }
                                key="1"
                                type="primary"
                            >
                                <div onClick={() => copyClipboard(id)} className="text-copy-to-clipboard">{id || "-"}</div>
                                <div className={scss.label}>Account details</div>
                                <div className={scss.valueText}>{name || "-"}</div>
                                <div className={scss.valueText}>{email || "-"}</div>
                                <div className={scss.valueText}>{description || "-"}</div>

                                <div className={scss.wpLabel}>
                                    <div className={scss.label}>Billing emails</div>
                                    <div className={scss.valueText}>{email || "-"}</div>
                                </div>
                                <div className={scss.wpLabel}>
                                    <div className={scss.label}>Billing details</div>
                                    <div className={scss.valueText}>{email || "-"}</div>
                                </div>
                                <div className={scss.wpLabel}>
                                    <div className={scss.label}>Language</div>
                                    <div className={scss.valueText}>{preferred_locales || "-"}</div>
                                </div>
                                <div className={scss.wpLabel}>
                                    <div className={scss.label}>Next invoice number</div>
                                    <div className={scss.valueText}>{next_invoice_sequence || "-"}</div>
                                </div>
                                <div className={scss.wpLabel}>
                                    <div className={scss.label}>Next invoice number</div>
                                    <div className={scss.valueText}>{tax || "Unrecognized location"}</div>
                                </div>
                            </Panel>
                        </Collapse>

                        <Collapse
                            defaultActiveKey={['2']}
                            ghost
                            className="collapse-edit-customer"
                            style={{ marginTop: 16 }}
                            bordered={true}
                            onClick={() => setShowMetadata(true)}
                        >
                            <Panel
                                header={
                                    <div className={scss.headerEdit}>
                                        <div>Metadata</div>
                                        <Button
                                            type="link"
                                            onClick={() => setShowMetadata(true)}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                }
                                key="1"
                                type="primary"
                            >
                                <div>
                                    <div>Metadata</div>
                                    {
                                        metadata ? Object.entries(metadata).map((value, index) => (
                                            <div key={index} className={scss.metadataList}>
                                                <div>{value[0] || ""}</div>
                                                <div>{value[1] || ""}</div>
                                            </div>
                                        ))
                                            : ""
                                    }
                                </div>
                            </Panel>
                        </Collapse>
                    </Col>

                    <Col span={18}>

                        <div className={scssCardholderDetail.line4}>
                            <div className={`${scssCardholderDetail.wpContent}  ${scssCardholderDetail.header}`}>
                                <div className={scssCardholderDetail.title}>Payment</div>
                                {/* <Button
                        size="small"
                        icon={<EditOutlined />}
                    >Edit</Button> */}
                            </div>
                            <Table
                                columns={columnsPayment}
                                style={{ width: "100%" }}
                                // footer={() => `${resPaymentList?.data?.length || 0} results`}
                                dataSource={resPaymentList?.data}
                                size="small"
                                pagination={{ position: ["none", "none"] }}
                                loading={loadingGet}
                            />
                        </div>

                        <div className={scssCardholderDetail.line4}>
                            <div className={`${scssCardholderDetail.wpContent}  ${scssCardholderDetail.header}`}>
                                <div className={scssCardholderDetail.title}>Payment Methods</div>
                                {/* <Button
                        size="small"
                        icon={<EditOutlined />}
                    >Edit</Button> */}
                            </div>
                            <Table
                                columns={columnsPaymentMethods}
                                style={{ width: "100%" }}
                                // footer={() => `${resPaymentMethodList?.data?.length || 0} results`}
                                dataSource={resPaymentMethodList?.data}
                                size="small"
                                pagination={{ position: ["none", "none"] }}
                                loading={loadingGet}
                            />
                        </div>

                        <div className={scssCardholderDetail.line4}>
                            <div className={`${scssCardholderDetail.wpContent}  ${scssCardholderDetail.header}`}>
                                <div className={scssCardholderDetail.title}>Credit Balance</div>
                                {/* <Button
                        size="small"
                        icon={<EditOutlined />}
                    >Edit</Button> */}
                            </div>
                            <div className={scss.listBalance}>
                                <div className={scss.textList}>
                                    {balanceRetrieveData?.available && balanceRetrieveData?.available[0]?.currency ? <div>{currencyFromat({ amount: balanceRetrieveData?.available[0]?.amount || 0, currency: balanceRetrieveData?.available[0]?.currency })} {balanceRetrieveData?.available[0]?.currency}</div> : ""}
                                </div>
                            </div>
                        </div>

                        {/* <div className={scssCardholderDetail.line4}>
                        <div className={`${scssCardholderDetail.wpContent}  ${scssCardholderDetail.header}`}>
                            <div className={scssCardholderDetail.title}>Payment Methods</div>
                        </div>
                        <Table
                            columns={columnsPaymentMethods}
                            style={{ width: "100%" }}
                        // footer={() => `${resTransfersList?.data.length ||0} results`}
                            dataSource={resPaymentList?.data}
                            size="small"
                            pagination={{ position: ["none", "none"] }}
                            loading={loadingGet}
                        />
                    </div> */}

                        <div className={scssCardholderDetail.line4}>
                            <div className={`${scssCardholderDetail.wpContent}  ${scssCardholderDetail.header}`}>
                                <div className={scssCardholderDetail.title}>Invoices</div>
                                {/* <Button
                        size="small"
                        icon={<EditOutlined />}
                    >Edit</Button> */}
                            </div>
                            <Table
                                columns={columnsInvoice}
                                style={{ width: "100%" }}
                                // footer={() => `${resInvoicesList?.data?.length || 0} results`}
                                dataSource={resInvoicesList?.data}
                                size="small"
                                pagination={{ position: ["none", "none"] }}
                                loading={loadingGet}
                            />
                        </div>


                        {/* <div className={scssCardholderDetail.line4}>
                            <div className={`${scssCardholderDetail.wpContent}  ${scssCardholderDetail.header}`}>
                                <div className={scssCardholderDetail.title}>Pending Invoices Item</div>
                            </div>
                            <Table
                                columns={columnsInvoiceItems}
                                style={{ width: "100%" }}
                                // footer={() => `${resInvoiceItemList?.data?.length || 0} results`}
                                dataSource={resInvoiceItemList?.data}
                                size="small"
                                pagination={{ position: ["none", "none"] }}
                                loading={loadingGet}
                            />
                        </div> */}


                    </Col>

                </Row>
            </Card>

            <ModalMetadata
                showModal={showMetadata}
                setShowModal={setShowMetadata}
                metadataUser={metadata}
                id={id}
            />
        </ArchLayout>
    )
}