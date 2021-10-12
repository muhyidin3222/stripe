import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Form, Input, Button, Collapse, Row, Select, Radio, Col, Typography } from 'antd';
import { pricesCreate } from 'redux/actions'
import { PlusOutlined } from '@ant-design/icons'

const { Title } = Typography
const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;

const tiersModeData = [
    {
        value: "graduated",
        title: "Graduated Price"
    },
    {
        value: "volume",
        title: "Volume Price"
    },
]


const aggregateUsageData = [
    {
        title: "using the last usage record reported within a period",
        value: "last_during_period",
    },
    {
        title: "summing up all usage during a period",
        value: "sum",
    },
    {
        title: "maximum usage during a period",
        value: "max",
    },
    {
        title: "using the last usage record ever",
        value: "last_ever",
    },
]


export default (props) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const { loading: { loadingUpdate, loadingCreate } } = useSelector(state => state)
    const { setShowModal, showModal, id, product, addPriceModal } = props

    const [priceData, setPriceData] = useState({
        currency: "usd",
        product: product,
        unit_amount: "",
        type: "recurring",
        tiers_mode: "graduated",
        interval: "month"
    })

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleCreateProduct = () => {
        form
            .validateFields()
            .then(async values => {
                form.resetFields();
                let dataCreate = {
                    currency: priceData.currency,
                    product: priceData.product,
                    unit_amount: priceData.unit_amount,
                    tiers_mode: priceData.tiers_mode
                }
                if (priceData.type === "recurring") {
                    dataCreate.recurring = {
                        interval: priceData.interval,
                        aggregate_usage: priceData.aggregate_usage
                    }
                }
                await dispatch(pricesCreate(dataCreate))
                setShowModal(false);
                addPriceModal()
                setPriceData({
                    currency: "usd",
                    product: product,
                    unit_amount: "",
                    type: "recurring",
                    tiers_mode: "graduated",
                    interval: "month"
                })
            }).catch(info => {
                console.log('Validate Failed:', info);
            })
    }

    const onChangePrice = (value, type) => {
        setPriceData({
            ...priceData,
            [type]: value
        })
    }

    const onChangeAmountPrice = (e, index) => {
        setPriceData({
            ...priceData,
            [e.target.name]: e.target.value
        })
    }
    // console.log(loadingUpdate)
    return (
        <Modal
            title="Add Price"
            visible={showModal}
            onOk={handleCreateProduct}
            onCancel={handleCancel}
            loading={loadingCreate}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loadingUpdate} onClick={handleCreateProduct}>
                    {id ? "Edit" : "Add"}
                </Button>,
            ]}
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
                    defaultValue={priceData.tiers_mode}
                    value={priceData.tiers_mode}
                    rules={[{ required: true, message: 'Please input the Pricing model!' }]}
                >
                    <Select
                        name="tiers_mode"
                        defaultValue={priceData.tiers_mode}
                        value={priceData.tiers_mode}
                        onChange={(value) => onChangePrice(value, "tiers_mode")}
                    >
                        {
                            tiersModeData.map((item, i) => (
                                <Option value={item.value} key={i}>{item.title}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="unit_amount"
                    defaultValue={priceData?.unit_amount || ""}
                    value={priceData?.unit_amount || ""}
                    rules={[{ required: true, message: 'Please input the Pricing!' }]}
                >
                    <Input
                        defaultValue={priceData?.unit_amount || ""}
                        value={priceData?.unit_amount || ""}
                        onChange={e => onChangeAmountPrice(e)}
                        name="unit_amount"
                    />
                </Form.Item>
                <Form.Item
                    name="type"
                    defaultValue={priceData.type}
                    value={priceData.type}
                >
                    <Radio.Group
                        defaultValue={priceData.type}
                        value={priceData.type}
                        onChange={(value) => onChangePrice(value, "type")}
                        name="type"
                    >
                        <Radio.Button value="recurring">Recurring</Radio.Button>
                        <Radio.Button value="one-time">One TIme</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Billing priode"
                    name="interval"
                    defaultValue={priceData.interval}
                    value={priceData.interval}
                >
                    <Select
                        defaultValue={priceData.interval}
                        value={priceData.interval}
                        name="interval"
                        onChange={(value) => onChangePrice(value, "interval")}

                    >
                        {
                            ["day", "week", "month", "year"].map((item, i) => (
                                <Option value={item} key={i}>{item}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};