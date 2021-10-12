import React, { useState, useEffect } from 'react';
import ArchLayout from 'components/layout/ArchLayout'
import { useSelector, useDispatch } from 'react-redux'
// import { useHistory } from 'react-router-dom'
import { Modal, Form, Input, Button, Select, Checkbox, Row, Col, Collapse, Typography } from 'antd';
import { accountListDispatch } from 'redux/actions'
import { InfoCircleOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
const { Title } = Typography


export default () => {
    const { loading: { loadingGet }, account: { resAccountList } } = useSelector(state => state)
    const dispatch = useDispatch()
    const [limit, setLimit] = useState(10);
    const [dataCreate, setdataCreate] = useState({
        name: "",
        description: "",
        email: ""
    })

    useEffect(() => {
        const apiGet = () => {
            dispatch(accountListDispatch({
                limit
            }))
        }
        apiGet()
        return () => {

        }
    }, [])

    const submit = async (e) => {
        // await dispatch(customersCreateDispatch(dataCreate))
    }

    const onChange = e => {
        if (e.target.name === "timezone") {
            setdataCreate({
                ...dataCreate,
                dashboard: {
                    [e.target.name]: e.target.value
                }
            })
        } else {
            setdataCreate({
                ...dataCreate,

            })
        }
    }

    function handleChange (value) {
        console.log(`selected ${value}`);
    }

    console.log(resAccountList)
    return (
        <ArchLayout>
            <Row gutter={24}>
                <Col span={12} style={{ padding: 30, background: '#ffffff' }}>
                    <Title level={3}>Account settings</Title>
                    <Form
                        layout="vertical"
                        onFinish={submit}
                        size="small"
                        requiredMark={"optional"}
                    >
                        <Form.Item label="Account name" required name="name">
                            <Input
                                defaultValue={dataCreate.name}
                                onChange={onChange}
                                name="name"
                                size="small"
                                placeholder="Jane Doe"
                            />
                        </Form.Item>
                        <Form.Item label="Country" required name="email">
                            <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                                <Option value="jack">US</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Phone" required name="phone">
                            <Input
                                defaultValue={dataCreate.phone}
                                onChange={onChange}
                                name="phone"
                                size="small"
                            />
                        </Form.Item>
                        <Form.Item label="Time zone" required name="description">
                            <Input
                                defaultValue={dataCreate?.dashboard?.timezone}
                                onChange={onChange}
                                name="timezone"
                                size="small"
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={12} style={{ padding: 30, background: '#ffffff' }}>
                    <Title level={3}>Public usiness information</Title>
                    <div>This information helps customers recognize your business and understand your products and terms of service. Your support information may be visible in payment statements, invoices, and receipts.</div>
                    <Form
                        layout="vertical"
                        onFinish={submit}
                        size="small"
                        requiredMark={"optional"}
                    >
                        <Form.Item label="Public business name" required name="name">
                            <Input
                                defaultValue={dataCreate.name}
                                onChange={onChange}
                                name="name"
                                size="small"
                            />
                        </Form.Item>
                        <Form.Item label="Support email" required name="support_email">
                            <Input
                                defaultValue={dataCreate.support_email}
                                onChange={onChange}
                                name="support_email"
                                size="small"
                            />
                        </Form.Item>
                        <Form.Item label="Support phone number" required name="support_phone">
                            <Input
                                defaultValue={dataCreate.support_phone}
                                onChange={onChange}
                                name="support_phone"
                                size="small"
                            />
                        </Form.Item>
                        <Form.Item label="Support address" required name="support_address">
                            <Input
                                defaultValue={dataCreate.support_address}
                                onChange={onChange}
                                name="support_address"
                                size="small"
                            />
                        </Form.Item>
                        <Form.Item label="Product Description" required name="product_description">
                            <Input
                                defaultValue={dataCreate.product_description}
                                onChange={onChange}
                                name="product_description"
                                size="small"
                            />
                        </Form.Item>
                        <Form.Item label="Business website" required name="support_url">
                            <Input
                                defaultValue={dataCreate.support_url}
                                onChange={onChange}
                                name="support_url"
                                size="small"
                            />
                        </Form.Item>
                        <Form.Item label="Support website" required name="url">
                            <Input
                                defaultValue={dataCreate.url}
                                onChange={onChange}
                                name="url"
                                size="small"
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </ArchLayout>
    )
}