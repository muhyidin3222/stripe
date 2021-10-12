import React from 'react'
import { Select } from 'antd';
import countries from 'local/countries.json';

const { Option } = Select;

export default function Index (props) {
    const { country, onChange, style, placeholder } = props
    return (
        <Select
            showSearch
            style={style}
            placeholder={placeholder || "Search to Select"}
            name="country"
            size="small"
            value={country || ""}
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
                countries.map((value, index) => (
                    <Option value={value.iso2} key={index}>{value.name}</Option>
                ))
            }
        </Select>
    )
}