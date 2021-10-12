import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, AutoComplete, Button, } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { cardholderGetAllDispatch } from 'redux/actions'
import ModalAddCardholder from 'components/general/Modal/ModalAddCardholder'

export default function Index (props) {
    const { issuing: { resCardholderGetAll }, loading: { loadingGet } } = useSelector(state => state)
    const dispatch = useDispatch()
    const { onSelect } = props
    const [valueInput, setValueInput] = useState("")
    const [showModal, setShowModal] = useState(false)
    // const dataCustomerFilter = resCardholderGetAll?.data?.filter(val => val?.email?.length || val?.name?.length)
    const optionsEmail = resCardholderGetAll?.data?.length ? resCardholderGetAll?.data?.map(val => ({ ...val, value: val.name || val.name || val.id, key: val.id })) : []

    const setGetApiCustomer = async () => {
        let paramGetAll = { limit: 8 }
        if (valueInput.length)
            paramGetAll.name = valueInput + "@gmail.com"
        dispatch(cardholderGetAllDispatch(paramGetAll))
    }

    const onChange = (e) => {
        setValueInput(e.target.value)
        // if (valueInput.length)
        // setGetApiCustomer()
    }

    useEffect(() => {
        setGetApiCustomer()
        return () => {
        }
    }, [valueInput])

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
                    Add cardholder
                </Button>
            )
        },
        {
            label: 'recent',
            options: optionsEmail
        },
    ];

    const clickSelect = (label, value) => {
        onSelect(value)
    }

    return (
        <>
            <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={400}
                options={options}
                onSelect={clickSelect}
            >
                <Input
                    size="middle"
                    placeholder="Find or create cardholder"
                    onChange={onChange}
                    value={valueInput}
                    style={{ width: 400 }}
                />
            </AutoComplete>
            <ModalAddCardholder
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </>
    )
}
