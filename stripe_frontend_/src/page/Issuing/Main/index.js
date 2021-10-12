import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';

import { cardholderGetAllDispatch, cardGetAllDispatch } from 'redux/actions'
import moment from 'moment';
import ArchLayout from 'components/layout/ArchLayout'
import CardholderDetail from 'components/general/Card/CardDetail'
import Tabs from 'components/general/Tab'
import Color from 'config/Color'
import { Table, Typography, Button, Skeleton, List, Col, Row, Menu } from 'antd';
import { PlusOutlined, FilterOutlined, ExportOutlined } from '@ant-design/icons'

import scssConfig from 'assets/scss/config.module.scss'
import scss from 'assets/scss/issuingMainCreate.module.scss'
import { customersGetIdService } from 'services'

const { gray } = Color.Border
const { Title } = Typography
const { SubMenu } = Menu;

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { issuing: { resCardGetAll }, loading: { loadingGet } } = useSelector(state => state)
    const [limit, setLimit] = useState(30);
    const [page, setPage] = useState(0);
    const [activeItem, setActiveItem] = useState({})
    // const [activeMenu, setActiveMenu] = useState(resCardGetAll?.data[0])

    useEffect(() => {
        const apiBalance = async () => {
            await dispatch(cardGetAllDispatch({ limit: limit }))

        }
        apiBalance()
        return () => { }
    }, [])

    useEffect(() => {
        if (resCardGetAll?.data?.length)
            setActiveItem(resCardGetAll?.data[0])
        return () => { }
    }, [resCardGetAll?.data?.length])

    const handleChangeActive = (newValue) => {
        setActiveItem(newValue)
    }

    const handleInfiniteOnLoad = async () => {
        if (resCardGetAll.has_more)
            await dispatch(cardholderGetAllDispatch({
                limit: limit + 10
            }))
    }

    // console.log(activeItem, "activeItem")
    return (
        <ArchLayout>
            <div className={scss.mainContainer}>
                <div className={scss.contentTop}>
                    <div className={scss.contentLeft}>
                        <div className={`${scss.titleXl}  ${scss.paddingBottom}`} >Cards</div>
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
                            onClick={() => history.push("/issuing/new-card")}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: 10 }}
                        >New card</Button>
                    </div>
                </div>
                <Row gutter={24}>
                    <Col span={8} className={scss.demoInfiniteContainer} style={{ padding: 0 }}>
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={handleInfiniteOnLoad}
                            hasMore={!loadingGet && !resCardGetAll.has_more}
                            useWindow={false}
                        >
                            <List
                                className={scss.contentMiddle}
                                loading={loadingGet}
                                itemLayout="horizontal"
                                loadMore={true}
                                dataSource={resCardGetAll.data}
                                renderItem={item => (
                                    <List.Item className={`${scss.listItem}`}>
                                        <Skeleton title={false} loading={item.loading} active>
                                            <List.Item.Meta
                                                title={
                                                    <div className={`${scss.itemMeta} ${activeItem.id === item.id && scss.activeItem}`} onClick={() => handleChangeActive(item)}>
                                                        <div>
                                                            {item?.cardholder?.name}
                                                        </div>
                                                        <div>
                                                            ****{item.last4}
                                                        </div>
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
        </ArchLayout>
    )
}