import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { paymentListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import Tabs from 'components/general/Tab'
import Color from 'config/Color'
import { Table, Typography, Button } from 'antd';
import { PlusOutlined, FilterOutlined, ExportOutlined } from '@ant-design/icons'
import Pagination from 'components/general/Pagination'

import scssConfig from 'assets/scss/config.module.scss'
import scss from 'assets/scss/productMainCreate.module.scss'
import { customersGetIdService } from 'services'

const { gray } = Color.Border
const { Title } = Typography

const tabsData = [
    { label: "All" },
    { label: "Succeeded" },
    { label: "Refunded" },
    { label: "Uncaptured" }
]

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { payment: { resPaymentList }, loading: { loadingGet }, loading } = useSelector(state => state)
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        const apiBalance = async () => {
            await dispatch(paymentListDispatch({
                limit: 10,
            }))
        }
        apiBalance()

        return () => {
        }
    }, [activeTab])

    const handleChangeActiveTab = (newValue) => {
        setActiveTab(Number(newValue))
    }
    const columns = [
        {
            title: 'AMOUNT',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'CUSTOMER',
            dataIndex: 'customer',
            key: 'customer',
            render: customer => {
                // const detailCustomer = customersGetIdService(customer)
                // console.log(detailCustomer?.data?.payload?.name, "detailCustomer?.data?.payload?.name")
                // return detailCustomer?.data?.payload?.name || detailCustomer?.data?.payload?.email
                return customer
            }
        },
        {
            title: 'DATE',
            dataIndex: 'created',
            key: 'created',
            align: 'right',
            render: updated => moment(updated).format("MMM DD, HH:MM A")
        },
    ]
    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Payment</div>
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
                            icon={<ExportOutlined />}
                            style={{ marginLeft: 10 }}
                        >Export</Button>
                        <Button
                            size="small"
                            onClick={() => history.push("/payment/input")}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: 10 }}
                        >Add Payment</Button>
                    </div>
                </div>
                <div className={scss.contentMiddle}>
                    <Tabs
                        activeTab={activeTab}
                        handleChange={handleChangeActiveTab}
                        tabList={tabsData}
                        style={{ marginBottom: 0 }}
                    >
                    </Tabs>
                    <Table
                        dataSource={resPaymentList?.data}
                        columns={columns}
                        pagination={false}
                        loading={loadingGet}
                        size="small"
                        footer={() => `${resPaymentList?.data?.length || 0} results`}
                    />
                    <Pagination
                        getDataApi={paymentListDispatch}
                        dataList={resPaymentList?.data}
                    />
                </div>
            </div>
        </ArchLayout>
    )
}