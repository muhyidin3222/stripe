import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Select, Avatar, Row, Col, Collapse, Typography } from 'antd';
import { PlusOutlined, InfoCircleOutlined, CloseCircleOutlined, DollarOutlined } from '@ant-design/icons'

import ContainterInput from 'components/general/Input/ContainterInput'
import { useSelector, useDispatch } from 'react-redux'
import { productsCreate, productsGetId } from 'redux/actions'

import Color from 'config/Color'
import Upload from 'components/general/Upload';
import AutoCompleteCustomer from 'components/general/Input/AutoCompleteCustomer'
import { tooltip } from 'components/general/Help'

const { gray } = Color.Border
const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
const { Title } = Typography

export default () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const id = history.location.id
    const { balance: { balanceRetrieveData }, products: { resProductsGetId }, loading: { loadingGet }, loading } = useSelector(state => state)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [metadata, setMetadata] = useState([
        { key: "", value: "" }
    ])
    const [dataCreate, setdataCreate] = useState({
        name: "",
        description: "",
        statement_descriptor: "",
        // unit_label: "",
        // metadata: "",
    })

    useEffect(() => {
        const apiBalance = async () => {
            if (id)
                await dispatch(productsGetId(id))
            setdataCreate(resProductsGetId)
        }
        apiBalance()

        return () => {
        }
    }, [])

    const handleCreateProduct = () => {
        dispatch(productsCreate(dataCreate))
        history.push("/products")
    }

    const onChange = e => {
        // console.log(e.target.value)
        setdataCreate({
            ...dataCreate,
            [e.target.name]: e.target.value
        })
    }

    const addMoreMetadata = () => {
        const objectval = {
            key: "",
            value: ""
        }
        setMetadata([...metadata, objectval])
    }

    // const onChangMetadata = (e) => {
    //     setdataCreate({
    //         ...dataCreate,
    //         [e.target.name]: e.target.value
    //     })
    // }


    const submit = async (e) => {
        const dataPushSkill = []
        // dataList.map(item => skillData.map(val => val === item.name && dataPushSkill.push(item.id)))
        // data.skill = dataPushSkill.toString()
        // if (paymentTipsData) {
        //     delete data.paymentTipsData
        // }
        // const res = await dispatch(updateUser(data))
        // if (res) {
        //     history.push("/user/list")
        // }
    }

    const addPrice = () => {

    }


    const totalAmount = balanceRetrieveData?.available?.reduce((t, value) => t + value?.amount || 0).amount || 0 + balanceRetrieveData?.pending?.reduce((t, value) => t + value?.amount || 0).amount || 0
    const rightContent = <div style={{ display: "flex" }}>
        <Button
        // style={margin}
        >
            Save and add more
        </Button>
        <Button
            style={{ marginLeft: 12 }}
            onClick={handleCreateProduct}
            type="primary"
        >
            Save product
        </Button>
    </div>
    console.log(metadata, "loadingGet, loading")
    return (
        <ContainterInput
            titleRight="Add a Payment"
            rightContent={rightContent}
            onClick={() => history.push("/payment")}
        >
            <Title level={2}>Payment information</Title>
            <Title level={5} style={{ marginBottom: 12 }}>Payment details</Title>
            <Form
                layout="vertical"
                onFinish={submit}
                size="middle"
                requiredMark={"optional"}
            >
                <Form.Item label="Amount" required name="amount">
                    <Input
                        prefix={<DollarOutlined className="site-form-item-icon" />}
                        defaultValue={dataCreate.name}
                        onChange={onChange}
                        name="amount"
                        size="middle"
                    />
                </Form.Item>
                <Form.Item
                    label="Customer"
                    name="customer"
                    tooltip={tooltip}
                >
                    <AutoCompleteCustomer />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    tooltip={tooltip}
                >
                    <Input
                        defaultValue={dataCreate.description}
                        onChange={onChange}
                        name="description"
                    />
                </Form.Item>
                <Form.Item
                    label="Statement descriptor"
                    name="statement_descriptor"
                    tooltip={tooltip}
                >
                    <Input
                        defaultValue={dataCreate.statement_descriptor}
                        onChange={onChange}
                        name="statement_descriptor"
                    />
                </Form.Item>
                <Collapse defaultActiveKey={['1']} ghost>
                    <Panel header="Additional options" key="1" type="primary" style={{ padding: 0 }}>
                        <Form.Item
                            label="Statement Descriptor"
                            name="statement_descriptor"
                            tooltip={{
                                title: 'Optional',
                                icon: <InfoCircleOutlined />
                            }}
                        >
                            <Input
                                defaultValue={dataCreate.statement_descriptor}
                                onChange={onChange}
                                name="statement_descriptor"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Unit Label"
                            name="unit_label"
                            tooltip={{
                                title: 'Optional',
                                icon: <InfoCircleOutlined />
                            }}
                        >
                            <Input
                                defaultValue={dataCreate.unit_label}
                                onChange={onChange}
                                name="unit_label"
                            />
                        </Form.Item>

                        {metadata.length ?
                            <Form.Item
                                label="Metadata"
                                tooltip={{
                                    title: 'Optional',
                                    icon: <InfoCircleOutlined />
                                }}
                            >
                                {
                                    metadata.map((value, index) => {
                                        const onChangMetadata = (e) => {
                                            metadata[index] = {
                                                ...metadata[index],
                                                [e.target.name]: e.target.value
                                            }
                                            setMetadata(metadata)
                                        }
                                        return (
                                            <Row gutter={16} style={{ marginTop: 6 }} >
                                                <Col span={8}>
                                                    <Input
                                                        defaultValue={value.key}
                                                        onChange={onChangMetadata}
                                                        name="key"
                                                        placeholder="key"
                                                    />
                                                </Col>
                                                <Col span={8}>
                                                    <Input
                                                        defaultValue={value.value}
                                                        onChange={onChangMetadata}
                                                        name="value"
                                                        placeholder="value"
                                                    />
                                                </Col>
                                                <Button
                                                    icon={<CloseCircleOutlined />}
                                                    onClick={() => {
                                                        setMetadata(metadata.filter((value, i) => i !== index))
                                                    }}
                                                />
                                            </Row>
                                        )
                                    })
                                }
                            </Form.Item>
                            : ""}
                        <Button
                            size="middle"
                            onClick={addMoreMetadata}
                            icon={<PlusOutlined />}
                            type="link"
                        >
                            Add more metadata
                        </Button>
                        {/* <Form.Item label="Metadata" name="metadata">
                                    <Input
                                        defaultValue={dataCreate.metadata}
                                        onChange={onChange}
                                        name="metadata"
                                    />
                                </Form.Item> */}
                    </Panel>
                </Collapse>

                <Title level={2}>Price information</Title>
                <Title level={5} style={{ marginBottom: 12 }}>Pricing details</Title>

                <Button
                    size="middle"
                    onClick={addPrice}
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ marginLeft: 10 }}
                >
                    Add another price
                </Button>
            </Form>
        </ContainterInput>
    )
}