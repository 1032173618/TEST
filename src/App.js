import {BrowserRouter as Router,Route,Routes, useNavigate} from 'react-router-dom'

// 导入首页和城市选择两个组件(页面)
import Home from './pages/Home';
import CityList from './pages/CityList';
import News from './pages/News';
import Index from './pages/Index';
import HouseList from './pages/HouseList';
import Profile from './pages/Profile';
import Map from './pages/Map';
import { useEffect } from 'react';
// import Routers from './router'
const Redirect=({to})=>{
  let navigate=useNavigate()
  // useEffect Hook可以看做componentDidMount、componentDidUpdate和componentWillUnmount这三个函数的组合
  useEffect(()=>{
    navigate(to)
  })
  return null
}
function App() {
  return (
    <Router>
        <div className="App">
      {/* 配置导航菜单 */}
      
      {/* 配置路由 */}
      <Routes>
        {/* 首页路由处理 */}
        {/* 修改首页路由规则为:/home(去掉/index) */}
        {/* 默认路由匹配时,跳转到home */}
        <Route path='/' element={<Redirect to="/home" />} />
        <Route path='/home' element={<Home />}>
          <Route path='news' element={<News />}></Route>
          <Route index element={<Index/>}></Route>
          <Route path='list' element={<HouseList />}></Route>
          <Route path='profile' element={<Profile />}></Route>
        </Route>
        <Route path='/citylist' element={<CityList />}></Route>
        <Route path='/map' element={<Map />}></Route>
      </Routes>
    </div>
      </Router>
    
  );
}

export default App;
