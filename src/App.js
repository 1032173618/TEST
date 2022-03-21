import {Button} from 'antd-mobile'
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom'

// 导入首页和城市选择两个组件(页面)
import Home from './pages/Home';
import CityList from './pages/CityList';
import News from './pages/News';
// import Routers from './router'
function App() {
  return (
    <Router>
        <div className="App">
      项目根组件
      {/* 配置导航菜单 */}
      <Link to="/home">首页</Link>
      <Link to="/citylist">城市选择</Link>
      <Button>登录</Button>
      {/* 配置路由 */}
      <Routes>
        <Route path='/home' element={<Home />}>
          <Route path='news' element={<News />}></Route>
        </Route>
        <Route path='/citylist' element={<CityList />}></Route>
      </Routes>
    </div>
      </Router>
    
  );
}

export default App;
