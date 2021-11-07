import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { invoicesListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Button, Table, Tabs, Tag } from 'antd'
import Pagination from 'components/general/Pagination'

import scss from 'assets/scss/productMainCreate.module.scss'
import { currencyFromat } from 'utils/format'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'
import { listColumn, defaultColumn } from './exportData'

const { TabPane } = Tabs;

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { invoices: { resInvoicesList }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    // const [page, setPage] = useState(0);
    const [tabCt, settabCt] = useState("all")
    useEffect(() => {
        let paramData = {
            limit
        }
        if (tabCt !== "all")
            paramData.status = tabCt
        dispatch(invoicesListDispatch(paramData))
        return () => { }
    }, [tabCt])

    const columns = [
        {
            title: 'AMOUNT',
            key: 'id',
            dataIndex: 'id',
            render: (id) => {
                const { amount_paid, currency, status } = resInvoicesList?.data?.find(val => val.id === id)
                console.log(resInvoicesList?.data?.find(val => val.id === id))
                return amount_paid ? <div>{currencyFromat({ number: amount_paid, currency })} {currency} <Tag>{status}</Tag> </div> : ""
            }
        },
        {
            title: 'Customer',
            key: 'customer_email',
            dataIndex: 'customer_email'
        },
        {
            title: 'INVOICE NUMBER',
            key: 'receipt_number',
            dataIndex: 'receipt_number'
        },
        {
            title: 'CREATED',
            dataIndex: 'created',
            align: 'right',
            key: 'created',
            render: updated => moment(updated).format("MMM DD, HH:MM A")
        }
    ]

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


    const filterClick = (value) => {
        dispatch(invoicesListDispatch({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return invoicesListDispatch(dataParam)
    }

    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Invoice</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Invoice"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                    </div>
                </div>

                <Tabs defaultActiveKey={tabCt} size="small" onChange={val => settabCt(val)}>
                    <TabPane tab="All Invoice" key={"all"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resInvoicesList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resInvoicesList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={invoicesListDispatch}
                            dataList={resInvoicesList?.data}
                        />
                    </TabPane>
                    <TabPane tab="Draft" key={"draft"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resInvoicesList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resInvoicesList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={invoicesListDispatch}
                            dataList={resInvoicesList?.data}
                        />
                    </TabPane>
                    <TabPane tab="Outstanding" key={"open"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resInvoicesList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resInvoicesList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={invoicesListDispatch}
                            dataList={resInvoicesList?.data}
                        />
                    </TabPane>
                    <TabPane tab="Past due" key={"uncollectible"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resInvoicesList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resInvoicesList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={invoicesListDispatch}
                            dataList={resInvoicesList?.data}
                        />
                    </TabPane>
                    <TabPane tab="Paid" key={"paid"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resInvoicesList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resInvoicesList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={invoicesListDispatch}
                            dataList={resInvoicesList?.data}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </ArchLayout>
    )
}