import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, AutoComplete, Button } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { cardholderGetAllDispatch, customersListDispatch } from 'redux/actions'
import ModalAddCustomer from 'components/general/Modal/AddCustomer'

export default function Index (props) {
    const { customers: { resCustomersList }, loading: { loadingGet } } = useSelector(state => state)
    const dispatch = useDispatch()
    const { onSelect } = props
    const [valueInput, setValueInput] = useState("")
    const [showModal, setShowModal] = useState(false)
    // const dataCustomerFilter = resCustomersList?.data?.filter(val => val?.email?.length || val?.name?.length)
    const optionsEmail = resCustomersList?.data?.length ? resCustomersList?.data?.map(val => ({ ...val, value: val.email || val.name || val.id, key: val.id })) : []

    const setGetApiCustomer = async () => {
        let paramGetAll = { limit: 3 }
        if (valueInput.length)
            paramGetAll.email = valueInput
        dispatch(cardholderGetAllDispatch(paramGetAll))
        dispatch(customersListDispatch())
    }

    const onChange = (e) => {
        setValueInput(e.target.value)
        // if (valueInput.length)
        setGetApiCustomer()
    }

    useEffect(() => {
        setGetApiCustomer()
        return () => {
        }
    }, [])

    const options = [
        {
            label: (
                <Button
                    size="small"
                    type="primary"
                    style={{ width: "100%" }}
                    icon={<PlusOutlined />}
                    onClick={() => setShowModal(true)}
                >
                    Add {valueInput.length ? valueInput : "new customer"}
                </Button>
            )
        },
        {
            label: 'recent',
            options: optionsEmail
        },
    ];

    console.log(resCustomersList, "resCustomersList")
    return (
        <>
            <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                // style={{
                //     width: 250,
                // }}
                onSelect={onSelect}
                options={options}
            >
                <Input
                    size="middle"
                    placeholder="find or add customer"
                    onChange={onChange}
                    value={valueInput}
                />
            </AutoComplete>
            <ModalAddCustomer
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </>
    )
}
