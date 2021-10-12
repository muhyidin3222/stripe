import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Input, Button, Select, Radio, Row, Col, Collapse, Typography, Card } from 'antd';

import ContainterInput from 'components/general/Input/ContainterInput'
import ArchLayout from 'components/layout/ArchLayout'
import { useSelector, useDispatch } from 'react-redux'
import { pricesCreate, productsCreate, productsGetId, pricesGetAll, productsUpdate, pricesUpdate } from 'redux/actions'

import Color from 'config/Color'
import Upload from 'components/general/Upload';
import { PlusOutlined, InfoCircleOutlined, CloseCircleOutlined, CaretRightOutlined } from '@ant-design/icons'
import DeleteForever from '@material-ui/icons/DeleteForever';

const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
const { Title } = Typography
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
  const history = useHistory()
  const params = useParams()
  const [form] = Form.useForm();
  const { products: { resProductsGetId, resPricesGetAll }, loading: { loadingGet, loadingCreate } } = useSelector(state => state)
  const [priceData, setPriceData] = useState([
    {
      currency: "usd",
      product: "",
      unit_amount: "",
      type: ""
    }
  ])
  const [activeKeyCollapse, setActiveKeyCollapse] = useState(["1"])
  const [metadata, setMetadata] = useState([
    { key: "", value: "" }
  ])
  const [loadingCard, setLoadingCard] = useState(true)

  const [dataCreate, setdataCreate] = useState({
    name: "",
    description: "",
    statement_descriptor: "",
    // unit_label: "",
    // metadata: "",
  })

  useEffect(() => {
    const apiGet = async () => {
      if (params.id) {
        await dispatch(productsGetId(params.id))
        await dispatch(pricesGetAll({
          product: params.id
        }))
      }
      setLoadingCard(false)
      // if (!params.id)
    }
    apiGet()
    return () => { }
  }, [params.id])

  useEffect(() => {
    const apiGet = async () => {
      if (resProductsGetId && params.id || resPricesGetAll?.length && params.id) {
        const mapingPrice = await Promise.all(resPricesGetAll.map(val => ({
          currency: val.currency,
          unit_amount: val.unit_amount,
          product: val.product,
          type: val.type,
          id: val.id
        })))
        setPriceData(mapingPrice)
        setdataCreate({
          name: resProductsGetId.name,
          description: resProductsGetId.description,
          statement_descriptor: resProductsGetId.statement_descriptor,
          unit_label: resProductsGetId.unit_label,
          metadata: resProductsGetId.metadata,
          id: resProductsGetId.id,
        })
      }
    }
    apiGet()
    return () => { }
  }, [resProductsGetId, params.id, resPricesGetAll?.length])

  const handleCreateProduct = (type_button) => {
    form
      .validateFields()
      .then(async values => {
        form.resetFields();
        // submit()
        let resProduct
        if (params.id) {
          resProduct = await dispatch(productsUpdate(dataCreate))
        } else {
          resProduct = await dispatch(productsCreate(dataCreate))
        }
        priceData.map(value => {
          let paramCreatePrice = {
            currency: value.currency,
            unit_amount: value.unit_amount,
            type: value.type,
            id: value.id
          }

          if (value.id) {
            paramCreatePrice.id = value.id
          } else {
            paramCreatePrice.product = resProduct.id
          }
          if (value.type === "recurring") {
            paramCreatePrice.recurring = {
              interval: value.interval,
              aggregate_usage: value.aggregate_usage
            }
          }

          if (value.id) {
            dispatch(pricesUpdate(paramCreatePrice))
          } else {
            dispatch(pricesCreate(paramCreatePrice))
          }
        })
        if (type_button === "save_and_more") {
          history.push("/products/input")
        } else {
          history.goBack()
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  const genExtra = (index) => {
    return <CloseCircleOutlined
      onClick={() => priceDelete(index)}
    />
  }

  const onChange = e => {
    setdataCreate({
      ...dataCreate,
      [e.target.name]: e.target.value
    })
  }

  const onChangePrice = (value, type, index) => {
    let dataChangePrice = {
      ...priceData[index],
      [type]: value
    }
    priceData[index] = dataChangePrice
    setPriceData(priceData)
  }

  const onChangeAmountPrice = (e, index) => {
    let dataChangePrice = {
      ...priceData[index],
      [e.target.name]: e.target.value
    }
    priceData[index] = dataChangePrice
    setPriceData(priceData)
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
    setPriceData([...priceData, {}])
  }

  const priceDelete = (index) => {
    setPriceData(priceData.filter((val, i) => i !== index))
  }

  const rightContent = <div style={{ display: "flex" }}>
    <Button
      onClick={() => handleCreateProduct("save_and_more")}
    >
      Save and add more
    </Button>
    <Button
      style={{ marginLeft: 12 }}
      onClick={() => handleCreateProduct("save")}
      type="primary"
    >
      Save product
    </Button>
  </div>

  console.log(priceData, dataCreate, params.id, "loadingGet, loading")

  return (
    <ArchLayout>
      <Card
        title="Add a Product"
        extra={rightContent}
        form={form}
        loading={loadingCard}
      >
        <Title level={4}>Product information</Title>
        <Title level={5} style={{ marginBottom: 12 }}>Product details</Title>
        <Form
          layout="vertical"
          onFinish={submit}
          size="middle"
          requiredMark={"optional"}
        >
          <Row gutter={24} >
            <Col className="gutter-row" span={16}>
              <Form.Item
                label="Name"
                required name="name"
                rules={[{ required: true, message: 'Please input the name!' }]}
              >
                <Input
                  defaultValue={dataCreate.name}
                  value={dataCreate.name}
                  onChange={onChange}
                  name="name"
                  size="middle"
                  placeholder="premium plan, sunglasses"
                />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                tooltip={{
                  title: 'Optional',
                  icon: <InfoCircleOutlined />
                }}
              >
                <TextArea
                  defaultValue={dataCreate.description}
                  value={dataCreate.description}
                  onChange={onChange}
                  name="description"
                  style={{ height: 100 }}
                />
              </Form.Item>

              <Collapse defaultActiveKey={['1']} ghost >
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
                      value={dataCreate.statement_descriptor}
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
                      value={dataCreate.unit_label}
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
                                  value={value.key}
                                  onChange={onChangMetadata}
                                  name="key"
                                  placeholder="key"
                                />
                              </Col>
                              <Col span={8}>
                                <Input
                                  defaultValue={value.value}
                                  value={value.value}
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
                                        value={dataCreate.metadata}
                                        onChange={onChange}
                                        name="metadata"
                                    />
                                </Form.Item> */}
                </Panel>
              </Collapse>

              <Title level={4} style={{ marginTop: 20 }}>Price information</Title>
              <Collapse
                bordered={false}
                activeKey={activeKeyCollapse}
                defaultActiveKey={activeKeyCollapse}
                className="site-collapse-custom-collapse"
                onChange={e => setActiveKeyCollapse(e)}
              >
                {priceData.map((value, index) => (
                  <Panel
                    className="site-collapse-custom-panel"
                    style={{ marginTop: 30, marginBottom: 30 }}
                    header="Additional options"
                    key={index}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    extra={genExtra(index)}
                    type="primary"
                  >
                    <Form.Item
                      label="Pricing model"
                      name="graduated"
                      rules={[{ required: true, message: 'Please input the Pricing model!' }]}
                    >
                      <Select
                        defaultValue="graduated"
                        name="tiers_mode"
                        onChange={(value) => onChangePrice(value, "tiers_mode", index)}
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
                      rules={[{ required: true, message: 'Please input the Pricing!' }]}
                    >
                      <Input
                        defaultValue={value?.unit_amount || ""}
                        value={value?.unit_amount || ""}
                        onChange={e => onChangeAmountPrice(e, index)}
                        name="unit_amount"
                      />
                    </Form.Item>
                    <Form.Item
                      name="type"
                    >
                      <Radio.Group
                        onChange={(value) => onChangePrice(value, "type", index)}
                        defaultValue="recurring"
                        name="type"
                      >
                        <Radio.Button value="recurring">Recurring</Radio.Button>
                        <Radio.Button value="one-time">One TIme</Radio.Button>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      label="Billing priode"
                      name="interval"
                    >
                      <Select
                        defaultValue="month"
                        name="interval"
                        onChange={(value) => onChangePrice(value, "interval", index)}

                      >
                        {
                          ["day", "week", "month", "year"].map((item, i) => (
                            <Option value={item} key={i}>{item}</Option>
                          ))
                        }
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Charge for metered usage by"
                      name="aggregate_usage"
                    >
                      <Select
                        defaultValue="month"
                        name="aggregate_usage"
                        onChange={(value) => onChangePrice(value, "aggregate_usage", index)}
                      >
                        {
                          aggregateUsageData.map((item, i) => (
                            <Option value={item.value} key={i}>{item.title}</Option>
                          ))
                        }
                      </Select>
                    </Form.Item>
                  </Panel>
                ))}

              </Collapse>
              <Button
                size="middle"
                onClick={addPrice}
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginLeft: 10 }}
              >
                Add another price
              </Button>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item label="Image" name="image">
                <Upload />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </ArchLayout>
  )
}