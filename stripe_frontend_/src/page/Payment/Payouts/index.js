import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { payOutListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Button, Table, Tabs } from 'antd'
import { FilterOutlined, ExportOutlined } from '@ant-design/icons'
import Pagination from 'components/general/Pagination'

import scss from 'assets/scss/productMainCreate.module.scss'
import { currencyFromat } from 'utils/format'

const { TabPane } = Tabs;

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { payOut: { resPayOutList }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    // const [page, setPage] = useState(0);
    const [quoteCt, setQuoteCt] = useState("under_review")
    useEffect(() => {
        let paramData = {
            limit
        }
        if (quoteCt !== "all")
            paramData.status = quoteCt
        dispatch(payOutListDispatch(paramData))
        return () => { }
    }, [quoteCt])


    const columns = [

        {
            title: 'AMOUNT',
            key: 'id',
            dataIndex: 'id',
            render: (id) => {
                const { amount, currency } = resPayOutList?.data?.find(val => val.id === id)
                return amount ? currencyFromat({ number: amount, currency }) : ""
            }
        },
        {
            title: 'METHOD',
            dataIndex: 'method',
            key: 'method'
        },
        {
            title: 'CREATED',
            dataIndex: 'created',
            key: 'created',
            align: 'right',
            render: updated => moment(updated).format("MMM DD, HH:MM A")
        }
    ]

    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Quote</div>
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
                    </div>
                </div>

                <Tabs defaultActiveKey={quoteCt} size="small" onChange={val => setQuoteCt(val)}>
                    <TabPane tab="All" key={"all"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resPayOutList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resPayOutList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />

                        <Pagination
                            getDataApi={payOutListDispatch}
                            dataList={resPayOutList?.data}
                        />
                    </TabPane>
                    <TabPane tab="Pending" key={"pending"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resPayOutList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resPayOutList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />

                        <Pagination
                            getDataApi={payOutListDispatch}
                            dataList={resPayOutList?.data}
                        />
                    </TabPane>
                    <TabPane tab="Paid" key={"paid"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resPayOutList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resPayOutList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={payOutListDispatch}
                            dataList={resPayOutList?.data}
                        />

                    </TabPane>
                    <TabPane tab="Canceled" key={"canceled"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resPayOutList?.data?.length || 0} results`}
                            size="small"
                            dataSource={resPayOutList?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={payOutListDispatch}
                            dataList={resPayOutList?.data}
                        />

                    </TabPane>
                </Tabs>
            </div>
        </ArchLayout>
    )
}