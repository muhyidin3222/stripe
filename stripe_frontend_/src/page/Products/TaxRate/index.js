import React, { useState, useEffect } from 'react';

import { Table, Button, Tag } from 'antd';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { texRatesGetAll } from 'redux/actions'
import { PlusOutlined, FilterOutlined, ExportOutlined } from '@ant-design/icons'
import ArchLayout from 'components/layout/ArchLayout'
import Pagination from 'components/general/Pagination'
import ModalTaxRates from 'components/general/Modal/TaxRates'
import scss from 'assets/scss/productMainCreate.module.scss'
import moment from 'moment';
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'
import { listColumn, defaultColumn } from './exportData'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { products: { resTexRateAll }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    // const [page, setPage] = useState(0);
    const [modalTaxRate, setModalTaxRate] = useState({
        modal: false,
        id: null
    })

    const apiBalance = async () => {
        await dispatch(texRatesGetAll({
            limit: limit
        }))
    }


    const filterClick = (value) => {
        dispatch(texRatesGetAll({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return texRatesGetAll(dataParam)
    }


    useEffect(() => {
        apiBalance()

        return () => {
        }
    }, [])

    const columns = [
        {
            title: 'TAX RATE ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'TYPE',
            dataIndex: 'tax_type',
            key: 'tax_type',
        },
        {
            title: 'REGION',
            dataIndex: 'country',
            key: 'country'
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'RATE',
            dataIndex: 'id',
            key: 'id',
            render: id => {
                const { inclusive, percentage } = resTexRateAll?.data?.find(val => val.id === id)
                return (
                    <div>
                        <div>{percentage}</div>
                        <div>{inclusive}</div>
                    </div>
                )
            }
        },
        {
            title: 'STATUS',
            dataIndex: 'active',
            key: 'active',
            render: active => <Tag color={active ? "green" : ""}>{active ? "Active" : "Not active"}</Tag>
        },
        {
            title: 'CREATED',
            dataIndex: 'created',
            key: 'created',
            render: created => moment(created).format("MMM-DD")
        }
    ]

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
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Tax Rate</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Tax Rate"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                        <Button
                            size="small"
                            onClick={() => setModalTaxRate({ modal: true })}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: 10 }}
                        >Add</Button>
                    </div>
                </div>

                <Table
                    dataSource={resTexRateAll?.data}
                    columns={columns}
                    loading={loadingGet}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => setModalTaxRate({ modal: true, id: record.id })
                        };
                    }}
                    footer={() => `${resTexRateAll?.data?.length} results`}
                    size="small"
                    pagination={false}
                    className="product-main"
                />
                <Pagination
                    getDataApi={texRatesGetAll}
                    dataList={resTexRateAll?.data}
                />
            </div>

            <ModalTaxRates
                showModal={modalTaxRate}
                setShowModal={setModalTaxRate}
                getTaxRates={apiBalance}
            />
        </ArchLayout>
    )
}