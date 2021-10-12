import React from 'react'
import { Select } from 'antd';
import states from 'local/states.json';

const { Option } = Select;

export default function Index (props) {
    const { state, onChange, style, placeholder, country } = props
    return (
        <Select
            showSearch
            name="state"
            size="small"
            style={style}
            placeholder={placeholder || "Search to Select"}
            value={state || ""}
            onChange={onChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
        >
            {
                country ?
                    states.filter(val => val.country_code === country).map((value, index) => (
                        <Option value={value.name} key={index}>{value.name}</Option>
                    )) :
                    states.map((value, index) => (
                        <Option value={value.name} key={index}>{value.name}</Option>
                    ))
            }
        </Select>
    )
}