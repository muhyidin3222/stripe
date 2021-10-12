import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { reviewGetAllDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import Pagination from 'components/general/Pagination'

import scss from 'assets/scss/productMainCreate.module.scss'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { payment: { resReviewList }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const apiBalance = async () => {
            await dispatch(reviewGetAllDispatch({
                limit: limit,
            }))
        }
        apiBalance()

        return () => { }
    }, [])

    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id'
        // },
        {
            title: 'Ip Address',
            dataIndex: 'ip_address',
            key: 'ip_address'
        },
        {
            title: 'Closed Reason',
            dataIndex: 'closed_reason',
            key: 'closed_reason'
        },
        {
            title: 'Opened Reason',
            dataIndex: 'opened_reason',
            key: 'opened_reason'
        },
        {
            title: 'DATE',
            dataIndex: 'created',
            align: 'right',
            key: 'created',
            render: updated => moment(updated).format("MMM DD, HH:MM A")
        },
    ]

    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Reviews</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        {/* <Button
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
                        >Export</Button> */}
                    </div>
                </div>
                <div className={scss.contentMiddle}>
                    <Table
                        dataSource={resReviewList?.data}
                        columns={columns}
                        loading={loadingGet}
                        pagination={false}
                        size="small"
                        footer={() => `${resReviewList?.data?.length ||0} results`}

                    />
                      <Pagination
                        getDataApi={reviewGetAllDispatch}
                        dataList={resReviewList?.data}
                    />
                </div>
            </div>
        </ArchLayout>
    )
}