import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Layout, Typography } from 'antd';

//data local
import menu from 'local/menu.js'
const { SubMenu } = Menu;
const { Sider } = Layout;
const { Title } = Typography

export const MainListItems = ({ collapsed }) => {
    const history = useHistory()
    const pathname = history.location.pathname
    const splitPathname = "/" + pathname.split("/")[1]
    const handleClick = (keys) => {
        history.push(keys.key)
    }
    return (
        <Sider
            width={"auto"}
            trigger={null}
            collapsible
            collapsed={collapsed}
        >
            <div className="logo" style={{
                height: 70,
                justifyContent: "center",
                fontSize: 14,
                alignItems: "center",
                backgroundColor: "#ffffff",
                display: "flex"
            }}>Stripe clone</div>
            <Menu
                onClick={handleClick}
                style={{ width: collapsed ? "auto" : 250, height: "100%", backgroundColor: "#ffffff" }}
                defaultSelectedKeys={[pathname]}
                defaultOpenKeys={[splitPathname]}
                // openKeys={[pathname]}
                mode="inline"
                theme="light"
            >
                {
                    menu.map((value, index) => (
                        value.subMenu ?
                            <SubMenu
                                key={value.path}
                                icon={value.icon}
                                title={value.name}
                                style={{ backgroundColor: "#ffffff" }}
                            >
                                {
                                    value.subMenu ?
                                        value.subMenu.map((item, index) => (
                                            <Menu.Item key={item.path} >{item.name}</Menu.Item>
                                        ))
                                        : ""
                                }
                            </SubMenu>
                            :
                            <Menu.Item icon={value.icon} key={value.path} >{value.name}</Menu.Item>
                    ))
                }
            </Menu>
        </Sider>
    )
}