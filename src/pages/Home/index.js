import React from "react";
import { Link, Outlet } from 'react-router-dom'
import { Badge, TabBar } from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
import styles from './index.less'
const tabs = [
    {
        key: 'home',
        title: '首页',
        icon: <AppOutline />,
        badge: Badge.dot,
    },
    {
        key: 'todo',
        title: '我的待办',
        icon: <UnorderedListOutline />,
        badge: '5',
    },
    {
        key: 'message',
        title: '我的消息',
        icon: (active) =>
            active ? <MessageFill /> : <MessageOutline />,
        badge: '99+',
    },
    {
        key: 'personalCenter',
        title: '个人中心',
        icon: <UserOutline />,
    },
]
export default class Home extends React.Component {

    render() {
        return (<div>首页
            <Link to="news">新</Link>

            <Outlet />
            {/* TabBar */}
            <div className={styles.bottom}>
            <TabBar >
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} ></TabBar.Item>
                ))}
            </TabBar>
            </div>
            
        </div>)
    }
}