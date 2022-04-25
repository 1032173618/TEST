import axios from "axios";
import React, { FC, useEffect } from "react";
import NavHeader from "../../components/NavHeader";
import styles from './index.module.less'
const BMapGL = window.BMapGL
const Map: FC = () => {
    useEffect(() => {
        // 初始化地图实例
        // 注意:在 react 脚手架中全局对象需要使用 Window 来访问,否则,会造成 ESLint 校验错误
        const map = new BMapGL.Map('container')
        // 设置中心点坐标
        const point = new BMapGL.Point(116.404, 39.915);
        //    初始化地图
        map.centerAndZoom(point, 15)

        // 开启SDK辅助定位
        // 根据定位展示当前城市
        // 使用地址解析器解析当前城市坐标 调用 createAndZoom()方法在地图中展示当前城市，并设置缩放级别为11
        const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))

        // 使用地址解析器解析地址
        const myGeo = new BMapGL.Geocoder()
        myGeo.getPoint(label, async function (point) {
            if (point) {
                map.centerAndZoom(point, 11);
                // map.addOverlay(new window.BMapGL.Marker(point, {title: label}))
                map.addControl(new BMapGL.ScaleControl())
                map.addControl(new BMapGL.ZoomControl())
                map.addControl(new BMapGL.CityListControl())

                renderOverlays(value)
                // let res = await axios.get(`http://localhost:8080/area/map?id=${value}`)

                // res.data.body.forEach(ele => {
                //     //为每一条数据创建覆盖物
                //     const {coord:{longitude,latitude},label:areaName,count,value}=ele
                //    const areaPoint=new BMapGL.Point(longitude, latitude)
                //     const label = new BMapGL.Label('',{
                //         position: areaPoint,
                //         offset: new BMapGL.Size(-35, -35)
                //     })
                //     label.setContent(`
                //     <div class="${styles.bubble}">
                //     <p class="${styles.name}">${areaName}</p>
                //     <p>${count}套</p>
                //     </div>`)
                //     label.setStyle({
                //         color: '#fff',
                //         width: '75px',
                //         height: '75px',
                //         textAlign: 'center',
                //         border: 'none',
                //         borderRadius: '50%',
                //         backgroundColor: 'green'
                //     })
                //     // 给label对象添加一个唯一标识
                //     label.id=value
                //     label.addEventListener('click', () => {
                //         console.log('房源覆盖物被点击了',label.id);
                //         //放大地图,以当前点击的覆盖物为中心放大地图
                //         map.centerAndZoom(areaPoint,13)
                //         // 清除当前覆盖物信息
                //         map.clearOverlays()
                //     })
                //     map.addOverlay(label)

                // });

            } else {
                alert('您选择的地址没有解析到结果！');
            }
        }, label)
        async function renderOverlays(id) {
            const res = await axios.get(`http://localhost:8080/area/map?id=${id}`)
            console.log(res);
            const data = res.data.body

            // 调用 getTypeAndZoom 方法
            getTypeAndZoom()
            // data.forEach(item => {
            //     createOverlays(item)
            // })
        }
        function getTypeAndZoom() {
            // 调用地图的 getZoom()方法，来获取当前缩放级别
            const zoom = map.getZoom()
            let nextZoom,type
            console.log(zoom);
            if(zoom>=10&&zoom<12){
                // 区
                nextZoom=13
                // circle 表示绘制圆形覆盖物
                type='circle'
            }else if(zoom>=12 && zoom<14){
                // 镇
                nextZoom=15
                type='circle'
            }
        }


    }, [])
    return (
        <div className={styles.map}>
            <NavHeader>地图找房</NavHeader>
            {/* 地图容器 */}
            <div id="container" style={{ height: '100%' }}></div>
        </div>
    )
}

export default Map