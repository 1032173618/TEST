import React,{FC} from "react";
import { useNavigate, Outlet,useLocation } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import {
    UserOutline,
} from 'antd-mobile-icons'
import styles from './index.module.less'
import './index.module.less'
const tabs = [
    {
        key: '/home',
        title: '首页',
        icon: <i className="iconfont icon-shouye1" />,

    },
    {
        key: '/home/list',
        title: '找房',
        icon: <i className="iconfont icon-chazhaofangyuan" />,

    },
    {
        key: '/home/news',
        title: '咨讯',
        icon: <i className="iconfont icon-zixun" />,
    },
    {
        key: '/home/profile',
        title: '我的',
        icon: <UserOutline />,
    },
]

const Bottom :FC= () => {
    let navigate=useNavigate()
    const location=useLocation()
    const {pathname}=location
    const setRouteActive=(value:string)=>{
        navigate(value)
    }
    return (<div className={styles.app}>
        {/* <Link to="news" className="top">新</Link> */}
        <div className={styles.body}>
            <Outlet />
        </div>

        {/* TabBar */}

        <TabBar className={styles.bottom} activeKey={pathname} onChange={value=>setRouteActive(value)}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title}></TabBar.Item>
            ))}
        </TabBar>
    </div>)

}
export default Bottom