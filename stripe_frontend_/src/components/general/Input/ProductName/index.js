import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, AutoComplete, Button, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { pricesGetAll, productsGetAll } from 'redux/actions'
import { useHistory } from 'react-router-dom';

export default function Index (props) {
    const { products: { resProductsGetAll, resPricesGetAll }, loading: { loadingGet } } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const { onSelect } = props
    const [valueInput, setValueInput] = useState("")
    const optionsEmail = resProductsGetAll?.data?.length ? resProductsGetAll?.data?.map(val => {
        const options = resPricesGetAll?.filter(value => value.product === val.id).map(value => ({ ...value, value: value.id, key: value.id, label: `${value?.unit_amount || ""} ${value?.currency} ${value?.recurring?.interval ? "/" + value?.recurring?.interval : ""}` }))
        return { ...val, value: val.id, key: val.id, options, label: val.name }
    }) : []

    const setGetApiProduct = async () => {
        let paramGetAll = { limit: 8 }
        if (valueInput.length)
            paramGetAll.name = valueInput
        await dispatch(productsGetAll(paramGetAll))
        dispatch(pricesGetAll())
    }

    const onChange = (e) => {
        setValueInput(e.target.value)
    }

    useEffect(() => {
        setGetApiProduct()
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
                    onClick={() => history.push("/products/input")}
                >
                    Add product
                </Button>
            )
        },
        ...optionsEmail
    ];

    const clickSelect = (label, value) => {
        onSelect(value)
        setValueInput("")
    }

    return (
        <>
            <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                // dropdownMatchSelectWidth={400}
                options={options}
                loading={loadingGet}
                onSelect={clickSelect}
            >
                <Input
                    size="middle"
                    placeholder="Find or create product"
                    onChange={onChange}
                    value={valueInput}
                // style={{ width: 400 }}
                />
            </AutoComplete>
        </>
    )
}
