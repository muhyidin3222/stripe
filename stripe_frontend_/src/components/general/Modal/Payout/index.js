import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, Input, Form } from 'antd';
import { useDispatch } from 'react-redux'
import moment from 'moment';
import { customersBankDispatch, payOutCreateDispatch } from 'redux/actions';
import { useSelector } from 'react-redux'

export default function Index (props) {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const { modal, setModal, amountTotal } = props
    const [dataCreate, setDataCreate] = useState({})
    const { loading: { loadingCreate }, customers: { resCustomersBank } } = useSelector(state => state)


    // useEffect(() => {
    //     const apiBalance = async () => {
    //         await dispatch(customersBankDispatch({ limit: 3 }))
    //     }
    //     apiBalance()

    //     return () => {
    //     }
    // }, [])

    const onClose = () => {
        setModal(false)
    }

    const onChange = e => {
        setDataCreate({
            ...dataCreate,
            [e.target.name]: e.target.value
        })
    }

    const submit = (param) => {
        dispatch(payOutCreateDispatch({
            ...dataCreate,
            currency: 'usd'
        }))
        setModal(false)
    }


    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields();
                submit()
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    // console.log(resCustomersBank, "resCustomersBank")

    return (
        <Modal
            title="Pay out funds to your bank account"
            visible={modal}
            onOk={handleOk}
            onCancel={onClose}
        >
            <Form
                layout="vertical"
                onFinish={submit}
                size="middle"
            >
                {/* <Form.Item label="Available balance" required name="amount">
                    <Input
                        prefix={<DollarOutlined className="site-form-item-icon" />}
                        defaultValue={dataCreate.name}
                        onChange={onChange}
                        name="amount"
                        size="middle"
                    />
                    <h2>$ {amountTotal}</h2>
                </Form.Item> */}
                <Form.Item
                    label="Amount to pay out"
                    name="amount"
                    rules={[{ required: true, message: 'Please input the Amount to pay out!' }]}
                >
                    <Input
                        defaultValue={dataCreate?.amount}
                        onChange={onChange}
                        required
                        name="amount"
                    />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input
                        defaultValue={dataCreate?.description}
                        onChange={onChange}
                        name="description"
                        required={false}
                    />
                </Form.Item>

                <Form.Item
                    label="Statement descriptor"
                    name="statement_descriptor"
                    rules={[{ required: true, message: 'Please input the Statement descriptor!' }]}
                >
                    <Input
                        defaultValue={dataCreate?.statement_descriptor}
                        onChange={onChange}
                        required
                        name="statement_descriptor"
                    />
                </Form.Item>
            </Form>
        </Modal >
    )
}