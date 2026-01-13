import "./Styles/global.css";
import User from './components/User';
import Products from './components/Products';
import Categories from './components/Categories';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import { Routes, Route } from "react-router-dom"

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<Admin/>} >
      <Route index element={<Dashboard />} />
      <Route path='/user' element={<User/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/dashboard' element={<Dashboard/>} />
      </Route>
     </Routes>
        
    </>
  )
}

export default App