import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Menu, Icon, Avatar, Dropdown, Button, Switch } from 'antd'
import { withRouter, Redirect, useHistory } from 'react-router-dom'
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
// import dataMenu from 'local/menu'
import dataMenu from 'local/menu'
import { getCookie, deleteCookieName, deleteCookie } from 'utils/cookies'
import 'assets/Index.scss'
import {
  COLLAPSED,
  INNER_WIDTH
} from "redux/actions";


const { Sider, Header, Content } = Layout

const ArchLayout = (props) => {
  const { general: {
    collapsed,
    // cookieDeleted,
  } } = useSelector(state => state)
  const dispatch = useDispatch()
  const history = useHistory()
  const email = getCookie("email")

  const collapsedChange = (condition) => {
    dispatch({
      type: COLLAPSED,
      collapsed: condition,
    })
  }

  useEffect(() => {
    function handleResize () {
      dispatch({
        type: INNER_WIDTH,
        innerWidth: window.innerWidth,
      })
      // console.log(window.innerWidth, window.width)
      if (window.innerWidth > 900) {
        collapsedChange(false)
      } else {
        collapsedChange(true)
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const toggle = () => {
    collapsedChange(!collapsed)
  }

  const handleLogout = () => {
    history.push("/login")
    deleteCookie()
    deleteCookieName("email")
  }

  const goToMenu = ({ item, key }) => {
    history.push(key)
  }

  const menu = (
    <Menu>
      <Menu.Item key="logout">
        <Button
          type="link"
        >
          {email || "Admin"}
        </Button>
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        type="link"
        danger
        onClick={() => handleLogout()}
        style={{ paddingLeft: 30 }}
      >
        Logout
      </Menu.Item>
    </Menu>
  )

  // if (cookieDeleted === true) {
  //   return (<Redirect to='/login' />)
  // }

  const { pathname } = history.location

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={"light"}
        breakpoint="lg"
        width="280"
        onBreakpoint={broken => { }}
        onCollapse={(collapsed, type) => { }}
      >
        <Menu
          mode="inline"
          theme={"light"}
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[pathname]}
          onClick={goToMenu}
          selectedKeys={[pathname]}
          inlineCollapsed={collapsed}
        >
          <div className="logo-container">
            <div className="logo" />
          </div>
          {
            dataMenu.map(value => (
              <Menu.Item
                key={value.path}
                icon={value.icon}
                style={{ marginLeft: !collapsed ? 30 : 15 }}
              >
                <span className="nav-text">{value.name}</span>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>

      <Layout>
        <Header
          className="arch-header"
          style={{ paddingLeft: collapsed ? 100 : 30, backgroundColor: "#fff", height: 80, display: "flex", alignItems: "center" }}
        >
          <div>
            <Button type="primary" onClick={toggle}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
          </div>

          <div className="right-menu">
            <Dropdown overlay={menu} trigger={['click']}>
              <Avatar
                style={{ color: '#f56a00', backgroundColor: '#fde3cf', verticalAlign: 'middle' }}
                size="large"
                icon={<UserOutlined />}
              />
            </Dropdown>
          </div>
        </Header>
        <Content className="arch-container" style={{ marginLeft: collapsed ? 120 : 30 }}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default ArchLayout