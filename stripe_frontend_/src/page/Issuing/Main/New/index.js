

import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cardCreateDispatch } from 'redux/actions'
import ArchLayout from 'components/layout/ArchLayout'
import { Button, Tabs, Card, Typography, Radio, Col, Row, Spin, Space } from 'antd'
import scss from 'assets/scss/productMainCreate.module.scss'
import AutoCompleteCardholder from 'components/general/Input/AutoCompleteCardholder'
import DeleteIcon from '@material-ui/icons/Delete';

const { Title, Text } = Typography

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { issuing: { resDisputeGetAll }, loading: { loadingGet, loadingCreate } } = useSelector(state => state)
    const [limit, setLimit] = useState(10);
    // const [page, setPage] = useState(0);
    const [dataUser, setDataUser] = useState({})
    const [selectTypeCard, setSelectTypeCard] = useState("")
    const [activeCard, setActiveCard] = useState(false)
    const checkSave = selectTypeCard.length && dataUser?.id
    const onSelect = (e) => {
        setSelectTypeCard(e.target.name)
    }
    const onSelectCard = (value) => {
        setDataUser(value)
    }
    const onSave = async () => {
        if (checkSave) {
            const resCreat = await dispatch(cardCreateDispatch({
                cardholder: dataUser?.id,
                currency: "usd",
                type: selectTypeCard,
                status: activeCard ? "active" : "inactive"
            }))
            if (resCreat)
                history.goBack()
        }
    }
    return (
        <ArchLayout>
            <Card
                title={<Title level={3}>Create a card</Title>}
                style={{ width: "100%" }}
                actions={[
                    <div style={{ justifyContent: "flex-end", display: "flex", paddingRight: 30 }}>
                        <Button size="small" style={{ justifyContent: "flex-end", display: "flex", marginRight: 15 }}>Cancel</Button>
                        <Button size="small" type="primary" onClick={onSave} disabled={!checkSave} >Save</Button>
                    </div>
                ]}
            >
                {
                    !loadingCreate ?
                        <div>
                            <AutoCompleteCardholder
                                onSelect={onSelectCard}
                            />
                            {
                                dataUser?.name ?
                                    <Card
                                        size="lage"
                                        hoverable={true}
                                        style={{ maxWidth: 300, marginTop: 30 }}
                                    >
                                        <Row gutter={24}>
                                            <Col span={18}>
                                                <div className={scss.title}>{dataUser?.name}</div>
                                                <div className={scss.dec}>{dataUser?.email || "no email"}</div>
                                            </Col>
                                            <Col span={6}>
                                                <Button
                                                    onClick={() => setDataUser({})}
                                                    type="link"
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                    : ""
                            }

                            <Row style={{ marginTop: 30 }}>
                                <Col>
                                    <Card
                                        size="small"
                                        hoverable={true}
                                    >
                                        <Radio
                                            checked={selectTypeCard === "virtual"}
                                            value="virtual"
                                            name="virtual"
                                            size="lage"
                                            onChange={onSelect}
                                        >
                                            <div style={{ marginLeft: 10 }}>
                                                <Title level={5} >Virtual</Title>
                                                <Text level={4}>No Addintional details are needed.</Text>
                                            </div>
                                        </Radio>
                                    </Card>
                                </Col>
                                <Col style={{ marginLeft: 30 }}>
                                    <Card
                                        size="small"
                                        hoverable={true}
                                    >
                                        <Radio
                                            checked={selectTypeCard === "physical"}
                                            value="physical"
                                            name="physical"
                                            size="lage"
                                            onChange={onSelect}
                                        >
                                            <div style={{ marginLeft: 10 }}>
                                                <Title level={5} >Physical</Title>
                                                <Text level={4}>Shipping detail oare needed.</Text>
                                            </div>
                                        </Radio>
                                    </Card></Col>
                            </Row>
                            {
                                selectTypeCard.length ?
                                    <Radio
                                        checked={activeCard}
                                        name="Status"
                                        size="lage"
                                        className={scss.radioStatus}
                                        style={{ marginLeft: 10 }}
                                        onChange={() => setActiveCard(!activeCard)}
                                    >
                                        <div>
                                            <Title level={5} >Active Card</Title>
                                            <Text>Shipping detail oare needed.</Text>
                                        </div>
                                    </Radio>
                                    : ""
                            }
                        </div>
                        : <Space size="middle">
                            <Spin size="small" />
                            <Spin />
                            <Spin size="large" />
                        </Space>
                }
            </Card>
        </ArchLayout>
    )
}