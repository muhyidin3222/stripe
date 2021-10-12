import React from 'react'
import { useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd';

export default ({ title, onClick }) => {
    let { pathname } = useLocation();
    var name = pathname.split("/");
    return (
        <div>
            <div className="title-l" style={{ marginTop: 20 }}>{title}</div>
            <Breadcrumb style={{ margin: "20px 0px 20px 0px" }}>
                {
                    name.map((value, index) => (
                        name.length - 1 !== index ? <Breadcrumb.Item key={index} style={{ textTransform: "capitalize" }}> {index === 1 && onClick ? <a onClick={onClick} href={value} style={{ cursor: !onClick ? "auto" : "" }}>{value}</a> : value}</Breadcrumb.Item> : ""
                    ))
                }
            </Breadcrumb>
        </div>
    )
}