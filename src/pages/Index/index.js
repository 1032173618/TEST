import React, { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Swiper, Toast, Image } from 'antd-mobile'
import axios from 'axios'
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
import styles from './index.module.less'
import {getCurrentCity} from '../../utils'

// 导航菜单组件
const MenuItems: FC = () => {
  const menu = [{
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home'
  }, {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map'
  }, {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent'
  },
  ]
  let navigate = useNavigate()
  return menu.map((item) => (
    <Grid.Item key={item.id} className={styles.nav} onClick={() => navigate(item.path)}>
      <img src={item.img} alt=''></img>
      <h2>{item.title}</h2>
    </Grid.Item>
  ))
}




// 渲染搜索框
const RenderSearch:FC=(props)=>{
  let navigate=useNavigate()
  return (
    <Grid columns={12} className={styles.searchBox} >
      <Grid.Item className={styles.search} span={11}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          {/* 位置 */}
          <div className={styles.location} onClick={()=>navigate('/citylist')}>
            <span>{props.curCityName}</span>
            <i className='iconfont icon-arrow-sortdown-smal'></i>
          </div>
          {/* 搜索表单 */}
          <div className={styles.form} onClick={()=>navigate('/search')}>
            <i className='iconfont icon-sousuo'></i>
            <span>请输入小区或地址</span>
          </div>
        </div>
      </Grid.Item>
      {/* 右侧地图图标 */}
      <Grid.Item className={styles.icon} span={1} onClick={()=>navigate('/map')}>
        <i className='iconfont icon-dituzhaofang'></i>
      </Grid.Item>
    </Grid>
  )
}
// 渲染租房小组
const renderGroups = (group) => {
  return group.map((item) => (
    <Grid.Item key={item.id}>
      <div className={styles.flexaround}>
        <div className={styles.desc}>
          <p>{item.title}</p>
          <span>{item.desc}</span>
        </div>
        <img src={"http://localhost:8080" + item.imgSrc} alt=''></img>
      </div>


    </Grid.Item>
  ))
}
// 渲染最新资讯
const renderNews = (news) => {
  return news.map((item) => (
    <div key={item.id} className={styles.newsItem}>
      <div>
        <Image src={`http://localhost:8080${item.imgSrc}`}></Image>
      </div>
      <div>
        <h3>{item.title}</h3>
        <div>
          <span>{item.from}</span>
          <span>{item.date}</span>
        </div>
      </div>
    </div>
  ))
}
const Index: FC = () => {
  // 获取轮播图数据
  let [swipers, setSwipers] = useState([])
  // 租房小组数据
  let [group, setGroups] = useState([])
  // 资讯数据
  let [news, setNews] = useState([])
  // 当前城市名称
 let [curCityName,setcurCityName]=useState('')
  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get('http://localhost:8080/home/swiper')
      setSwipers(res.data.body)
    }
    const getGroups = async () => {
      let res = await axios.get('http://localhost:8080/home/groups', {
        params: {
          area: 'AREA|88cff55c-aaa4-e2e0'
        }
      })
      setGroups(res.data.body)
    }
    const getNews = async () => {
      let res = await axios.get('http://localhost:8080/home/news', {
        params: {
          area: 'AREA|88cff55c-aaa4-e2e0'
        }
      })
      setNews(res.data.body)
    }
    const getMap=async ()=>{
   const curCity= await  getCurrentCity()
   setcurCityName(curCity.label)
  }

  
  // 开启SDK辅助定位
  // const geolocation = new window.BMapGL.Geolocation()
  // geolocation.enableSDKLocation()
  // geolocation.getCurrentPosition(function (r) {
  //     if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {            
  //         getMap(r.address.city)
  //         setcurCityName(r.address.city)  
  //     }
  //     else {
  //       Toast.show({ content: 'failed'+this.getStatus(),
  //       duration: 1000,})
  //     }
  // })
    fetchData()
    getGroups()
    getNews()
    getMap()
  }, [])
  // 轮播图组件数据
  const items = swipers.map((item, index) => (
    <Swiper.Item key={index}>
      <div
        className={styles.content}
        style={{ backgroundImage: `url(http://localhost:8080${item.imgSrc})`, backgroundSize: '100%', width: '100%', height: 212 }}
        onClick={() => {
          Toast.show(`你点击了卡片 ${index + 1}`)
        }}
      >
      </div>
    </Swiper.Item>
  ))
  return (
    <div>
      <div style={{position:'relative'}}>
      <Swiper autoplay loop style={{position:'relative'}}>
        {items}
      </Swiper>
      <RenderSearch curCityName={curCityName} />
      </div>
     
      <Grid columns={4} gap={0} style={{ background: '#fff', margin: '5px 0' }}>
        <MenuItems />
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', lineHeight: '16px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>租房小组</div>
        <div>更多</div>
      </div>
      <Grid columns={2} gap={2} className={styles.gap2}>
        {renderGroups(group)}
      </Grid>
      <div style={{width:'100%',backgroundColor:'#fff'}}>
        <h3 style={{width:'92%',margin:'0 auto'}}>最新资讯</h3>
     { renderNews(news)}
      </div>
    </div>
  )
}
export default Index