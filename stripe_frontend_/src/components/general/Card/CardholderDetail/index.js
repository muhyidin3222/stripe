import React, { useEffect, useState } from 'react'
import { cardGetAllDispatch, authorizationsGetAllDispatch, transactionGetAllDispatch, eventsListDispatch } from 'redux/actions'
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
                        type: "issuing_card.created"
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

    const columnsEvent = [
        {
            title: "DESCRIPTION",
            dataIndex: 'description',
            render: (created) => "new Event"
        },
        {
            title: "CREATED",
            dataIndex: 'created',
            render: (created) => moment(created).format("MMM D")
        },
    ]
    // const columnsSpendingLimit = columns({ onClick: () => setShowModal(true), title: "SPENDING LIMITS", onDelete: () => { } })
    const columnsCard = [
        {
            title: "CARD NUMBER",
            dataIndex: 'last4',
            render: (last4) => "*** " + last4
        },
        {
            title: "STATUS",
            dataIndex: 'status',
            render: (status) => <Tag color="green">{status}</Tag>
        },
        {
            title: "EXPIRATION",
            dataIndex: 'id',
            render: (id) => {
                const dataCard = resCardGetAll?.data?.find(val => val.id === id) || {}
                const { exp_month, exp_year } = dataCard
                return `${exp_month || ""}/${moment(exp_year).format("YY") || ""}`
            }
        },
        {
            title: "TYPE",
            dataIndex: 'type'
        },
        {
            title: "SHIPPING STATUS",
            dataIndex: 'id',
            render: (id) => {
                const { amount, currency } = resCardGetAll?.data?.find(val => val.id === id)
                return amount ? currencyFromat({ number: amount, currency }) : ""
            }
        },
        {
            title: "CREATED",
            dataIndex: 'created',
            render: (created) => moment(created).format("MMM D")
        },
    ]

    const addressCard = resCardGetAll?.data?.length ? resCardGetAll?.data[0]?.cardholder?.billing?.address : {}
    const cardGetAll = resCardGetAll?.data?.length ? resCardGetAll?.data[0] : {}
    const spendingControl = cardGetAll?.spending_controls || {}
    const blocked_categories = spendingControl?.blocked_categories?.map((value, index) => ({ id: index, name: value }))
    const allowed_categories = spendingControl?.allowed_categories?.map((value, index) => ({ id: index, name: value }))
    const spending_limits = spendingControl?.spending_limits?.map((value, index) => ({ id: index, name: `${value.amount} per ${value.interval} ${value.categories.length ? value.categories[0] : "All categories"}`, ...value }))
    const dataCategories = spendingCt === 1 ? allowed_categories : blocked_categories
    const metadataData = cardholderData && cardholderData?.metadata ? Object.keys(cardholderData?.metadata).map((key) => ({ key, value: cardholderData.metadata[key] })) : []
    console.log(resEventList?.data, "resCardGetAll")
    // console.log(resCardGetAll?.data, "resCardGetAll")

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
                    <div className={scss.title}>Spending limits</div>
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                    >Edit</Button>
                </div>
                <Table
                    // columns={columnsSpendingLimit}
                    style={{ width: "100%" }}
                    footer={() => `${spending_limits?.length || 0} results`}
                    dataSource={spending_limits}
                    className={scss.tabelStyle}
                    size="small"
                    pagination={{ position: ["none", "none"] }}
                />
            </div>

            <div className={scss.line4}>
                <div className={`${scss.wpContent}  ${scss.header}`}>
                    <div className={scss.title}>Card</div>
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                    >Edit</Button>
                </div>
                <Table
                    className={scss.tabelStyle}
                    columns={columnsCard}
                    style={{ width: "100%" }}
                    footer={() => `${resCardGetAll?.data?.length || 0} results`}
                    dataSource={resCardGetAll?.data}
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
                    columns={columnsMetadata}
                    style={{ width: "100%" }}
                    footer={() => `${metadataData.length || 0} results`}
                    dataSource={metadataData}
                    size="small"
                    pagination={{ position: ["none", "none"] }}
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
                    className={scss.tabelStyle}
                    columns={columnsEvent}
                    style={{ width: "100%" }}
                    footer={() => `${resEventList?.data?.length || 0} results`}
                    dataSource={resEventList?.data}
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