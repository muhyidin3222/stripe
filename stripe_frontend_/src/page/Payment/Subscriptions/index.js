import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { subscriptionsListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Button, Table, Tabs } from 'antd'
import { FilterOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons'

import scss from 'assets/scss/productMainCreate.module.scss'
import { currencyFromat } from 'utils/format'

const { TabPane } = Tabs;

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { subscriptions: { resSubscriptionsList }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    // const [page, setPage] = useState(0);
    const [spendingCt, setSpendingCt] = useState("all")
    useEffect(() => {
        let paramData = {
            limit
        }
        paramData.status = spendingCt
        dispatch(subscriptionsListDispatch(paramData))
        return () => { }
    }, [spendingCt])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'AMOUNT',
            key: 'id',
            dataIndex: 'id',
            render: (id) => {
                const { amount, currency } = resSubscriptionsList?.data?.find(val => val.id === id)
                return amount ? currencyFromat({ number: amount, currency }) : ""
            }
        },
        {
            title: 'CREATED',
            dataIndex: 'created',
            key: 'created',
            align: 'right',
            render: updated => moment(updated).format("MMM DD, HH:MM A")
        }
    ]

    // /subscriptions/input

    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Disputes</div>
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
                            onClick={() => history.push("/payment/subscriptions/input")}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: 10 }}
                        >Add Subscriptions</Button>
                    </div>
                </div>

                <Tabs defaultActiveKey={spendingCt} size="small" onChange={val => setSpendingCt(val)}>
                    <TabPane tab="Current" key={"all"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resSubscriptionsList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resSubscriptionsList?.data}
                            pagination={{ position: ["none", "none"] }}
                            loading={loadingGet}
                        />
                    </TabPane>
                    <TabPane tab="Scheduled" key={"past_due"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resSubscriptionsList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resSubscriptionsList?.data}
                            pagination={{ position: ["none", "none"] }}
                            loading={loadingGet}
                        />
                    </TabPane>
                    <TabPane tab="Canceled" key={"canceled"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resSubscriptionsList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resSubscriptionsList?.data}
                            pagination={{ position: ["none", "none"] }}
                            loading={loadingGet}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </ArchLayout>
    )
}