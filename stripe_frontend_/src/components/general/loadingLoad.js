import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;

export default () => (
    <div style={{ height: 900, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Spin indicator={antIcon} />
    </div>
)