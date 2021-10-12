import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Form, Input, Button, Row, Col, Typography } from 'antd';
import { customersUpdateDispatch } from 'redux/actions'
import { InfoCircleOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

export default (props) => {
    const dispatch = useDispatch()
    const { loading: { loadingUpdate } } = useSelector(state => state)
    const { setShowModal, showModal, id, metadataUser } = props
    const [metadata, setMetadata] = useState(metadataUser || [
        { key: "", value: "" }
    ])

    const handleCancel = () => {
        setShowModal(false);
        setMetadata([])
    };

    const submit = async (e) => {
        let metadataParam = {}
        await metadata.map(async val => {
            metadataParam[val.key] = val.value
        })
        console.log(metadataParam)
        await dispatch(customersUpdateDispatch({
            id,
            metadata: metadataParam
        }))
        // handleCancel()
    }

    const addMoreMetadata = () => {
        const objectval = {
            key: "",
            value: ""
        }
        setMetadata([...metadata, objectval])
    }
    // cus_K8wub4tzVAPqfX
    // console.log(loadingUpdate)
    return (
        <Modal
            title="Add Metadata"
            visible={showModal}
            onOk={submit}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loadingUpdate} onClick={submit}>
                    {id ? "Edit" : "Add"}
                </Button>,
            ]}
        >
            <Form
                layout="vertical"
                onFinish={submit}
                size="middle"
                requiredMark={"optional"}
            >
                {
                    metadata.length ?
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
                        : ""
                }
                <Button
                    size="middle"
                    onClick={addMoreMetadata}
                    icon={<PlusOutlined />}
                    type="link"
                >
                    Add more metadata
                </Button>
            </Form>
        </Modal>
    );
};