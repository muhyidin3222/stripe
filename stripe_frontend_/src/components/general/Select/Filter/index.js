import React, { useEffect, useState } from 'react'
import { Checkbox, Menu, Dropdown, Button, Input, DatePicker } from 'antd';
import { FilterOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker

export default function Index ({ listMap, doneClick }) {
    const [listMapFilter, setlistMapFilter] = useState([])
    const [dropdown, setdropdown] = useState(false)
    useEffect(() => {

        const setState = () => {
            setlistMapFilter(listMap)
        }
        setState()
        return () => { }
    }, [])

    const onCheck = (value) => {
        setlistMapFilter(
            listMapFilter.map(val => val.value === value.value ? {
                ...value,
                checked: value?.checked ? false : true
            } : val)
        )
    }
    const onClear = () => {
        setlistMapFilter(listMap)
    }
    const onSearch = async () => {
        const dataDate = listMapFilter.find(val => val.value === "create_date" && val.checked)
        const dataEmail = listMapFilter.find(val => val.value === "email" && val.checked)

        let body = {}

        if (dataDate?.title) {
            const created = {
                gte: dataDate?.start,
                lte: dataDate?.end
            }
            body.created = created
        }

        if (dataEmail?.input) {
            body.email = dataEmail?.input
        }

        await doneClick(body)
        setdropdown(false)
    }
    const onChangeDate = (value, index) => {
        listMapFilter[index].start = value[0].unix()
        listMapFilter[index].end = value[1].unix()
    }

    const onChange = (value, index) => {
        listMapFilter[index].input = value?.target?.value
        setlistMapFilter(listMapFilter)
    }

    const menu = (() =>
        <Menu style={{ minWidth: 250 }}>
            <Menu.Item>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Button size="small" onClick={onClear}>Clear</Button>
                    <h4>Filters</h4>
                    <Button size="small" onClick={onSearch} type="primary">Done</Button>
                </div>
            </Menu.Item>
            <Menu.Divider />

            {
                listMapFilter?.map((value, index) => (
                    <Menu.Item key={index}>
                        <div>
                            {console.log(value?.checked, value)}
                            <Checkbox
                                onChange={() => onCheck(value)}
                                checked={value?.checked ? true : false}
                                value={value?.checked ? true : false}
                            >
                                {value.title}
                            </Checkbox>

                            <div>
                                {
                                    value.type === "input" && value.checked ?
                                        <Input
                                            style={{ marginTop: 10 }}
                                            size="small"
                                            placeholder={value.title}
                                            onChange={e => onChange(e, index)}
                                            name={value.name}
                                        />
                                        : ""
                                }
                                {
                                    value.type === "date" && value.checked ?
                                        <RangePicker
                                            style={{ marginTop: 10 }}
                                            size="small"
                                            onChange={(val) => onChangeDate(val, index)}
                                        />
                                        : ""
                                }
                            </div>
                        </div>
                    </Menu.Item>
                ))
            }
        </Menu>
    )

    return (
        <Dropdown overlay={menu} placement="bottomLeft" arrow visible={dropdown}>
            <Button
                size="small"
                onClick={() => setdropdown(!dropdown)}
                icon={<FilterOutlined />}
                style={{ marginLeft: 10 }}
            >Filter</Button>
        </Dropdown>

    )
}
