import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { checkoutListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import Pagination from 'components/general/Pagination'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'
import { listColumn, defaultColumn } from './exportData'

import scss from 'assets/scss/productMainCreate.module.scss'
import { currencyFromat } from 'utils/format'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { loading: { loadingGet }, transfers: { resTransfersList }, checkout: { resCheckoutList } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const apiBalance = async () => {
            await dispatch(checkoutListDispatch({
                limit: limit,
            }))
        }
        apiBalance()

        return () => {
        }
    }, [])

    const filterClick = (value) => {
        dispatch(checkoutListDispatch({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return checkoutListDispatch(dataParam)
    }


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

    const columns = [
        {
            title: 'AMOUNT',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                const { amount, currency, status } = resTransfersList?.data?.find(val => val.id === id)
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

    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Shipping rates</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Shipping rates"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                        <Button
                            size="small"
                            onClick={() => history.push("/payment/input")}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: 10 }}
                        >New</Button>
                    </div>
                </div>
                <div className={scss.contentMiddle}>
                    <Table
                        size="small"
                        dataSource={resTransfersList?.data}
                        columns={columns}
                        loading={loadingGet}
                        footer={() => `${resTransfersList?.data?.length || 0} results`}
                    />
                    <Pagination
                        getDataApi={checkoutListDispatch}
                        dataList={resTransfersList?.data}
                    />
                </div>
            </div>
        </ArchLayout>
    )
}