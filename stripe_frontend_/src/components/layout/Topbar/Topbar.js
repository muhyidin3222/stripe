import React, { useState } from 'react';
import { Link as withRouter, useHistory } from 'react-router-dom';
import scss from 'assets/scss/components.module.scss';
import { Layout, Input, Space, Menu, Dropdown, Button, Typography } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { setCookie, getCookie, deleteCookie } from 'utils/cookies'

const { Header } = Layout;
const { Title, Text } = Typography

const Topbar = props => {
  const { setCollapsed, collapsed, style } = props;
  const history = useHistory()

  const logOut = async () => {
    // await deleteCookie()
    history.push("/login")
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Text className={scss.title}>Ahmad Muhyidin</Text>
        <div className={scss.dec}>Administrator</div>
      </Menu.Item>
      <Menu.Item style={{ marginTop: 10 }}>
        <Button type="link">Profile</Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link" onClick={logOut}>Sign out</Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header
      className={scss.header}
      style={style}
    >
      {/* <div className={scss.wpHeader}>
        <Button
          onClick={() => setCollapsed(!collapsed)}
          type="link"
        >
          {
            collapsed ?
              <MenuUnfoldOutlined />
              :
              <MenuFoldOutlined />
          }
        </Button>
        <Input
          placeholder="Search…"
          style={{ width: 500 }}
          className={scss.input}
          bordered={false}
        />
      </div>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            overlay={menu}
            placement="bottomLeft"
          >
            <Button
              type="ghost"
              shape="circle"
              icon={
                <UserOutlined />
              }
            >
            </Button>
          </Dropdown>
        </Space>
      </Space> */}
    </Header>
  );
};

export default Topbar
