import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { disputesListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import Tabs from 'components/general/Tab'
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import Pagination from 'components/general/Pagination'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'
import { listColumn, defaultColumn } from './exportData'

import scss from 'assets/scss/productMainCreate.module.scss'

const tabsData = [
    { label: "All" },
    { label: "Succeeded" },
    { label: "Refunded" },
    { label: "Uncaptured" }
]

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { disputes: { resDisputesList }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        const apiBalance = async () => {
            await dispatch(disputesListDispatch({
                limit: limit,
            }))
        }
        apiBalance()

        return () => {
        }
    }, [activeTab])

    const handleChangeActiveTab = (newValue) => {
        setActiveTab(Number(newValue))
    }

    const filterClick = (value) => {
        dispatch(disputesListDispatch({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return disputesListDispatch(dataParam)
    }

    const columns = [
        {
            title: 'AMOUNT',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'CUSTOMER',
            dataIndex: 'customer',
            key: 'customer',
            render: customer => {
                // const detailCustomer = customersGetIdService(customer)
                // console.log(detailCustomer?.data?.payload?.name, "detailCustomer?.data?.payload?.name")
                // return detailCustomer?.data?.payload?.name || detailCustomer?.data?.payload?.email
                return customer
            }
        },
        {
            title: 'DATE',
            dataIndex: 'created',
            key: 'created',
            align: 'right',
            render: updated => moment(updated).format("MMM DD, HH:MM A")
        },
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
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Coupons</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Coupons"}
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
                <div className={scss.contentMiddle}>
                    <Tabs
                        activeTab={activeTab}
                        handleChange={handleChangeActiveTab}
                        tabList={tabsData}
                        style={{ marginBottom: 0 }}
                    >
                    </Tabs>
                    <Table
                        dataSource={resDisputesList?.data}
                        columns={columns}
                        loading={loadingGet}
                        size="small"
                        footer={() => `${resDisputesList?.data?.length || 0} results`}
                    />
                    <Pagination
                        getDataApi={disputesListDispatch}
                        dataList={resDisputesList?.data}
                    />
                </div>
            </div>
        </ArchLayout>
    )
}