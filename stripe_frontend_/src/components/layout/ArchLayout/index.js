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
                dispatch(collapsedChange(false))
            } else {
                dispatch(collapsedChange(true))
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Layout
            style={{ background: "#fffff" }}
        >
            <MainListItems
                collapsed={collapsed}
                setCollapsed={() => dispatch(collapsedChange(!collapsed))}
            />
            <Layout style={{ backgroundColor: "#ffffff" }}>
                <Topbar
                    className="arch-header"
                    style={{ paddingLeft: collapsed ? 100 : 60, display: "flex", alignItems: "center", }}
                    collapsed={collapsed}
                    setCollapsed={() => dispatch(collapsedChange(!collapsed))}
                />
                <Content
                    className="arch-container"
                    style={{ padding: 30, marginLeft: collapsed ? 100 : 60, }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
}