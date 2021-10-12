import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { checkoutListDispatch, transfersListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Table, Button, Tag } from 'antd';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons'
import Pagination from 'components/general/Pagination'

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

    console.log(resCheckoutList, "resCheckoutList")
    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Shipping rates</div>
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