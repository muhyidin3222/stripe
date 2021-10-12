import React, { useEffect, useState } from 'react'
import { customersListDispatch, cardGetAllDispatch, authorizationsGetAllDispatch, transactionGetAllDispatch, eventsListDispatch } from 'redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { Button, Tag, Table, Tabs, List, Skeleton } from 'antd'
import { MoreOutlined, EyeOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { currencyFromat } from 'utils/format'
import Categories from 'components/general/Modal/Categories'
import scss from 'assets/scss/general/cardholderDetail.module.scss'

const { TabPane } = Tabs;

export default function Index (props) {
    const { cardholderData } = props
    const { email, name, id } = cardholderData
    const dispatch = useDispatch()
    const [spendingCt, setSpendingCt] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const { issuing: { resCardGetAll, resAuthorizationsGetAll, resTransactionsGetAll, }, customers: { resCustomersList }, event: { resEventList }, loading: { loadingGet } } = useSelector(state => state)

    useEffect(() => {

        const getApi = () => {
            if (name)
                // dispatch(customersListDispatch({
                //     name
                // }))
                if (id) {
                    dispatch(transactionGetAllDispatch({
                        cardholder: id
                    }))
                    console.log(id)
                    dispatch(cardGetAllDispatch({
                        cardholder: id
                    }))
                    dispatch(authorizationsGetAllDispatch({
                        cardholder: id
                    }))
                    dispatch(eventsListDispatch({
                        cardholder: id
                    }))
                }
        }

        getApi()

        return () => { }
    }, [cardholderData])

    // useEffect(() => {

    //     const getApi = () => {
    //         if (resCardGetAll?.data?.length && resCardGetAll?.data[0]?.id) {
    //             dispatch(authorizationsGetAllDispatch({
    //                 cardholder: resCardGetAll?.data[0]?.id
    //             }))
    //         }
    //     }
    //     getApi()

    //     return () => { }
    // }, [resCardGetAll?.data?.length])

    const columns = ({ onClick, title, onDelete }) => {
        return [
            {
                title: <div>{title}  <InfoCircleOutlined /></div>,
                dataIndex: 'name',
            },
            {
                title: <Button
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={onClick}
                >Add</Button>,
                align: "right",
                dataIndex: 'name',
                render: () => (
                    <Button
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={onDelete}
                    />
                )
            }
        ]
    }


    const columnsCategori = columns({ onClick: () => setShowModal(true), title: "CATEGORIES", onDelete: () => { } })
    const columnsMetadata = [
        {
            title: "Key",
            dataIndex: 'key'
        },
        {
            title: "Value",
            dataIndex: 'value'
        }
    ]
    const columnsSpendingLimit = columns({ onClick: () => setShowModal(true), title: "SPENDING LIMITS", onDelete: () => { } })
    const columnsAuthorizations = [
        {
            title: "DATE",
            dataIndex: 'created',
            render: (created) => moment(created).format("MMM D")
        },
        {
            title: "DESCRIPTION",
            dataIndex: 'merchant_data',
            render: (merchant_data) => merchant_data?.name
        },
        {
            title: "CATEGORY",
            dataIndex: 'merchant_data',
            render: (merchant_data) => merchant_data?.category
        },
        {
            title: "STATUS",
            dataIndex: 'approved',
            render: (approved) => approved ? <Tag color="green">Approved</Tag> : <Tag color="red">Not Approved</Tag>
        },
        {
            title: "AMOUNT",
            dataIndex: 'id',
            render: (id) => {
                const { amount, currency } = resAuthorizationsGetAll?.data?.find(val => val.id === id)
                return amount ? currencyFromat({ number: amount, currency }) : ""
            }
        },

    ]

    const onChangeSpendingCt = () => {

    }

    const addressCard = resCardGetAll?.data?.length ? resCardGetAll?.data[0]?.cardholder?.billing?.address : {}
    const cardGetAll = resCardGetAll?.data?.length ? resCardGetAll?.data[0] : {}
    const spendingControl = cardGetAll?.spending_controls || {}
    const blocked_categories = spendingControl?.blocked_categories?.map((value, index) => ({ id: index, name: value }))
    const allowed_categories = spendingControl?.allowed_categories?.map((value, index) => ({ id: index, name: value }))
    const spending_limits = spendingControl?.spending_limits?.map((value, index) => ({ id: index, name: `${value.amount} per ${value.interval} ${value.categories.length ? value.categories[0] : "All categories"}`, ...value }))
    const dataCategories = spendingCt === 1 ? allowed_categories : blocked_categories
    const metadataData = cardholderData && cardholderData?.metadata ? Object.keys(cardholderData?.metadata).map((key) => ({ key, value: cardholderData.metadata[key] })) : []
    console.log(resTransactionsGetAll, resEventList, "resCardGetAll")
    // console.log(resAuthorizationsGetAll?.data, "resCardGetAll")

    return (
        <div className={scss.container}>
            <div className={scss.line1}>
                <div className={scss.left}>
                    <div>***{cardGetAll?.last4}</div>
                    <Tag
                        size="small"
                        className={scss.tag1}
                        color={cardholderData?.status === "active" ? "green" : "red"}
                    >{cardholderData?.status}</Tag>
                </div>
                <div>
                    <Button
                        size="small"
                        className={scss.buttonRight1}
                    >Deactivate card</Button>
                    <Button
                        size="small"
                        className={scss.buttonRight2}
                        icon={<MoreOutlined />}
                    />
                </div>
            </div>
            <div className={scss.line2}>
                <div className={scss.content}>
                    <div>Card number</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={scss.dotCard}></div>
                        <div className={scss.dotCard}></div>
                        <div className={scss.dotCard}></div>
                        <div>{cardGetAll?.last4}</div>
                    </div>
                </div>
                <div className={scss.content}>
                    <div>Expiration</div>
                    <div>{cardGetAll?.exp_month}/{cardGetAll?.exp_year}</div>
                </div>
                <div className={scss.content}>
                    <div>CVV</div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 3 }}>
                        <div className={scss.dotCard}></div>
                    </div>
                </div>
                <div className={scss.content}>
                    <Button
                        size="small"
                        icon={<EyeOutlined />}
                    />
                </div>
            </div>

            <div className={scss.line3}>
                <div className={scss.title}>Card Detail</div>
                <div className={scss.wpContent}>
                    <div className={scss.left}>
                        <div className={scss.content}>
                            <div className={scss.textDivLeft}>ID</div>
                            <div className={scss.textDivRight}>{cardGetAll.id || ""}</div>
                        </div>
                        <div className={scss.content}>
                            <div className={scss.textDivLeft}>Card type</div>
                            <div className={scss.textDivRight}>{cardGetAll.brand || ""}</div>
                        </div>
                        <div className={scss.content}>
                            <div className={scss.textDivLeft}>Card currency</div>
                            <div className={scss.textDivRight}>{cardGetAll.currency}</div>
                        </div>
                    </div>
                    <div className={scss.right}>
                        <div className={scss.content}>
                            <div className={scss.textDivLeft}>Cardholder</div>
                            <div className={scss.textDivRight}>{name}</div>
                        </div>
                        <div className={scss.content}>
                            <div className={scss.textDivLeft}>Created</div>
                            <div className={scss.textDivRight}>{cardGetAll.created && moment(cardGetAll.created).format("MMM D, H:MM")}</div>
                        </div>
                        <div className={scss.content}>
                            <div className={scss.textDivLeft}>Address</div>
                            <div className={scss.textDivRight}>{addressCard?.line1} {addressCard?.city}, {addressCard?.state} {addressCard?.postal_code} {addressCard?.country}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={scss.line4}>
                <div className={`${scss.wpContent}  ${scss.header}`}>
                    <div className={scss.title}>Spending controls</div>
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                    >Edit</Button>
                </div>
                <Tabs defaultActiveKey={spendingCt} size="small" onChange={val => setSpendingCt(val)}>
                    <TabPane tab="Allow the following categories" key={1} size="small" >
                        <Table
                            footer={() => `${allowed_categories?.length || 0} results`}
                            // columns={columnsCategori}
                            style={{ width: "100%" }}
                            size="small"
                            dataSource={allowed_categories}
                            pagination={{ position: ["none", "none"] }}
                        />
                    </TabPane>
                    <TabPane tab="Block the following categories" key={2} size="small" >
                        <Table
                            footer={() => `${blocked_categories?.length || 0} results`}
                            // columns={columnsCategori}
                            style={{ width: "100%" }}
                            size="small"
                            dataSource={blocked_categories}
                            pagination={{ position: ["none", "none"] }}
                        />
                    </TabPane>
                </Tabs>

                <div className={`${scss.wpContent}  ${scss.header}`}>
                    <div className={scss.title}>Spending limits</div>
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                    >Edit</Button>
                </div>
                <Table
                    footer={() => `${spending_limits?.length || 0} results`}
                    // columns={columnsSpendingLimit}
                    style={{ width: "100%" }}
                    dataSource={spending_limits}
                    className={scss.tabelStyle}
                    size="small"
                    pagination={{ position: ["none", "none"] }}
                />
            </div>

            <div className={scss.line4}>
                <div className={`${scss.wpContent}  ${scss.header}`}>
                    <div className={scss.title}>Metadata</div>
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                    >Edit</Button>
                </div>
                <Table
                    footer={() => `${metadataData?.length || 0} results`}
                    columns={columnsMetadata}
                    style={{ width: "100%" }}
                    dataSource={metadataData}
                    size="small"
                    pagination={{ position: ["none", "none"] }}
                />
            </div>

            <div className={scss.line4}>
                <div className={`${scss.wpContent}  ${scss.header}`}>
                    <div className={scss.title}>Authorizations</div>
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                    >Edit</Button>
                </div>
                <Table
                    footer={() => `${resAuthorizationsGetAll?.data?.length || 0} results`}
                    className={scss.tabelStyle}
                    columns={columnsAuthorizations}
                    style={{ width: "100%" }}
                    dataSource={resAuthorizationsGetAll?.data}
                    size="small"
                    pagination={{ position: ["none", "none"] }}
                />
            </div>

            <div className={scss.line4}>
                <div className={`${scss.wpContent}  ${scss.header}`}>
                    <div className={scss.title}>Transactions</div>
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                    >Edit</Button>
                </div>

                <List
                    className={scss.contentMiddle}
                    itemLayout="horizontal"
                    loadMore={true}
                    dataSource={[]}
                    size="small"
                    renderItem={item => (
                        <List.Item className={`${scss.listItem}`}>
                            <Skeleton title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    title={
                                        <div onClick={() => { }}>
                                            <div>
                                                {item.name}
                                            </div>
                                            <div>
                                                {item.created}
                                            </div>
                                        </div>
                                    }
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>

            <div className={scss.line4}>
                <div className={`${scss.wpContent}  ${scss.header}`}>
                    <div className={scss.title}>Event</div>
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                    >Edit</Button>
                </div>
                <Table
                    footer={() => `${[]?.length || 0} results`}
                    className={scss.tabelStyle}
                    columns={columnsMetadata}
                    style={{ width: "100%" }}
                    dataSource={[]}
                    size="small"
                    pagination={{ position: ["none", "none"] }}
                />
            </div>

            <Categories
                showModal={showModal}
                setShowModal={setShowModal}
            />

        </div >
    )
}





// "id":"ic_1JVEquCnDW8DvEOuA3ENtwrR",
// "object":"issuing.card",
// "brand":"Visa",
// "cancellation_reason":null,
// "cardholder":{
//    "id":"ich_1JVEqlCnDW8DvEOuVaWs30nT",
//    "object":"issuing.cardholder",
//    "billing":{
//       "address":{
//          "city":"Murfreesboro",
//          "country":"US",
//          "line1":"1303 Hodge Dr",
//          "line2":null,
//          "postal_code":"37130",
//          "state":"TN"
//       }
//    },
//    "company":null,
//    "created":1630585019,
//    "email":null,
//    "individual":{
//       "dob":null,
//       "first_name":"Bernadette",
//       "last_name":"Chester",
//       "verification":{
//          "document":{
//             "back":null,
//             "front":null
//          }
//       }
//    },
//    "livemode":true,
//    "metadata":{

//    },
//    "name":"Bernadette Chester",
//    "phone_number":null,
//    "requirements":{
//       "disabled_reason":null,
//       "past_due":[

//       ]
//    },
//    "spending_controls":{
//       "allowed_categories":[

//       ],
//       "blocked_categories":[

//       ],
//       "spending_limits":[

//       ],
//       "spending_limits_currency":null
//    },
//    "status":"active",
//    "type":"individual"
// },
// "created":1630585028,
// "currency":"usd",
// "exp_month":8,
// "exp_year":2024,
// "last4":"5991",
// "livemode":true,
// "metadata":{

// },
// "replaced_by":null,
// "replacement_for":null,
// "replacement_reason":null,
// "shipping":null,
// "spending_controls":{
//    "allowed_categories":null,
//    "blocked_categories":null,
//    "spending_limits":[
//       {
//          "amount":50000,
//          "categories":[

//          ],
//          "interval":"daily"
//       }
//    ],
//    "spending_limits_currency":"usd"
// },
// "status":"active",
// "type":"virtual"
// }