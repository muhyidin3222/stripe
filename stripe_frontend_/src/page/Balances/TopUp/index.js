import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { topUpListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Table, Button, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import scss from 'assets/scss/productMainCreate.module.scss'
import { currencyFromat } from 'utils/format'
import Pagination from 'components/general/Pagination'
import ModelBalance from 'components/general/Modal/Balances'
import { listColumn, defaultColumn } from './exportData'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { topUp: { resTopUpList }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    const [openModalCreate, setOpenModalCreate] = useState(false)

    useEffect(() => {
        const apiBalance = async () => {
            await dispatch(topUpListDispatch({
                limit: limit,
                // active: activeTab ? false : true
            }))
        }
        apiBalance()

        return () => {
        }
    }, [])

    const filterClick = (value) => {
        dispatch(topUpListDispatch({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return topUpListDispatch(dataParam)
    }

    const columns = [
        {
            title: 'AMOUNT',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                const { amount, currency, status } = resTopUpList?.data?.find(val => val.id === id)
                return amount ? <div style={{ display: "flex" }}> {`${currencyFromat({ number: amount, currency })} ${currency?.toUpperCase()}`}  <Tag size="small" style={{ marginLeft: 3 }} color={status === "succeeded" ? "green" : "red"}>{status}</Tag></div> : ""
            }
        },
        {
            title: 'SOURCE',
            dataIndex: 'source',
            key: 'source',
            render: source => `${source?.ach_debit?.bank_name}  ***${source?.ach_debit?.last4}`
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'INITIATED',
            dataIndex: 'created',
            key: 'created',
            render: (created) => moment(created).format("MMM D")
        },
        {
            title: 'AVAILABLE',
            dataIndex: 'expected_availability_date',
            key: 'expected_availability_date',
            render: (expected_availability_date) => moment(expected_availability_date).format("MMM D")
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

    console.log(resTopUpList)
    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Top-ups</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Top-ups"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                        <Button
                            size="small"
                            onClick={() => setOpenModalCreate(true)}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: 10 }}
                        >New</Button>
                    </div>
                </div>
                <div className={scss.contentMiddle}>
                    <Table
                        size="small"
                        dataSource={resTopUpList?.data}
                        columns={columns}
                        pagination={false}
                        loading={loadingGet}
                        footer={() => `${resTopUpList?.data?.length || 0} results`}
                    />
                    <Pagination
                        getDataApi={topUpListDispatch}
                        dataList={resTopUpList?.data}
                    />
                </div>
            </div>

            <ModelBalance
                modal={openModalCreate}
                setModal={setOpenModalCreate}
            />
        </ArchLayout>
    )
}