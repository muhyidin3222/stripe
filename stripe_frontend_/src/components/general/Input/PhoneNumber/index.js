import React, { useState } from 'react'
import { Modal, Form, Input, Select } from 'antd';
import countries from 'local/countries.json';

const { Option } = Select;

export default function Index (props) {
    const { onChange } = props
    const [selectCountry, setSelectCountry] = useState({ iso3: "USD", phone_code: 1 })

    return (
        <div>
            {/* <Select
                defaultValue={selectCountry.iso3}
                onClick={(e) => setSelectCountry(e.target.value)}
            >
                {
                    countries.map((value, index) => (
                        <Option value={value} key={index}>{value.iso3}</Option>
                    ))
                }
            </Select> */}

            <Input
                // icon={`+${selectCountry?.phone_code}`}
                style={{ width: '100%' }}
                placeholder="20315550123"
                onChange={onChange}
            />
        </div>
    )
}
