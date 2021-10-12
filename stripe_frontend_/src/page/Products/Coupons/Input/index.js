import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Select, Radio, Row, Col, Collapse, Typography, Card } from 'antd';

import ArchLayout from 'components/layout/ArchLayout'
import { useSelector, useDispatch } from 'react-redux'
import { cuponsCreate, pricesCreate, productsGetId } from 'redux/actions'
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons'

const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
const { Title, Text } = Typography

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [form] = Form.useForm();
    const id = history.location.id
    const { products: { resProductsGetId }, loading: { loadingGet, loadingCreate } } = useSelector(state => state)
    const [dataCreate, setdataCreate] = useState({})

    useEffect(() => {
        const apiBalance = async () => {
            if (id)
                await dispatch(productsGetId(id))
            setdataCreate(resProductsGetId)
        }
        apiBalance()
        return () => { }
    }, [])

    const handleCreateCuponse = () => {
        form
            .validateFields()
            .then(async values => {
                form.resetFields();
                await dispatch(cuponsCreate(dataCreate))
                history.goBack()
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    const onChange = e => {
        setdataCreate({
            ...dataCreate,
            [e.target.name]: e.target.value
        })
    }

    const onSelectData = (value, type) => {
        setdataCreate({
            ...dataCreate,
            [type]: value
        })
    }

    const rightContent = <div style={{ display: "flex" }}>
        <Button>Cancel</Button>
        <Button
            style={{ marginLeft: 12 }}
            onClick={handleCreateCuponse}
            type="primary"
        >
            Add Coupons
        </Button>
    </div>

    console.log("dataCreate", "loadingGet, loading")

    return (
        <ArchLayout>
            <Card
                title="Create a coupon"
                description="Coupons can be used to discount invoices, subscriptions, or entire customer accounts."
                extra={rightContent}
                form={form}
            >
                <Form
                    layout="vertical"
                    onFinish={handleCreateCuponse}
                    size="middle"
                    requiredMark={"optional"}
                >
                    <Form.Item
                        label="Name"
                        required name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input
                            defaultValue={dataCreate.name}
                            onChange={onChange}
                            name="name"
                            size="middle"
                            placeholder="Frist purchase discount"
                            description="This will appear on customers' receipts and invoices."
                        />
                    </Form.Item>
                    <Form.Item
                        label="ID"
                        name="id"
                        tooltip={{
                            title: 'Optional',
                            icon: <InfoCircleOutlined />
                        }}
                    >
                        <Input
                            defaultValue={dataCreate.id}
                            onChange={onChange}
                            name="id"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Percentage off"
                        name="percent_off"
                        tooltip={{
                            title: 'Optional',
                            icon: <InfoCircleOutlined />
                        }}
                    >
                        <Input
                            defaultValue={dataCreate.percent_off}
                            onChange={onChange}
                            name="percent_off"
                        />
                    </Form.Item>

                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item
                                label="Duration"
                                name="duration"
                                rules={[{ required: true, message: 'Please input the Duration!' }]}
                            >
                                <Select
                                    defaultValue="once"
                                    name="duration"
                                    onChange={(value) => onSelectData(value, "duration")}
                                >
                                    {
                                        ["once", "repeating", "forever"].map((item, i) => (
                                            <Option value={item} key={i}>{item}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            {dataCreate.duration === "repeating" ?
                                <Form.Item
                                    label="Duration In Months"
                                    name="duration_in_months"
                                    rules={[{ required: true, message: 'Please input the duration in Months!' }]}
                                >
                                    <Input
                                        defaultValue={dataCreate.duration_in_months}
                                        onChange={onChange}
                                        name="duration_in_months"
                                        suffix="month"
                                    />
                                </Form.Item>
                                : ""
                            }
                        </Col>
                    </Row>

                    {/* <Text>For subscriptions and customers, this determines how long this coupon will apply once redeemed One-off invoices accept both "once" and "forever" coupons.</Text>


                    <Form.Item
                        label="Redemption limits"
                        name="duration"
                        rules={[{ required: true, message: 'Please input the Duration!' }]}
                    >
                        <Select
                            defaultValue="once"
                            name="duration"
                            onChange={(value) => onChangePrice(value, "duration")}
                        >
                            {
                                ["once", "repeating", "forever"].map((item, i) => (
                                    <Option value={item} key={i}>{item}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item> */}


                </Form>
            </Card>
        </ArchLayout >
    )
}