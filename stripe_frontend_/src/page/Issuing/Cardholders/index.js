import React, { useState, useEffect, Fragment } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';

import { cardholderGetAllDispatch } from 'redux/actions'
import ArchLayout from 'components/layout/ArchLayout'
import CardholderDetail from 'components/general/Card/CardholderDetail'
import { Button, Skeleton, List, Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import ModalAddCardholder from 'components/general/Modal/ModalAddCardholder'
import scss from 'assets/scss/issuingMainCreate.module.scss'
import { listColumn, defaultColumn } from './exportData'
import Filter from 'components/general/Select/Filter'
import Export from 'components/general/Modal/Export'

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { issuing: { resCardholderGetAll }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(30);
    const [showModal, setShowModal] = useState(false)
    const [activeItem, setActiveItem] = useState({})
    // const [activeMenu, setActiveMenu] = useState(resCardholderGetAll?.data[0])

    useEffect(() => {
        const apiBalance = async () => {
            await dispatch(cardholderGetAllDispatch({ limit: limit }))
        }
        apiBalance()
        return () => { }
    }, [])

    useEffect(() => {
        if (resCardholderGetAll?.data?.length)
            setActiveItem(resCardholderGetAll?.data[0])
        return () => { }
    }, [resCardholderGetAll?.data?.length])

    const handleChangeActive = (newValue) => {
        setActiveItem(newValue)
    }

    const filterClick = (value) => {
        dispatch(cardholderGetAllDispatch({
            limit: limit,
            ...value
        }))
    }

    const getDataDownload = async (dataParam) => {
        return cardholderGetAllDispatch(dataParam)
    }

    const handleInfiniteOnLoad = async () => {
        if (resCardholderGetAll.has_more)
            await dispatch(cardholderGetAllDispatch({
                limit: limit + 10
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
    // console.log(activeItem, "activeItem")
    return (
        <ArchLayout>
            <div className={scss.mainContainer}>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Cards</div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Filter
                            doneClick={filterClick}
                            listMap={listFilter}
                        />
                        <Export
                            onGetApi={getDataDownload}
                            title={"Cards"}
                            dataColumn={listColumn}
                            selectDataProps={defaultColumn}
                        />
                        <Button
                            size="small"
                            onClick={() => setShowModal(true)}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: 10 }}
                        >Add Cardholder</Button>
                    </div>
                </div>
                <Row gutter={24}>
                    <Col span={8} className={scss.demoInfiniteContainer} style={{ padding: 0 }}>
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={handleInfiniteOnLoad}
                            hasMore={!loadingGet && !resCardholderGetAll.has_more}
                            useWindow={false}
                        >
                            <List
                                className={scss.contentMiddle}
                                loading={loadingGet}
                                itemLayout="horizontal"
                                loadMore={true}
                                dataSource={resCardholderGetAll.data}
                                renderItem={item => (
                                    <List.Item className={`${scss.listItem}`}>
                                        <Skeleton title={false} loading={item.loading} active>
                                            <List.Item.Meta
                                                title={
                                                    <div className={`${scss.itemMeta} ${activeItem.id === item.id && scss.activeItem}`} onClick={() => handleChangeActive(item)}>
                                                        <div>
                                                            {item.name}
                                                        </div>
                                                        {/* <div>
                                                            {item.created}
                                                        </div> */}
                                                    </div>
                                                }
                                            />
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />
                        </InfiniteScroll>
                    </Col>
                    <Col span={16} style={{ padding: 0 }}>
                        <CardholderDetail
                            cardholderData={activeItem}
                        />
                    </Col>
                </Row>
            </div>

            <ModalAddCardholder
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </ArchLayout>
    )
}