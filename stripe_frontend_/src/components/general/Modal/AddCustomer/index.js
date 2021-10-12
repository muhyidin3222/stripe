import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// import { useHistory } from 'react-router-dom'
import { Modal, Form, Input, Button, Select, Checkbox, Row, Col, Collapse, Typography, message } from 'antd';
import { customersCreateDispatch, cardholderGetAllDispatch } from 'redux/actions'
import { InfoCircleOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons'
import SelectCountry from 'components/general/Select/Country'
import PhoneNumber from 'components/general/Input/PhoneNumber'
import countries from 'local/countries.json';

const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
const { Title } = Typography

const taxExemptData = [
    { name: "None", value: "none" },
    { name: "Exempt", value: "exempt" },
    { name: "Reverse", value: "reverse" }
]

const taxIdData = ["ae_trn", "au_abn", "au_arn", "br_cnpj", "br_cpf", "ca_bn", "ca_gst_hst", "ca_pst_bc", "ca_pst_mb", "ca_pst_sk", "ca_qst", "ch_vat", "cl_tin", "es_cif", "eu_vat", "gb_vat", "hk_br", "id_npwp", "il_vat", "in_gst", "jp_cn", "jp_rn", "kr_brn", "li_uid", "mx_rfc", "my_frp", "my_itn", "my_sst", "no_vat", "nz_gst", "ru_inn", "ru_kpp", "sa_vat", "sg_gst", "sg_uen", "th_vat", "tw_vat", "us_ein", "za_vat"]


export default (props) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const { loading: { loadingCreate } } = useSelector(state => state)
    const { setShowModal, showModal, getCustomer } = props
    const [dataCreate, setdataCreate] = useState({
        name: "",
        description: "",
        email: ""
    })
    const [billingInfromation, setBillingInfromation] = useState({
        name: "",
        description: "",
        email: ""
    })
    const [metadata, setMetadata] = useState([
        { key: "", value: "" }
    ])
    const [taxId, setTaxId] = useState([
        { key: "", value: "" }
    ])
    const [sameAccount, setSameAccount] = useState(true)
    const [sameBilling, setSameBilling] = useState(true)

    const [addMoreRecipients, setAddMoreRecipients] = useState(false)

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields();
                submit()
                if (getCustomer)
                    getCustomer()
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const submit = async (e) => {
        await dispatch(customersCreateDispatch(dataCreate))
        dispatch(cardholderGetAllDispatch({ limit: 3 }))
        handleCancel()
    }

    const onChange = e => {
        setdataCreate({
            ...dataCreate,
            [e.target.name]: e.target.value
        })
    }

    const onChangeBillingInfromation = e => {
        setBillingInfromation({
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
    // cus_K8wub4tzVAPqfX
    console.log(loadingCreate)

    return (
        <Modal
            title="Add customer"
            visible={showModal}
            onCancel={handleCancel}
            okText="Add Customer"
            onOk={handleOk}
        >
            <Title level={5}>Account information</Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={submit}
                size="middle"
                // requiredMark={"optional"}
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                >
                    <Input
                        defaultValue={dataCreate.name}
                        onChange={onChange}
                        name="name"
                        size="middle"
                        placeholder="Jane Doe"
                    />
                </Form.Item>
                <Form.Item
                    label="Account email"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                    name="email">
                    <Input
                        defaultValue={dataCreate.email}
                        onChange={onChange}
                        name="email"
                        placeholder="JaneDoe@gmail.com"
                        size="middle"
                    />
                </Form.Item>
                <Form.Item label="Description" rules={[{ required: true, message: 'Please input the name!' }]} name="description">
                    <Input
                        defaultValue={dataCreate.description}
                        onChange={onChange}
                        name="description"
                        size="middle"
                    />
                </Form.Item>

                <Collapse defaultActiveKey={['1']} ghost>
                    <Panel header="Billing information" key="1" type="primary" style={{ padding: 0 }}>
                        <Form.Item >
                            <Checkbox
                                onChange={() => setSameAccount(!sameAccount)}
                                // value={sameAccount}
                                checked={sameAccount}
                            >Same as account email</Checkbox>
                        </Form.Item>

                        {!sameAccount ? <Fragment>
                            <Form.Item name="email">
                                <Input
                                    defaultValue={billingInfromation?.email || ""}
                                    onChange={onChangeBillingInfromation}
                                    name="Email"
                                    placeholder="johen@gmail.com"
                                />
                            </Form.Item>
                            {
                                !addMoreRecipients ?
                                    <Button
                                        type="link"
                                        onClick={() => setAddMoreRecipients(true)}
                                    >Add more recipients</Button>
                                    :
                                    <Form.Item label="Emails to CC" name="email">
                                        <Input
                                            defaultValue={billingInfromation?.email || ""}
                                            onChange={onChangeBillingInfromation}
                                            name="Email"
                                            placeholder="johen@gmail.com"
                                        />
                                    </Form.Item>
                            }

                            <Title level={5} style={{ marginTop: 20 }} >Billing details</Title>
                            <Form.Item label="" name="email">
                                <Select
                                    showSearch
                                    // defaultValue={}
                                    name="country"
                                    placeholder="Choose a country..."
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                // onClick={(e) => setSelectCountry(e.target.value)}
                                >
                                    {
                                        countries.map((value, index) => (
                                            <Option value={value.name} key={index}>{value.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="" name="email">
                                <Input
                                    defaultValue={billingInfromation?.email || ""}
                                    onChange={onChangeBillingInfromation}
                                    name="phone"
                                    placeholder="+6285755830855"
                                />
                            </Form.Item>
                            <Title level={5} style={{ marginTop: 20 }} >Shipping details</Title>
                            <Checkbox
                                onChange={() => setSameBilling(!sameBilling)}
                                style={{ marginTop: 20, marginBottom: 20 }}
                                // value={sameBilling}
                                checked={sameBilling}
                            >Same as Billing detail</Checkbox>
                            {
                                !sameBilling ?
                                    <Fragment>
                                        <Form.Item label="" name="email">
                                            <Input
                                                defaultValue={billingInfromation?.email || ""}
                                                onChange={onChangeBillingInfromation}
                                                name="phone"
                                                placeholder="Jane Doe"
                                            />
                                        </Form.Item>
                                        <Form.Item label="" name="country">
                                            <Select
                                                showSearch
                                                // defaultValue={}
                                                name="country"
                                                placeholder="Choose a country..."
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            // onClick={(e) => setSelectCountry(e.target.value)}
                                            >
                                                {
                                                    countries.map((value, index) => (
                                                        <Option value={value.name} key={index}>{value.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="" name="phone">
                                            <Input
                                                defaultValue={billingInfromation?.email || ""}
                                                onChange={onChangeBillingInfromation}
                                                name="phone"
                                                placeholder="+6285755830855"
                                            />
                                        </Form.Item>
                                    </Fragment>
                                    : ""
                            }
                            <Form.Item label="Language" name="preferred_locales">
                                <Select
                                    showSearch
                                    // defaultValue={}
                                    name="preferred_locales"
                                    placeholder="Choose a Language..."
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                // onClick={(e) => setSelectCountry(e.target.value)}
                                >
                                    {
                                        countries.map((value, index) => (
                                            <Option value={value.native} key={index}>{value.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Currency" name="currency">
                                <Select
                                    showSearch
                                    // defaultValue={}
                                    name="currency"
                                    placeholder="Choose a Currency..."
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                // onClick={(e) => setSelectCountry(e.target.value)}
                                >
                                    {
                                        countries.map((value, index) => (
                                            <Option value={value.currency} key={index}>{value.region}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Invoice prefix" name="invoice_prefix">
                                <Input
                                    defaultValue={billingInfromation?.email || ""}
                                    onChange={onChangeBillingInfromation}
                                    name="invoice_prefix"
                                />
                            </Form.Item>
                            <Form.Item label="Tax exempt" name="tax_exempt">
                                <Select
                                    showSearch
                                    // defaultValue={}
                                    name="tax_exempt"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                // onClick={(e) => setSelectCountry(e.target.value)}
                                >
                                    {
                                        taxExemptData.map((value, index) => (
                                            <Option value={value.value} key={index}>{value.title}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Tax ID" name="tax_id_data">
                                {
                                    taxId.map((value, index) => (
                                        <div key={index} style={{ display: "flex", marginTop: 20 }}>
                                            <Select
                                                style={{ width: "20%" }}
                                                name="tax_id_data"
                                                value={value.key || "ID type"}
                                            // onClick={(e) => setSelectCountry(e.target.value)}
                                            >
                                                {
                                                    taxIdData.map((value, index) => (
                                                        <Option value={value} key={index}>{value}</Option>
                                                    ))
                                                }
                                            </Select>
                                            <Input
                                                style={{ width: "80%" }}
                                                value={value.value}
                                                defaultValue={billingInfromation?.email || ""}
                                                onChange={onChangeBillingInfromation}
                                                name="invoice_prefix"
                                            />
                                            <Button
                                                type="link"
                                                onClick={() => setTaxId([...taxId.filter((val, i) => i !== index)])}
                                            ><CloseCircleOutlined /></Button>
                                        </div>
                                    ))
                                }
                                <Button
                                    type="link"
                                    style={{ marginTop: 20 }}
                                    onClick={() => setTaxId([...taxId, { key: "", value: "" }])}
                                >Add more recipients</Button>
                            </Form.Item>
                        </Fragment> : ""}

                    </Panel>
                </Collapse>

            </Form>
        </Modal >
    );
};