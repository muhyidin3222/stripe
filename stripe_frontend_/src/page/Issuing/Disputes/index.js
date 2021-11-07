import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { disputesGetAllDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Table, Tabs } from 'antd'
import Pagination from 'components/general/Pagination'
import scss from 'assets/scss/productMainCreate.module.scss'
import { currencyFromat } from 'utils/format'
import { listColumn, defaultColumn } from './exportData'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'

const { TabPane } = Tabs;

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { customers: { resDisputeGetAll }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    const [spendingCt, setSpendingCt] = useState("all")
    
    useEffect(() => {
        let paramData = {
            limit
        }
        if (spendingCt !== "all")
            paramData.status = spendingCt
        dispatch(disputesGetAllDispatch(paramData))
        return () => { }
    }, [spendingCt])

    const filterClick = (value) => {
        dispatch(disputesGetAllDispatch({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return disputesGetAllDispatch(dataParam)
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'AMOUNT',
            key: 'id',
            dataIndex: 'id',
            render: (id) => {
                const { amount, currency } = resDisputeGetAll?.data?.find(val => val.id === id)
                return amount ? currencyFromat({ number: amount, currency }) : ""
            }
        },
        {
            title: 'CREATED',
            dataIndex: 'created',
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

    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Disputes</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Disputes"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                    </div>
                </div>

                <Tabs defaultActiveKey={spendingCt} size="small" onChange={val => setSpendingCt(val)}>
                    <TabPane tab="All disputes" key={"all"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resDisputeGetAll?.data?.length || 0} results`}
                            size="small"
                            dataSource={resDisputeGetAll?.data}
                            loading={loadingGet}
                            pagination={false}
                        />
                        <Pagination
                            getDataApi={disputesGetAllDispatch}
                            dataList={resDisputeGetAll?.data}
                        />
                    </TabPane>
                    <TabPane tab="Unsubmitted" key={"unsubmitted"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resDisputeGetAll?.data?.length || 0} results`}
                            size="small"
                            dataSource={resDisputeGetAll?.data}
                            loading={loadingGet}
                            pagination={false}
                        />
                        <Pagination
                            getDataApi={disputesGetAllDispatch}
                            dataList={resDisputeGetAll?.data}
                        />
                    </TabPane>
                    <TabPane tab="Won" key={"won"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resDisputeGetAll?.data?.length || 0} results`}
                            size="small"
                            dataSource={resDisputeGetAll?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={disputesGetAllDispatch}
                            dataList={resDisputeGetAll?.data}
                        />
                    </TabPane>
                    <TabPane tab="Lost" key={"lost"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resDisputeGetAll?.data?.length || 0} results`}
                            size="small"
                            dataSource={resDisputeGetAll?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={disputesGetAllDispatch}
                            dataList={resDisputeGetAll?.data}
                        />
                    </TabPane>
                    <TabPane tab="Expired" key={"warning_closed"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resDisputeGetAll?.data?.length || 0} results`}
                            size="small"
                            dataSource={resDisputeGetAll?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={disputesGetAllDispatch}
                            dataList={resDisputeGetAll?.data}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </ArchLayout>
    )
}