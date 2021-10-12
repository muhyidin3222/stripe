import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { topUpListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import Tabs from 'components/general/Tab'
import Color from 'config/Color'
import { Table, Typography, Button, Tag } from 'antd';
import { PlusOutlined, FilterOutlined, ExportOutlined } from '@ant-design/icons'
import scssConfig from 'assets/scss/config.module.scss'
import scss from 'assets/scss/productMainCreate.module.scss'
import { currencyFromat } from 'utils/format'
import Pagination from 'components/general/Pagination'
import ModelBalance from 'components/general/Modal/Balances'

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

    console.log(resTopUpList)
    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Top-ups</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Button
                            size="small"
                            onClick={() => history.push("/payment/input")}
                            icon={<FilterOutlined />}
                            style={{ marginLeft: 10 }}
                        >Filter</Button>
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