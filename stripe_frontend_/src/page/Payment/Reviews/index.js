import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { reviewGetAllDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import Pagination from 'components/general/Pagination'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'
import { listColumn, defaultColumn } from './exportData'

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

    const filterClick = (value) => {
        dispatch(reviewGetAllDispatch({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return reviewGetAllDispatch(dataParam)
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
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Reviews"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                    </div>
                </div>
                <div className={scss.contentMiddle}>
                    <Table
                        dataSource={resReviewList?.data}
                        columns={columns}
                        loading={loadingGet}
                        pagination={false}
                        size="small"
                        footer={() => `${resReviewList?.data?.length || 0} results`}

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