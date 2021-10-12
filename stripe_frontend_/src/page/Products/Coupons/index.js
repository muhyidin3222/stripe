import React, { useState, useEffect } from 'react';

import { Table, Button } from 'antd';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cuponsGetAll } from 'redux/actions'
import { PlusOutlined, FilterOutlined, ExportOutlined } from '@ant-design/icons'
import ArchLayout from 'components/layout/ArchLayout'
import Pagination from 'components/general/Pagination'

import scss from 'assets/scss/productMainCreate.module.scss'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { products: { resCuponsGetAll }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const apiBalance = async () => {
            await dispatch(cuponsGetAll({
                limit: limit
            }))
        }
        apiBalance()

        return () => {
        }
    }, [])

    const columns = [
        {
            title: 'COUPON',
            dataIndex: 'name',
            key: 'name',
            align: 'left'
        },
        {
            title: 'TERMS',
            dataIndex: 'id',
            key: 'id',
            render: id => {
                const { percent_off, duration, amount_off } = resCuponsGetAll?.data?.find(val => val.id === id)
                return (
                    <div>{percent_off} {amount_off ? "on" : "off"} {duration}</div>
                )
            },
            align: 'left'
        },
        {
            title: 'REDEMPTIONS',
            dataIndex: 'max_redemptions',
            key: 'max_redemptions',
            align: 'right',
            render: max_redemptions => {
                return (
                    <div>{max_redemptions || 0}</div>
                )
            }
        },
        {
            title: 'EXPIRES',
            dataIndex: 'expires',
            key: 'expires',
            align: 'right',
            render: id => {
                return (
                    <div>-</div>
                )
            }
        }
    ]

    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Coupons</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Button
                            size="small"
                            onClick={() => history.push("/products/create")}
                            icon={<FilterOutlined />}
                            style={{ marginLeft: 10 }}
                        >Filter</Button>
                        <Button
                            size="small"
                            onClick={() => history.push("/products/coupons/input")}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: 10 }}
                        >Add</Button>
                        <Button
                            size="small"
                            onClick={() => history.push("/products/create")}
                            icon={<ExportOutlined />}
                            style={{ marginLeft: 10 }}
                        >Export</Button>
                    </div>
                </div>

                <Table
                    dataSource={resCuponsGetAll?.data}
                    columns={columns}
                    loading={loadingGet}
                    size="small"
                    footer={() => `${resCuponsGetAll?.data?.length ||0} results`}
                    pagination={false}
                />
                <Pagination
                    getDataApi={cuponsGetAll}
                    dataList={resCuponsGetAll?.data}
                />
            </div>
        </ArchLayout>
    )
}