import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { transactionGetAllDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Table } from 'antd'
import Pagination from 'components/general/Pagination'
import scss from 'assets/scss/productMainCreate.module.scss'
import { currencyFromat } from 'utils/format'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'
import { listColumn, defaultColumn } from './exportData'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { issuing: { resTransactionsGetAll }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const apiBalance = async () => {
            await dispatch(transactionGetAllDispatch({
                limit: limit,
            }))
        }
        apiBalance()

        return () => { }
    }, [])

    const filterClick = (value) => {
        dispatch(transactionGetAllDispatch({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return transactionGetAllDispatch(dataParam)
    }

    const columns = [
        {
            title: "AMOUNT",
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                const { amount, currency } = resTransactionsGetAll?.data?.find(val => val.id === id) || {}
                return amount ? currencyFromat({ number: amount, currency }) + " " + currency : ""
            },
        },
        {
            title: "NAME",
            dataIndex: 'merchant_data',
            key: 'merchant_data',
            render: (merchant_data) => merchant_data?.name,
        },
        {
            title: "DATE",
            dataIndex: 'created',
            render: (created) => moment(created).format("MMM D"),
            key: 'created',
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
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Transaction</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Transaction"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                    </div>
                </div>
                <div className={scss.contentMiddle}>
                    <Table
                        dataSource={resTransactionsGetAll?.data}
                        columns={columns}
                        footer={() => `${resTransactionsGetAll?.data?.length || 0} results`}
                        loading={loadingGet}
                        size="small"
                        pagination={false}
                    />
                    <Pagination
                        getDataApi={transactionGetAllDispatch}
                        dataList={resTransactionsGetAll?.data}
                    />
                </div>
            </div>
        </ArchLayout>
    )
}