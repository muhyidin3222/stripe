import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { customersListDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import { Table, Typography, Button } from 'antd';
import { PlusOutlined, FilterOutlined, ExportOutlined } from '@ant-design/icons'
import scssConfig from 'assets/scss/config.module.scss'
import scss from 'assets/scss/productMainCreate.module.scss'
import { customersGetIdService } from 'services'
import ModalAddCustomer from 'components/general/Modal/AddCustomer'
import ModalExport from 'components/general/Modal/Export'
import xlsx from 'json-as-xlsx'
import { listColumn, defaultColumn } from './exportData'
import Pagination from 'components/general/Pagination'
import { customersListService } from 'services/customers';

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { customers: { resCustomersList }, loading: { loadingGet }, loading } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [showExport, setShowExport] = useState(false)
    const [dataDonwload, setDataDonwload] = useState([])


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
        const resDownload = await customersListService(dataParam)
        setDataDonwload(resDownload?.data?.payload?.data)
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
                // const detailCustomer = customersGetIdService(customer)
                // console.log(detailCustomer?.data?.payload?.name, "detailCustomer?.data?.payload?.name")
                // return detailCustomer?.data?.payload?.name || detailCustomer?.data?.payload?.email
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


    const selectDownload = async ({ selectData }) => {
        var settings = {
            sheetName: 'First sheet',
            fileName: "Customer",
            extraLength: 3,
            writeOptions: {}
        }
        var download = true
        await xlsx(selectData, dataDonwload, settings, download)

    }

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // console.log(resCustomersList, "resCustomersList")
    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Customer</div>
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
                            onClick={() => setShowExport(true)}
                            icon={<ExportOutlined />}
                            style={{ marginLeft: 10 }}
                        >Export</Button>
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
            <ModalExport
                modal={showExport}
                setModal={setShowExport}
                onGetApi={getDataDownload}
                title={"Customer"}
                dataColumn={listColumn}
                selectDownload={selectDownload}
                selectDataProps={defaultColumn}
            />
        </ArchLayout>
    )
}