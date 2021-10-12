import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { disputesGetAllDispatch } from 'redux/actions'
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
    const { customers: { resDisputeGetAll }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    const [loadingDonwload, setLoadingDonwload] = useState(false)
    // const [page, setPage] = useState(0);
    const [spendingCt, setSpendingCt] = useState("all")
    useEffect(() => {
        let paramData = {
            limit
        }
        if (spendingCt !== "all")
            paramData.status = spendingCt
        dispatch(disputesGetAllDispatch(paramData))
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
                const { amount, currency } = resDisputeGetAll?.data?.find(val => val.id === id)
                return amount ? currencyFromat({ number: amount, currency }) : ""
            }
        },
        {
            title: 'CREATED',
            dataIndex: 'created',
            key: 'created',
            render: updated => moment(updated).format("MMM DD, HH:MM A")
        }
    ]


    // const onDonwload = async () => {
    //     setLoadingDonwload(true)
    //     try {
    //         const responeData = await getParticipantsS({ total_items: dataParticipan.count, page: 1, id })
    //         var columns = [
    //             {
    //                 label: 'Id/Id Booking',
    //                 value: 'id'
    //             },
    //             {
    //                 label: 'Email',
    //                 value: row => row.user?.email
    //             },
    //             {
    //                 label: 'Name',
    //                 value: row => row.user?.username
    //             },
    //             {
    //                 label: 'Member',
    //                 value: row => row.user?.payment
    //             },
    //             {
    //                 label: 'phone',
    //                 value: row => row.user?.mobile_number
    //             },
    //             {
    //                 label: 'payment type',
    //                 value: row => row.payment?.payment_type
    //             },
    //             {
    //                 label: 'bank',
    //                 value: row => row.payment?.bank
    //             },
    //             {
    //                 label: 'date payment',
    //                 value: row => row.payment?.transaction_time
    //             }
    //         ]

    //         var settings = {
    //             sheetName: 'First sheet',
    //             fileName: 'Data Peserta ' + title,
    //             extraLength: 3,
    //             writeOptions: {}
    //         }

    //         var download = true

    //         await xlsx(columns, responeData.data.payload.rows, settings, download)
    //         setLoadingDonwload(false)
    //     } catch (error) {
    //         console.log(error)
    //         setLoadingDonwload(false)
    //     }
    // }

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
                    </div>
                </div>

                <Tabs defaultActiveKey={spendingCt} size="small" onChange={val => setSpendingCt(val)}>
                    <TabPane tab="All disputes" key={"all"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resDisputeGetAll?.data?.length || 0} results`}
                            size="small"
                            dataSource={resDisputeGetAll?.data}
                            loading={loadingGet}
                            pagination={false}
                        />
                        <Pagination
                            getDataApi={disputesGetAllDispatch}
                            dataList={resDisputeGetAll?.data}
                        />
                    </TabPane>
                    <TabPane tab="Unsubmitted" key={"unsubmitted"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resDisputeGetAll?.data?.length || 0} results`}
                            size="small"
                            dataSource={resDisputeGetAll?.data}
                            loading={loadingGet}
                            pagination={false}
                        />
                        <Pagination
                            getDataApi={disputesGetAllDispatch}
                            dataList={resDisputeGetAll?.data}
                        />
                    </TabPane>
                    <TabPane tab="Won" key={"won"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resDisputeGetAll?.data?.length || 0} results`}
                            size="small"
                            dataSource={resDisputeGetAll?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={disputesGetAllDispatch}
                            dataList={resDisputeGetAll?.data}
                        />
                    </TabPane>
                    <TabPane tab="Lost" key={"lost"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resDisputeGetAll?.data?.length || 0} results`}
                            size="small"
                            dataSource={resDisputeGetAll?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={disputesGetAllDispatch}
                            dataList={resDisputeGetAll?.data}
                        />
                    </TabPane>
                    <TabPane tab="Expired" key={"warning_closed"} size="small" >
                        <Table
                            columns={columns}
                            style={{ width: "100%" }}
                            footer={() => `${resDisputeGetAll?.data?.length || 0} results`}
                            size="small"
                            dataSource={resDisputeGetAll?.data}
                            pagination={false}
                            loading={loadingGet}
                        />
                        <Pagination
                            getDataApi={disputesGetAllDispatch}
                            dataList={resDisputeGetAll?.data}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </ArchLayout>
    )
}