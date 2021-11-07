import React, { useState, useEffect, Fragment } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { authorizationsGetAllDispatch, eventsListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Table, Button, Col, Row, Menu, Tag } from 'antd';
import { PlusOutlined, Loading3QuartersOutlined, AppstoreOutlined, EditOutlined } from '@ant-design/icons'
import scss from 'assets/scss/issuingMainCreate.module.scss'
import { currencyFromat } from 'utils/format'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'
import { listColumn, defaultColumn } from './exportData'

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

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { issuing: { resAuthorizationsGetAll }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(0);
    const [activeItem, setActiveItem] = useState({})
    const [dataAllApi, setDataAll] = useState([])
    const [loadLoading, setLoadLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    const apiBalance = async (starting_after) => {
        let paramBody = {
            limit: limit
        }
        if (starting_after)
            paramBody.starting_after = starting_after
        await dispatch(authorizationsGetAllDispatch(paramBody))
        await dispatch(eventsListDispatch({}))

    }

    useEffect(async () => {
        setLoading(true)
        await apiBalance()
        setLoading(false)
        return () => {
            apiBalance()
        }
    }, [])

    const filterClick = (value) => {
        dispatch(authorizationsGetAllDispatch({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return authorizationsGetAllDispatch(dataParam)
    }

    useEffect(() => {
        if (resAuthorizationsGetAll?.data) {
            const maping = resAuthorizationsGetAll?.data?.map((val, index) => ({ ...val, key: index }))
            setDataAll(maping)

            if (!activeItem?.id)
                setActiveItem(maping[0])
        }

        return () => { }
    }, [resAuthorizationsGetAll?.data])

    const loadMore = async (starting_after) => {
        setLoadLoading(true)
        await apiBalance(starting_after)
        setLoadLoading(false)
    }

    const authorizationMetadata = [
        {
            title: "DATE",
            dataIndex: 'created',
            render: (created) => moment(created).format("MMM D"),
            key: 'created',
        },
        {
            title: "DESCRIPTION",
            dataIndex: 'merchant_data',
            key: 'merchant_data',
            render: (merchant_data) => merchant_data?.name,
        },
        {
            title: "NAME ON CARD",
            dataIndex: 'card',
            key: 'card',
            render: (card) => <div>**** {card?.cardholder?.name}</div>
        },
        {
            title: "CARD",
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                const dataDetailCard = dataAllApi?.find(val => val.id === id) || {}
                const { approved, card } = dataDetailCard
                return <div>****{card?.last4} {approved ? <Tag color="green">Approved</Tag> : <Tag color="red">Not Approved</Tag>}</div>
            }
        },
        {
            title: "STATUS",
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: "AMOUNT",
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                const { amount, currency } = dataAllApi?.find(val => val.id === id) || {}
                return amount ? currencyFromat({ number: amount, currency }) + " " + currency : ""
            },
        },
    ]
    const { merchant_data, card, status, amount, currency, id, created, request_history } = activeItem || {}
    const metadataData = activeItem && activeItem?.metadata ? Object.keys(activeItem?.metadata).map((key) => ({ key, value: activeItem.metadata[key] })) : []
    // console.log(activeItem, "activeItem")

    const listFilter = [
        {
            title: "Create Date",
            value: "create_date",
            type: 'date',
            checked: false
        },
        {
            title: "Email",
            value: "email",
            type: 'input',
            checked: false
        }
    ]
    return (
        <ArchLayout>
            <div className={scss.mainContainer}>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Authorizations</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Payout"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                        <Button
                            size="small"
                            onClick={() => history.push("/disputes/input")}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: 10 }}
                        >Add disputes</Button>
                    </div>
                </div>
                <Row gutter={24}>
                    <Col span={16} className={scss.demoInfiniteContainer} style={{ padding: 0 }}>
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                onChange: (selectedRowKeys, selectedRows) => {
                                    setActiveItem(selectedRows.length ? selectedRows[selectedRows.length - 1] : activeItem)
                                },
                                selectedRowKeys: [activeItem?.key]
                            }}
                            columns={authorizationMetadata}
                            loading={loading}
                            style={{ width: "100%" }}
                            footer={() => `${dataAllApi?.length || 0} results`}
                            dataSource={dataAllApi}
                            size="small"
                            pagination={false}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => setActiveItem(record),
                                };
                            }}
                            summary={() => (
                                <div style={{ width: "100%", justifyContent: 'center', display: 'flex' }}>
                                    <Button
                                        icon={<Loading3QuartersOutlined />}
                                        size="small"
                                        onClick={() => loadMore(dataAllApi?.[dataAllApi?.length - 1].id)}
                                        loading={loadLoading}
                                    >Load More</Button>
                                </div>
                            )}
                        />

                    </Col>
                    <Col span={8} style={{ padding: 0 }}>
                        {
                            activeItem && activeItem?.id ?
                                <div className={scss.wpContentRight}>
                                    <div>
                                        <div className={scss.wpColumn}>
                                            <div style={{ fontSize: 20 }}>{currencyFromat({ number: amount, currency })}</div>
                                            {card?.approved ? <Tag style={{ marginLeft: 12 }} color="green">Approved</Tag> : <Tag style={{ marginLeft: 12 }} color="red">Not Approved</Tag>}
                                        </div>
                                        <div className={scss.wpColumn}>
                                            <AppstoreOutlined />
                                            <div style={{ fontSize: 20, marginLeft: 20 }}>{merchant_data?.name || ""}</div>
                                        </div>
                                        <div>{moment(created).format("MMM D")}</div>
                                    </div>

                                    <div className={scss.wpContent}>
                                        <div className={scss.title}>Authorization details</div>
                                        <div className={scss.wpColumn}>
                                            <div className={scss.wpColumnLeft}>ID</div>
                                            <div>:   {id || ""}</div>
                                        </div>
                                        <div className={scss.wpColumn}>
                                            <div className={scss.wpColumnLeft}>Status</div>
                                            <div>:   {status || ""}</div>
                                        </div>
                                        <div className={scss.wpColumn}>
                                            <div className={scss.wpColumnLeft}>Card</div>
                                            <div>:   {card?.last4 || ""}</div>
                                        </div>
                                        <div className={scss.wpColumn}>
                                            <div className={scss.wpColumnLeft}>Cardholder</div>
                                            <div>:   {merchant_data?.name || ""}</div>
                                        </div>
                                        <div className={scss.wpColumn}>
                                            <div className={scss.wpColumnLeft}>Location</div>
                                            <div>:   {merchant_data?.network_id || ""}, {merchant_data?.state || ""},  {merchant_data?.postal_code || ""}, {merchant_data?.country || ""}</div>
                                        </div>
                                        <div className={scss.wpColumn}>
                                            <div className={scss.wpColumnLeft}>Category</div>
                                            <div>:   {merchant_data?.category || ""}</div>
                                        </div>
                                    </div>

                                    <div className={scss.line3}>
                                        <div className={scss.title}>Metadata</div>
                                        <Button
                                            size="small"
                                            icon={<EditOutlined />}
                                        >Edit</Button>
                                    </div>
                                    <Table
                                        columns={columnsMetadata}
                                        style={{ width: "100%" }}
                                        footer={() => `${metadataData?.data?.length || 0} results`}
                                        dataSource={metadataData}
                                        size="small"
                                        pagination={{ position: ["none", "none"] }}
                                    />


                                </div>
                                : ""
                        }
                    </Col>
                </Row>
            </div>
        </ArchLayout>
    )
}