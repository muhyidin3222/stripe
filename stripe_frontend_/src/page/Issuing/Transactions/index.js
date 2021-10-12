import React, { useState, useEffect ,Fragment} from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { transactionGetAllDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Table } from 'antd'
import { FilterOutlined, ExportOutlined } from '@ant-design/icons'
import Pagination from 'components/general/Pagination'

import scss from 'assets/scss/productMainCreate.module.scss'
import { currencyFromat } from 'utils/format'

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


    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Transaction</div>
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