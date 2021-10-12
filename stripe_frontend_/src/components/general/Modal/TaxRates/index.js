import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Form, Input, Button, Row, Select, Col, Typography, Card } from 'antd';
import { texRatesUpdate, texRatesCreate, texRatesGetId } from 'redux/actions'
import countries from 'local/countries.json';
import { } from 'redux/actions'

const { Option } = Select;

const typeDiplay = ["Sales tax", "VAT", "GST", "Custom"]

export default (props) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const { loading: { loadingUpdate, loadingCreate, loadingGet }, products: { resTexRateGetId } } = useSelector(state => state)
    const { setShowModal, showModal, getTaxRates } = props

    const [data, setData] = useState({
        inclusive: true,
        display_name: "Sales tax"
    })

    useEffect(() => {
        if (showModal.id)
            dispatch(texRatesGetId(showModal.id))
        return () => {
        }
    }, [showModal.id])


    useEffect(() => {
        if (resTexRateGetId)
            setData(resTexRateGetId)
        return () => {
        }
    }, [resTexRateGetId])

    const handleCancel = () => {
        setShowModal({
            modal: false,
            id: null
        });
    };

    const handleCreateProduct = () => {
        form
            .validateFields()
            .then(async values => {
                form.resetFields();
                let dataCreate = {
                    description: data.description,
                    display_name: data.display_name,
                    country: data.country
                }
                let resApi
                if (showModal.id) {
                    dataCreate.id = showModal.id
                    resApi = await dispatch(texRatesUpdate(dataCreate))
                } else {
                    dataCreate.inclusive = showModal.inclusive
                    dataCreate.percentage = showModal.percentage
                    resApi = await dispatch(texRatesCreate(dataCreate))
                }
                if (resApi) {
                    handleCancel()
                    getTaxRates()
                    setData({
                        description: "",
                        inclusive: true,
                        display_name: "Sales tax"
                    })
                }
            }).catch(info => {
                console.log('Validate Failed:', info);
            })
    }

    const onChange = (value, type) => {
        if (type === "inclusive") {
            setData({
                ...data,
                [type]: value === "Exclusive" ? true : false
            })
        } else {
            setData({
                ...data,
                [type]: value
            })
        }
    }
    console.log(data)
    console.log(data?.description, data?.percentage)
    return (
        <Modal
            title="Add tax rate"
            visible={showModal.modal}
            onOk={handleCreateProduct}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loadingUpdate || loadingCreate || loadingGet} onClick={handleCreateProduct}>
                    {showModal.id ? "Edit" : "Add"}
                </Button>
            ]}
        >
            <Card
                className="card-tax-rate"
                bordered={false}
                loading={showModal.id ? loadingGet : false}
                style={{ padding: 0 }}
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleCreateProduct}
                    size="middle"
                    requiredMark={"optional"}
                >
                    <Form.Item
                        label="Pricing model"
                        name="graduated"
                        defaultValue={data?.display_name}
                        value={data?.display_name}
                    >
                        <Col>
                            <Select
                                name="Type"
                                defaultValue={data?.display_name}
                                value={data?.display_name}
                                onChange={(value) => onChange(value, "display_name")}
                            >
                                {
                                    typeDiplay.map((item, i) => (
                                        <Option value={item} key={i}>{item}</Option>
                                    ))
                                }
                            </Select>
                        </Col>
                    </Form.Item>
                    <Form.Item
                        label="Country"
                        name="country"
                        defaultValue={data?.country || ""}
                        value={data?.country || ""}
                    >
                        <Col>
                            <Select
                                showSearch
                                name="country"
                                value={data?.country || ""}
                                defaultValue={data?.country || ""}
                                onChange={(value) => onChange(value, "country")}
                                optionFilterProp="children"
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {
                                    countries.map((value, index) => (
                                        <Option value={value.iso2} key={index}>{value.name}</Option>
                                    ))
                                }
                            </Select>
                        </Col>
                    </Form.Item>
                    {showModal.id ? "" : <Form.Item
                        name="percentage"
                        label="Rate"
                        rules={[{ required: true, message: 'Please input the Rate!' }]}
                        defaultValue={data?.inclusive ? "Exclusive" : "Inclusive"}
                        value={data?.inclusive ? "Exclusive" : "Inclusive"}
                    >
                        <Row>
                            <Col>
                                <Input
                                    style={{ maxWidth: 120, marginRight: 10 }}
                                    defaultValue={data?.percentage || ""}
                                    value={data?.percentage || ""}
                                    onChange={e => onChange(e.target.value, "percentage")}
                                    name="percentage"
                                    addonAfter={"%"}
                                    className="tax_rate_input"
                                />
                            </Col>
                            <Col>
                                <Select
                                    name="inclusive"
                                    size="middle"
                                    defaultValue={data?.inclusive ? "Exclusive" : "Inclusive"}
                                    value={data?.inclusive ? "Exclusive" : "Inclusive"}
                                    onChange={(value) => onChange(value, "inclusive")}
                                    optionFilterProp="children"
                                >
                                    {
                                        ["Inclusive", "Exclusive"].map((value, index) => (
                                            <Option value={value} key={index}>{value}</Option>
                                        ))
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </Form.Item>}

                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Col>
                            <Input
                                defaultValue={data?.description || ""}
                                value={data?.description || ""}
                                onChange={e => onChange(e.target.value, "description")}
                                name="description"
                            />
                        </Col>
                    </Form.Item>
                </Form>
            </Card>
        </Modal>
    );
};