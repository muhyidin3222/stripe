import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { balanceTransactionsListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import Pagination from 'components/general/Pagination'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'
import { listColumn, defaultColumn } from './exportData'

import scss from 'assets/scss/productMainCreate.module.scss'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { balance: { resBalanceTransactionsList }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);

    const filterClick = (value) => {
        dispatch(balanceTransactionsListDispatch({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return balanceTransactionsListDispatch(dataParam)
    }

    useEffect(() => {
        const apiGet = async () => {
            await dispatch(balanceTransactionsListDispatch({
                limit: limit
            }))
        }
        apiGet()
        return () => { }
    }, [])

    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: 'NET',
            dataIndex: 'net',
            key: 'net'
        },
        {
            title: 'Fee',
            dataIndex: 'fee',
            key: 'fee'
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description'
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
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >All transactions</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"All transactions"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                    </div>
                </div>
                <div className={scss.contentMiddle}>
                    <Table
                        dataSource={resBalanceTransactionsList?.data}
                        columns={columns}
                        loading={loadingGet}
                        pagination={false}
                        footer={() => `${resBalanceTransactionsList?.data?.length || 0} results`}
                        size="small"
                    />
                    <Pagination
                        getDataApi={balanceTransactionsListDispatch}
                        dataList={resBalanceTransactionsList?.data}
                    />
                </div>
            </div>
        </ArchLayout>
    )
}