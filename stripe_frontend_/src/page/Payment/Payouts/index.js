import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { payOutListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Button, Table, Tabs } from 'antd'
import { FilterOutlined, ExportOutlined } from '@ant-design/icons'
import Pagination from 'components/general/Pagination'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'
import { listColumn, defaultColumn } from './exportData'

import scss from 'assets/scss/productMainCreate.module.scss'
import { currencyFromat } from 'utils/format'

const { TabPane } = Tabs;

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { payOut: { resPayOutList }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    // const [page, setPage] = useState(0);
    const [quoteCt, setQuoteCt] = useState("under_review")
    useEffect(() => {
        let paramData = {
            limit
        }
        if (quoteCt !== "all")
            paramData.status = quoteCt
        dispatch(payOutListDispatch(paramData))
        return () => { }
    }, [quoteCt])


    const filterClick = (value) => {
        dispatch(payOutListDispatch({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return payOutListDispatch(dataParam)
    }

    const columns = [

        {
            title: 'AMOUNT',
            key: 'id',
            dataIndex: 'id',
            render: (id) => {
                const { amount, currency } = resPayOutList?.data?.find(val => val.id === id)
                return amount ? currencyFromat({ number: amount, currency }) : ""
            }
        },
        {
            title: 'METHOD',
            dataIndex: 'method',
            key: 'method'
        },
        {
            title: 'CREATED',
            dataIndex: 'created',
            key: 'created',
            align: 'right',
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

    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Quote</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Quote"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                    </div>
                </div>

                <Tabs defaultActiveKey={quoteCt} size="small" onChange={val => setQuoteCt(val)}>
                    <TabPane tab="All" key={"all"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resPayOutList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resPayOutList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />

                        <Pagination
                            getDataApi={payOutListDispatch}
                            dataList={resPayOutList?.data}
                        />
                    </TabPane>
                    <TabPane tab="Pending" key={"pending"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resPayOutList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resPayOutList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />

                        <Pagination
                            getDataApi={payOutListDispatch}
                            dataList={resPayOutList?.data}
                        />
                    </TabPane>
                    <TabPane tab="Paid" key={"paid"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resPayOutList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resPayOutList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={payOutListDispatch}
                            dataList={resPayOutList?.data}
                        />

                    </TabPane>
                    <TabPane tab="Canceled" key={"canceled"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resPayOutList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resPayOutList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={payOutListDispatch}
                            dataList={resPayOutList?.data}
                        />

                    </TabPane>
                </Tabs>
            </div>
        </ArchLayout>
    )
}