import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { productsGetAll } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import Tabs from 'components/general/Tab'
import { Table, Typography, Button, Image } from 'antd';
import { PlusOutlined, FilterOutlined, ExportOutlined } from '@ant-design/icons'
import { pricesGetAllService } from 'services'

import scssConfig from 'assets/scss/config.module.scss'
import scss from 'assets/scss/productMainCreate.module.scss'
import { currencyFromat } from 'utils/format';
import defaultImage from 'assets/images/defaultImage.js'
import Pagination from 'components/general/Pagination'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { products: { resProductsGetAll }, loading: { loadingGet } } = useSelector(state => state)
    // const [openModalCreate, setOpenModalCreate] = useState(false)
    // const [productPrice, setProductPrice] = useState([]);
    const [productPriceAll, setProductPriceAll] = useState([]);
    const [limit, setLimit] = useState(10);
    // const [page, setPage] = useState(0);
    const [activeTab, setActiveTab] = useState(0)
    // const [dataCreate, setdataCreate] = useState({
    //     country: 'US',
    //     currency: 'usd',
    //     account_holder_name: 'Jenny Rosen',
    //     account_holder_type: 'individual',
    //     routing_number: '110000000',
    //     account_number: '000123456789',
    //     account_number_repeat: '000123456789',
    // })

    const apiBalance = async () => {
        await dispatch(productsGetAll({
            limit: limit,
            active: activeTab ? false : true
        }))
    }

    useEffect(() => {
        apiBalance()
        return () => { }
    }, [activeTab])

    useEffect(() => {
        const apiBalanceAPi = async () => {
            if (resProductsGetAll?.data) {
                const resApi = await Promise.all(resProductsGetAll?.data?.map(async value => {
                    const resPriceGet = await pricesGetAllService({
                        product: value.id
                    })
                    return ({ ...value, price: resPriceGet?.data?.payload?.data[0] })
                }))
                // console.log(resApi)
                setProductPriceAll(resApi)
            }
        }
        apiBalanceAPi()

        return () => {
        }
    }, [resProductsGetAll?.data])

    const handleChangeActiveTab = (newValue) => {
        // console.log(newValue)
        setActiveTab(Number(newValue))
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'id',
            key: 'id',
            align: 'left',
            render: id => {
                const { images, name, price } = productPriceAll?.find(val => val.id === id)
                const { unit_amount, recurring, currency } = price || {}
                // console.log(price, images, name)
                return (
                    <div className={scssConfig.flex}>
                        <Image
                            src={images && images[0] || ""}
                            style={{ width: 40, height: 40 }}
                            fallback={defaultImage}
                        />
                        <div className={`${scssConfig.wpContent}`}>
                            <div>{name || ""}</div>
                            <div className={scssConfig.color}>{unit_amount ? currencyFromat({ number: unit_amount, currency }) : ""} {currency} / {recurring?.interval}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'UPDATED',
            dataIndex: 'updated',
            key: 'updated',
            align: 'right',
            render: updated => moment(updated).format("MMM DD")
        }
    ]

    // console.log(productPriceAll,"productPriceAll")

    return (
        <ArchLayout>
            <div>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Products</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Button
                            size="small"
                            onClick={() => history.push("/disputes/input")}
                            icon={<FilterOutlined />}
                            style={{ marginLeft: 10 }}
                        >Filter</Button>
                        <Button
                            size="small"
                            onClick={() => history.push("/disputes/input")}
                            icon={<ExportOutlined />}
                            style={{ marginLeft: 10 }}
                        >Export</Button>
                        <Button
                            size="small"
                            onClick={() => history.push("/products/input")}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: 10 }}
                        >Add product</Button>
                    </div>
                </div>
                <div className={scss.contentMiddle}>
                    <Tabs
                        activeTab={activeTab}
                        handleChange={handleChangeActiveTab}
                        tabList={[{ label: "Available" }, { label: "Archived" }]}
                        style={{ marginBottom: 0 }}
                    >
                    </Tabs>
                    <Table
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => history.push("/products/detail/" + record.id)
                            };
                        }}
                        dataSource={productPriceAll}
                        size="small"
                        columns={columns}
                        loading={loadingGet}
                        pagination={false}
                        className="product-main"
                        footer={() => `${productPriceAll?.length || 0} results`}
                    />
                    <Pagination
                        getDataApi={productsGetAll({
                            limit: limit,
                            active: activeTab ? false : true
                        })}
                        dataList={productPriceAll?.data}
                    />
                </div>
            </div>
        </ArchLayout>
    )
}