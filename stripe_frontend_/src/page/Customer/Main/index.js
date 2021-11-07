import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { customersListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import scss from 'assets/scss/productMainCreate.module.scss'
import ModalAddCustomer from 'components/general/Modal/AddCustomer'
import Export from 'components/general/Modal/Export'
import { listColumn, defaultColumn } from './exportData'
import Pagination from 'components/general/Pagination'
import { customersListService } from 'services/customers';
import Filter from 'components/general/Select/Filter'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { customers: { resCustomersList }, loading: { loadingGet }, loading } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [showModal, setShowModal] = useState(false)

    const apiBalance = async () => {
        await dispatch(customersListDispatch({
            limit: limit,
        }))
    }

    useEffect(() => {
        apiBalance()
        return () => {
        }
    }, [])

    const getDataDownload = async (dataParam) => {
        return customersListService(dataParam)
    }

    const columns = [
        {
            title: 'EMAIL',
            dataIndex: 'email',
            key: 'email'
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
                return '-'
            }
        },
        {
            title: 'CREATED',
            dataIndex: 'created',
            key: 'created',
            render: updated => moment(updated).format("MMM DD, HH:MM A")
        },
    ]

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const filterClick = (value) => {
        console.log(value, "filterClick")
        dispatch(customersListDispatch({
            limit: limit,
            ...value
        }))
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

    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Customer</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Customer"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                        <Button
                            size="small"
                            onClick={() => setShowModal(true)}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: 10 }}
                        >Add customer</Button>
                    </div>
                </div>
                <div className={scss.contentMiddle}>
                    <Table
                        rowClassName={() => 'editable-row'}
                        size="small"
                        dataSource={resCustomersList?.data}
                        footer={() => `${resCustomersList?.data?.length || 0} results`}
                        columns={columns}
                        pagination={false}
                        rowSelection={rowSelection}
                        loading={loadingGet}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => history.push("/customers/edit/" + record.id),
                            };
                        }}
                    />
                    <Pagination
                        getDataApi={customersListDispatch}
                        dataList={resCustomersList?.data}
                    />
                </div>
            </div>
            <ModalAddCustomer
                showModal={showModal}
                setShowModal={setShowModal}
                getCustomer={apiBalance}
            />
        </ArchLayout>
    )
}