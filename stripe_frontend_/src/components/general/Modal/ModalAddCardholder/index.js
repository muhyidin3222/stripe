import React, { useState, useCallback, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// import { useHistory } from 'react-router-dom'
import { Modal, Form, Input, Button, Radio, Row, Col, DatePicker, Upload } from 'antd';
import moment from 'moment'
import { cardholderCreateDispatch } from 'redux/actions'
// import { UploadOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons'
import Country from 'components/general/Select/Country'
import States from 'components/general/Select/States'

const dateFormat = 'YYYYY/MM/DD';

export default (props) => {
    const dispatch = useDispatch()
    const { loading: { loadingCreate }, error: { errorCreate } } = useSelector(state => state)
    const { setShowModal, showModal } = props
    const [dataCreate, setdataCreate] = useState({
        billing: {
            address: {
                country: "US"
            }
        },
        type: "individual"
    })
    const handleOk = () => {
        submit()
    };
    const handleCancel = () => {
        setShowModal(false);
    };
    const submit = async (e) => {
        const res = await dispatch(cardholderCreateDispatch(dataCreate))
        if (res) {
            handleCancel()
            setdataCreate({})
        }
    }
    const onChange = e => {
        setdataCreate({
            ...dataCreate,
            [e.target.name]: e.target.value
        })
    }
    const onChangeIndividual = e => {
        console.log(e)
        setdataCreate({
            ...dataCreate,
            individual: {
                ...dataCreate?.individual,
                [e.target.name]: e.target.value
            }
        })
    }
    const onChangeAddress = e => {
        console.log(e)
        setdataCreate({
            ...dataCreate,
            billing: {
                address: {
                    ...dataCreate?.billing?.address,
                    [e.target.name]: e.target.value
                }
            }
        })
    }
    const onChangeDate = e => {
        if (e) {
            console.log(e.format("yyyy"))
            setdataCreate({
                ...dataCreate,
                individual: {
                    ...dataCreate?.individual,
                    dob: {
                        year: e.format("YYYY"),
                        month: e.format("MM"),
                        day: e.format("DD"),
                    }
                }
            })
        } else {
            setdataCreate({
                ...dataCreate,
                individual: {
                    ...dataCreate?.individual,
                    dob: {}
                }
            })
        }
    }
    const dob = `${dataCreate?.individual?.dob?.year}/${dataCreate?.individual?.dob?.month}/${dataCreate?.individual?.dob?.day}`
    console.log(dataCreate, dob, errorCreate)
    return (
        <Modal
            title="Create cardholder"
            visible={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loadingCreate} onClick={handleOk}>
                    Submit
                </Button>,
            ]}
        >

            <Form
                layout="vertical"
                onFinish={submit}
                requiredMark={"optional"}
            >
                <Form.Item
                    required
                    name="type"
                    label="Cardholder type"
                    tooltip="Changes the information we collect for cardholder watchlist screenings."
                >
                    <Radio
                        value="individual"
                        name="type"
                        onChange={onChange}
                        checked={dataCreate?.type === "individual"}
                    >Individual</Radio>
                    <Radio
                        value="company"
                        name="type"
                        onChange={onChange}
                        checked={dataCreate?.type === "company"}
                    >Company</Radio>
                </Form.Item>
                <Form.Item
                    label="Name printed on card"
                    required
                    name="name"
                    tooltip="Cannot be changed."
                >
                    <Input
                        size="small"
                        defaultValue={dataCreate.name}
                        onChange={onChange}
                        name="name"
                        placeholder="Jane Doe"
                    />
                </Form.Item>
                <Form.Item label="Billing address" tooltip="Billing address for all cards issued to this cardholder." required>
                    <Country
                        onChange={value => setdataCreate({ ...dataCreate, billing: { address: { ...dataCreate?.billing?.address, country: value } } })}
                        country={dataCreate?.billing?.address?.country}
                        style={{ marginTop: 10 }}
                    />
                    <Input
                        size="small"
                        defaultValue={dataCreate?.billing?.address?.line1}
                        onChange={onChangeAddress}
                        name="line1"
                        style={{ marginTop: 10 }}
                        placeholder="Address line 1"
                    />
                    <Input
                        size="small"
                        defaultValue={dataCreate?.billing?.address?.line2}
                        onChange={onChangeAddress}
                        style={{ marginTop: 10 }}
                        name="line2"
                        placeholder="Address line 2"
                    />
                    <Input
                        size="small"
                        defaultValue={dataCreate?.billing?.address?.city}
                        onChange={onChangeAddress}
                        style={{ marginTop: 10 }}
                        name="city"
                        placeholder="City"
                    />
                    <States
                        style={{ marginTop: 10 }}
                        country={dataCreate?.billing?.address?.country}
                        onChange={value => setdataCreate({ ...dataCreate, billing: { address: { ...dataCreate?.billing?.address, state: value } } })}
                        state={dataCreate?.billing?.address?.state || "State"}
                    />
                    <Input
                        size="small"
                        defaultValue={dataCreate?.billing?.address?.postal_code}
                        onChange={onChangeAddress}
                        style={{ marginTop: 10 }}
                        name="postal_code"
                        placeholder="ZIP"
                    />
                </Form.Item>

                {
                    dataCreate.type === "individual" ?
                        <React.Fragment>
                            <Form.Item label="Cardholder legal name" required>
                                <Row
                                    gutter={24}
                                    style={{ marginTop: 10 }}
                                >
                                    <Col span={12}>
                                        <Input
                                            size="small"
                                            defaultValue={dataCreate?.individual?.first_name}
                                            onChange={onChangeIndividual}
                                            name="first_name"
                                            placeholder="frist name"
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Input
                                            size="small"
                                            defaultValue={dataCreate?.individual?.last_name}
                                            onChange={onChangeIndividual}
                                            placeholder="last name"
                                            name="last_name"
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item
                                label="Date of birth"
                                style={{ marginTop: 10 }}
                                tooltip="This helps confirm the cardholder identity."
                            >
                                <DatePicker
                                    // value={dataCreate?.individual?.dob?.year ? moment(dob).format(dateFormat) : ""}
                                    format={dateFormat}
                                    placeholder={dateFormat}
                                    onChange={onChangeDate}
                                    size="small"
                                />
                            </Form.Item>

                            {/* <Form.Item
                                label="Government-issued photo ID"
                                name="name"
                                tooltip="This helps confirm the cardholder identity."
                            >
                                <Row>
                                    <Col>
                                        <Upload
                                            defaultValue={dataCreate.first_name}
                                            onChange={onChange}
                                            name="first_name"
                                        >
                                            <Button icon={<UploadOutlined />}>Upload front</Button>
                                        </Upload>
                                        <Upload
                                            defaultValue={dataCreate.first_name}
                                            onChange={onChange}
                                            name="first_name"
                                        />
                                    </Col>
                                    <Col>
                                        <Upload
                                            defaultValue={dataCreate.last_name}
                                            onChange={onChange}
                                            name="last_name"
                                        />
                                    </Col>
                                </Row>
                            </Form.Item> */}

                            <Form.Item
                                label="Email"
                                name="email"
                                tooltip="Some features like digital wallets require a valid email or phone number."
                            >
                                <Input
                                    size="small"
                                    defaultValue={dataCreate?.email}
                                    onChange={onChange}
                                    name="email"
                                    type="email"
                                    placeholder="Janne.rosen@example.com"
                                />
                            </Form.Item>
                        </React.Fragment>
                        : ""
                }
                <Form.Item
                    label="Phone number"
                    name="phone_number"
                    tooltip="Some features like digital wallets require a valid email or phone number."
                >
                    <Input
                        size="small"
                        defaultValue={dataCreate?.phone_number}
                        onChange={onChange}
                        name="phone_number"
                        placeholder="+62 23423-23423"
                    />

                    {/* <PhoneInput
                        country={dataCreate?.billing?.address?.country || "us"}
                        value={dataCreate?.phone_number}
                        name="phone_number"
                        onChange={onChange}
                    /> */}

                    {/* <PhoneInput
                        value={dataCreate?.phone_number}
                        name="phone_number"
                        onChange={onChange}
                        // inputComponent={PhoneInputComponent}
                    /> */}
                </Form.Item>


            </Form>
        </Modal>
    );
};