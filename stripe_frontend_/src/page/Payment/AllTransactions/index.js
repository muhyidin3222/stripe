import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { balanceTransactionsListDispatch, transactionGetAllDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import Pagination from 'components/general/Pagination'

import scss from 'assets/scss/productMainCreate.module.scss'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { balance: { resBalanceTransactionsList }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);

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

    console.log(resBalanceTransactionsList)

    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >All transactions</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        {/* <Button
                            size="small"
                            onClick={() => history.push("/payment/input")}
                            icon={<FilterOutlined />}
                            style={{ marginLeft: 10 }}
                        >Filter</Button>
                        <Button
                            size="small"
                            onClick={() => history.push("/payment/input")}
                            icon={<ExportOutlined />}
                            style={{ marginLeft: 10 }}
                        >Export</Button> */}
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