import React, { useState, useEffect } from 'react';
import { Layout, Icon } from 'antd'
import { MainListItems } from 'components/general/ListItems';
import { collapsedChange, INNER_WIDTH } from 'redux/actions'
import Topbar from 'components/layout/Topbar'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

const { Content } = Layout;

export default function Dashboard (props) {
    // const history = useHistory()
    const { general: { collapsed } } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        function handleResize () {
            dispatch({
                type: INNER_WIDTH,
                innerWidth: window.innerWidth,
            })
            if (window.innerWidth > 900) {
                collapsedChange(false)
            } else {
                collapsedChange(true)
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Layout>
            <MainListItems
                collapsed={collapsed}
                setCollapsed={() => collapsedChange(!collapsed)}
            />
            <Layout>
                <Topbar
                    className="arch-header"
                    style={{ paddingLeft: collapsed ? 100 : 30, height: 180, display: "flex", alignItems: "center", }}
                    collapsed={collapsed}
                    setCollapsed={() => collapsedChange(!collapsed)}
                />
                <Content
                    className="arch-container"
                    style={{ padding: 30 }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
}