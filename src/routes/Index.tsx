import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import LoginPage from '../pages/Login'
import ProductosPage from '../pages/Products'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductosPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes