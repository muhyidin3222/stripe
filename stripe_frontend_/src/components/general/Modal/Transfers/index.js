import React, { useState, useEffect } from 'react'
import { Modal, Input, Form, Select } from 'antd';
import { useDispatch } from 'react-redux'
import { transfersCreateDispatch } from 'redux/actions';
import { useSelector } from 'react-redux'

const { Option } = Select;

export default function Index (props) {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const { modal, setModal } = props
    const [dataCreate, setDataCreate] = useState({})
    const [selectCard, setSelectCard] = useState({})
    const { loading: { loadingCreate }, account: { resAccountList } } = useSelector(state => state)

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
        dispatch(transfersCreateDispatch({
            ...dataCreate,
            currency: 'usd',
            destination: selectCard.id
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

    return (
        <Modal
            title="Pay out funds to your bank account"
            visible={modal}
            onOk={handleOk}
            onCancel={onClose}
            loading={loadingCreate}
        >
            <Form
                layout="vertical"
                onFinish={submit}
                size="middle"
            >
                <Form.Item label="" name="Destination">
                    <Select
                        showSearch
                        name="country"
                        placeholder="Connect account"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onSelect={(value) => setSelectCard(value)}
                    >
                        {
                            resAccountList?.data?.map((value, index) => (
                                <Option value={value} key={index}>{value.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: 'Please input the Amount !' }]}
                >
                    <Input
                        defaultValue={dataCreate?.amount}
                        onChange={onChange}
                        required
                        name="amount"
                    />
                </Form.Item>

            </Form>
        </Modal >
    )
}