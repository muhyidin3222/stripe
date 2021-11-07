import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { payOutListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Table, Typography, Button, Tag } from 'antd';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons'
import Pagination from 'components/general/Pagination'
import scss from 'assets/scss/productMainCreate.module.scss'
import { currencyFromat } from 'utils/format'
import ModalPayOut from 'components/general/Modal/Payout'
import { listColumn, defaultColumn } from './exportData'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { topUp: { resTopUpList }, loading: { loadingGet }, payOut: { resPayOutList } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    const [customerPayout, setCustomerPayout] = useState(false)

    useEffect(() => {
        const apiBalance = async () => {
            await dispatch(payOutListDispatch({
                limit: limit,
            }))
        }
        apiBalance()

        return () => {
        }
    }, [customerPayout === false])

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
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                const { amount, currency, status } = resPayOutList?.data?.find(val => val.id === id)
                return amount ? <div style={{ display: "flex" }}> {currencyFromat({ number: amount, currency })}
                    {/* <Tag size="small" style={{ marginLeft: 3 }} color={status === "succeeded" ? "green" : "red"}>{status}</Tag> */}
                </div> : ""
            }
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'DATE',
            dataIndex: 'created',
            key: 'created',
            align: "right",
            render: (created) => moment(created).format("MMM D, YYYY")
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
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Pay Out</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Payout"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                        <Button
                            size="small"
                            onClick={() => setCustomerPayout(true)}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: 10 }}
                        >New</Button>
                    </div>
                </div>
                <div className={scss.contentMiddle}>
                    <Table
                        size="small"
                        dataSource={resPayOutList?.data}
                        columns={columns}
                        loading={loadingGet}
                        pagination={false}
                        footer={() => `${resPayOutList?.data?.length || 0} results`}
                    />
                    <Pagination
                        getDataApi={payOutListDispatch}
                        dataList={resPayOutList?.data}
                    />
                </div>
            </div>


            <ModalPayOut
                modal={customerPayout}
                setModal={setCustomerPayout}
            />
        </ArchLayout>
    )
}