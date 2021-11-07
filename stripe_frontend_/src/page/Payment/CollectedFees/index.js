import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { applicationFeesListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { currencyFromat } from 'utils/format'
import Pagination from 'components/general/Pagination'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'
import { listColumn, defaultColumn } from './exportData'

import scss from 'assets/scss/productMainCreate.module.scss'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { payment: { resApplicationFeesList }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);

    const filterClick = (value) => {
        dispatch(applicationFeesListDispatch({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return applicationFeesListDispatch(dataParam)
    }

    useEffect(() => {
        const apiGet = async () => {
            await dispatch(applicationFeesListDispatch({
                limit: limit
            }))
        }
        apiGet()
        return () => { }
    }, [])

    const columns = [
        {
            title: 'AMOUNT',
            key: 'id',
            dataIndex: 'id',
            render: (id) => {
                const { amount_paid, currency, status } = resApplicationFeesList?.data?.find(val => val.id === id)
                console.log(resApplicationFeesList?.data?.find(val => val.id === id))
                return amount_paid ? <div>{currencyFromat({ number: amount_paid, currency })} {currency} <Tag>{status}</Tag> </div> : ""
            }
        },
        {
            title: 'Wallet',
            dataIndex: 'wallet',
            key: 'wallet'
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
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Collected Fees</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Collected Fees"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                    </div>
                </div>
                <div className={scss.contentMiddle}>
                    <Table
                        dataSource={resApplicationFeesList?.data}
                        columns={columns}
                        loading={loadingGet}
                        pagination={false}
                        size="small"
                        footer={() => `${resApplicationFeesList?.data?.length || 0} results`}
                    />
                    <Pagination
                        getDataApi={applicationFeesListDispatch}
                        dataList={resApplicationFeesList?.data}
                    />
                </div>
            </div>
        </ArchLayout>
    )
}