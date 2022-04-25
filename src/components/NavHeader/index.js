import React, { useState } from 'react'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
// 导入 props 校验的包
import PropTypes from 'prop-types'
const NavHeader=({children}) =>{
    const navigate = useNavigate()
   
    return (<NavBar onBack={() => navigate(-1)} style={{ backgroundColor: "#f6f5f6", color: "#333",marginTop:'-45px' }}>
        {children}
    </NavBar>)
}
// 添加props校验
NavHeader.propTypes={
    children:PropTypes.string.isRequired
}
export default  NavHeader