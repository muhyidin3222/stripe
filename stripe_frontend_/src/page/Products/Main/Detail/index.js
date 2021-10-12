import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Popconfirm, Row, Col, Typography, Card, Image, Space, Table } from 'antd';
import ArchLayout from 'components/layout/ArchLayout'
import { useSelector, useDispatch } from 'react-redux'
import { productsGetId, productsDelete, pricesGetAll, eventsListDispatch } from 'redux/actions'
import { EditOutlined } from '@ant-design/icons'
import scssConfig from 'assets/scss/config.module.scss'
import defaultImage from 'assets/images/defaultImage.js'
import { currencyFromat } from 'utils/format';
import moment from 'moment';
import scss from 'assets/scss/general/cardholderDetail.module.scss'
import ModalAddPrice from 'components/general/Modal/AddPrice'

const { Title } = Typography

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const { products: { resProductsGetId, resPricesGetAll }, event: { resEventList }, loading: { loadingGet, loadingCreate } } = useSelector(state => state)
  const [modalPrice, setModalPrice] = useState(false)

  useEffect(() => {
    const apiGet = async () => {
      if (id) {
        await dispatch(productsGetId(id))
        await dispatch(pricesGetAll({
          product: id
        }))
        // await dispatch(eventsListDispatch({
        //   type: "product"
        // }))
      }
    }
    apiGet()
    return () => { }
  }, [id])

  const deleteProduct = async () => {
    await dispatch(productsDelete(id))
    // history.push("/products/main")
  }

  const addPriceModal = async () => {
    if (id) {
      await dispatch(productsGetId(id))
      await dispatch(pricesGetAll({
        product: id
      }))

    }
  }

  const rightContent = <div style={{ display: "flex" }}>
    <Popconfirm
      title="You are sure"
      onConfirm={deleteProduct}
      onCancel={() => console.log("delete")}
      okText="Yes"
      size="small"
      cancelText="No"
    >
      <Button
        danger
        size="small"
      >Delete</Button>
    </Popconfirm>
    <Button
      style={{ marginLeft: 12 }}
      onClick={() => history.push("/products/input/" + id)}
      size="small"
    >Edit</Button>
  </div>


  const columnsPrice = [
    {
      title: "PRICE",
      dataIndex: 'unit_amount'
    },
    {
      title: "API ID",
      dataIndex: 'id'
    },
    {
      title: "SUBSCRIPTIONS",
      dataIndex: 'subscriptions'
    },
    {
      title: "CREATED",
      dataIndex: 'created',
      render: (created) => created ? moment(created).format("MMM D") : ""
    },
  ]

  const columnsMetadata = [
    {
      title: "Key",
      dataIndex: 'key'
    },
    {
      title: "Value",
      dataIndex: 'value'
    }
  ]

  // const columnsEvent = [
  //   {
  //     title: "",
  //     dataIndex: 'name'
  //   },
  //   {
  //     title: "",
  //     dataIndex: 'created',
  //     render: (created) => created ? moment(created).format("D/MM/YYYY HH:mm") : ""
  //   }
  // ]

  console.log(resPricesGetAll, resProductsGetId, "loadingGet, loading")
  const metadataData = resProductsGetId && resProductsGetId?.metadata ? Object.keys(resProductsGetId?.metadata).map((key) => ({ key, value: resProductsGetId.metadata[key] })) : []

  return (
    <ArchLayout>
      <Card
        title="Product Detail"
        extra={rightContent}
      >
        <Row>
          <Col>
            <div className={scssConfig.flex}>
              <Image
                src={resProductsGetId?.images && resProductsGetId?.images[0] || ""}
                style={{ width: 40, height: 40 }}
                fallback={defaultImage}
              />
              <div className={`${scssConfig.wpContent}`}>
                <div>{resProductsGetId?.name || ""}</div>
                <div className={scssConfig.color}>{resPricesGetAll[0]?.unit_amount ? currencyFromat({ number: resPricesGetAll[0]?.unit_amount, currency: resPricesGetAll[0]?.currency }) : ""} {resPricesGetAll[0]?.currency} / {resPricesGetAll[0]?.recurring?.interval}</div>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={[12, 12]} style={{ marginTop: 30, borderBottom: "1px solid #b8b8b8" }}>
          <Col span={12}>
            <Space>
              <Title level={5}>Detail</Title>
            </Space>
          </Col>
          <Col span={12} style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="primary"
              onClick={() => history.push("/products/input/" + id)}
              size="small"
            >Edit</Button>
          </Col>
        </Row>

        <Row style={{ marginTop: 20, maxWidth: 900 }} gutter={[12, 12]}>
          <Col span={12}>
            <Col >
              <Row gutter={[16, 16]}>
                <Col span={12} style={{ fontWeight: "bold" }}>Name</Col>
                <Col span={12}>{resProductsGetId?.name}</Col>
              </Row>
            </Col>

            <Col span={24}>
              <Row gutter={[16, 16]}>
                <Col span={12} style={{ fontWeight: "bold" }}>Description</Col>
                <Col span={12}>{resProductsGetId?.description}</Col>
              </Row>
            </Col>

            <Col span={24}>
              <Row gutter={[16, 16]}>
                <Col span={12} style={{ fontWeight: "bold" }}>ID</Col>
                <Col span={12}>{resProductsGetId?.id}</Col>
              </Row>
            </Col>

            <Col span={24}>
              <Row gutter={[16, 16]}>
                <Col span={12} style={{ fontWeight: "bold" }}>Created</Col>
                <Col span={12}>{moment(resProductsGetId?.created).format("DD MMM")}</Col>
              </Row>
            </Col>

            <Col span={24}>
              <Row gutter={[16, 16]}>
                <Col span={12} style={{ fontWeight: "bold" }}>Statement descriptor</Col>
                <Col span={12}>{resProductsGetId?.statement_descriptor}</Col>
              </Row>
            </Col>
          </Col>

          <Col span={12}>
            <Row gutter={[16, 16]}>
              <Col span={6} style={{ fontWeight: "bold" }} justify="end">Image</Col>
              <Col span={12}>
                <Image
                  src={resProductsGetId?.images && resProductsGetId?.images[0] || ""}
                  style={{ width: 80, height: 80 }}
                  fallback={defaultImage}
                />
              </Col>
            </Row>
          </Col>

        </Row>

        <div className={`${scss.wpContent}  ${scss.header}`} style={{ marginTop: 20 }}>
          <div className={scss.title} style={{ fontSize: 20 }}>Price</div>
          <Button
            size="small"
            type='primary'
            onClick={() => setModalPrice(true)}
          >Add Price</Button>
        </div>

        <Table
          columns={columnsPrice}
          style={{ width: "100%", marginTop: 10 }}
          footer={() => `${resPricesGetAll.length || 0} results`}
          dataSource={resPricesGetAll.length ? resPricesGetAll : [1]}
          size="small"
          pagination={{ position: ["none", "none"] }}
        />


        <div className={scss.line4} style={{ marginTop: 20 }}>
          <div className={`${scss.wpContent}  ${scss.header}`}>
            <div className={scss.title} style={{ fontSize: 20 }}>Metadata</div>
            <Button
              size="small"
              icon={<EditOutlined />}
            >Edit</Button>
          </div>
          <Table
            footer={() => `${metadataData?.length || 0} results`}
            columns={columnsMetadata}
            style={{ width: "100%" }}
            dataSource={metadataData.length ? metadataData : [1]}
            size="small"
            pagination={{ position: ["none", "none"] }}
          />
        </div>


        {/* <div className={scss.line4} style={{ marginTop: 20 }}>
          <div className={`${scss.wpContent}  ${scss.header}`}>
            <div className={scss.title} style={{ fontSize: 20 }}>Events</div>
          </div>
          <Table
            footer={() => `${resEventList?.data?.length || 0} results`}
            columns={columnsEvent}
            style={{ width: "100%" }}
            dataSource={resEventList?.data?.length ? resEventList?.data : [1]}
            size="small"
            pagination={{ position: ["none", "none"] }}
          />
        </div> */}
      </Card>

      <ModalAddPrice
        setShowModal={setModalPrice}
        addPriceModal={addPriceModal}
        showModal={modalPrice}
        product={id}
      />
    </ArchLayout>
  )
}