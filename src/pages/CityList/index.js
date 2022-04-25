import React, { FC, useEffect, useRef, useState } from "react";
import {  Toast } from "antd-mobile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCurrentCity } from "../../utils";
import { List, AutoSizer } from 'react-virtualized'
import NavHeader from "../../components/NavHeader";
import styles from './index.module.less'
//   函数的返回值就表示最终渲染在页面中的内容
// 封装处理字母索引的方法
const formatCityIndex = (letter) => {
    switch (letter) {
        case '#':
            return '当前定位';
        case 'hot':
            return '热门城市';
        default:
            return letter.toUpperCase()
    }
}
const TITLE_HEIGHT = 36
const NAME_HEIGHT = 50
const HOUSE_CITY=['北京','上海','广州','深圳']
const CityList:FC = () => {
    const navigate = useNavigate()
    // 获取城市列表数据
    let [cityList, setCityList] = useState({})
    let [cityIndex, setCityIndex] = useState([])
    let [Index,setIndex]=useState(0)
    const cityListComponent = React.createRef()
    const listRef = useRef(cityList)
    const indexRef = useRef(cityIndex)
    // 需要将数据处理为根据索引顺序排布的格式
    const formatCityData = (list) => {
        const cityList = {};
        list.forEach(Item => {
            const first = Item.short.slice(0, 1)
            if (first in cityList) {
                cityList[first].push(Item)
            } else {
                cityList[first] = [Item]
            }
        })
        const cityIndex = Object.keys(cityList).sort()
        return {
            cityList,
            cityIndex
        }
    }
    const changeCity=({label,value})=>{
        if(HOUSE_CITY.indexOf(label)>-1){
            // 有
            localStorage.setItem('hkzf_city',JSON.stringify({label,value}))
            navigate(-1)
        }else{
            Toast.show({
                content:'该城市暂无房源数据',
              duration:2000
            })
        }
    }
   
    function rowRenderer({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled 当前项是否正在滚动中
        isVisible, // 在当前项在 List 中是可见的 This row is visible within the List (eg it is not an overscanned row)
        style, // 注意:重点属性,一定要给每一个数据添加该样式! 作用:指定每一行的位置 Style object to be applied to row (to position it)
    }) {
        const letter = indexRef.current[index]
        return (
            <div key={key} style={style} className={styles.city}>
                <div className={styles.title}>{formatCityIndex(letter)}</div>
                {
                    listRef.current[letter].map(item => (<div className={styles.name} key={item.value} onClick={()=>changeCity(item)}>{item.label}</div>))
                }
            </div>
        );
    }
    // 创建动态计算每一行高度的方法
    function getRowHeight({ index }) {
        return TITLE_HEIGHT + NAME_HEIGHT * listRef.current[indexRef.current[index]].length
    }

    // 渲染右侧索引列表的方法
    const renderCityIndex = () => {
        // 获取到 cityIndex 并遍历其,实现渲染
        return indexRef.current.map((item, index) => (<li className={styles.cityIndexItem} key={item}>
            <span className={index === Index ? styles.indexActive : null} onClick={() => setIndex(index)}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
        </li>))
    }
    // 用于获取List组件中渲染行的信息
    const onRowsRendered = ({ startIndex }) => {
        if (Index !== startIndex) {
            setIndex(startIndex)
        }

    }
    
    useEffect(() => {
        const getHot = async () => {
            const res = await axios.get('http://localhost:8080/area/hot')
            return { hotIndex: ['hot'], hotList: { hot: res.data.body } }
        }
        const getCityList = async () => {
            let res = await axios.get('http://localhost:8080/area/city', {
                params: {
                    level: 1
                }
            })

            const { cityIndex: index, cityList: list } = formatCityData(res.data.body)
            return { index, list }
        }
        const getAllList = async () => {
            let { list, index } = await getCityList()
            let { hotIndex, hotList } = await getHot()
            let curCity = await getCurrentCity()
            listRef.current = { '#': [curCity], ...hotList, ...list }
            indexRef.current = ['#', ...hotIndex, ...index]
            setCityIndex(['#', ...hotIndex, ...index])
            setCityList({ '#': [curCity], ...hotList, ...list })

        }
        getAllList()
        if (indexRef.current.length) {
            // 调用该方法的时候,需要保证List组件中已经有数据了!如果List组件中的数据为空该数据会报错
            cityListComponent.current.measureAllRows()
        }
    }, [])

    
    return (<div className={styles.citylist}>
       
        <NavHeader>
            城市选择
        </NavHeader>
        {/* 城市列表 */}
        <AutoSizer style={{ height: '100%' }}>
            {
                ({ width, height }) => <List
                    ref={cityListComponent}
                    width={width}
                    height={height}
                    rowCount={indexRef.current.length}
                    rowHeight={getRowHeight}
                    rowRenderer={rowRenderer}
                    onRowsRendered={onRowsRendered}
                    scrollToIndex={Index}
                    scrollToAlignment='start'
                />
            }
        </AutoSizer>
        <ul className={styles.cityIndex}>
            {renderCityIndex()}
        </ul>
    </div>)

}
export default CityList