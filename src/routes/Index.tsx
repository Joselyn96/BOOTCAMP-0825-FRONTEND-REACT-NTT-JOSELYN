import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import LoginPage from '../pages/Login'
import ProductosPage from '../pages/Products'
import ProtectedRoute from './ProtectedRoute'
import { ProductsProvider } from '../contexts/ProductsContext'

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <ProductsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProtectedRoute><ProductosPage /></ProtectedRoute>} />
      </Routes>
      </ProductsProvider>
    </BrowserRouter>
  )
}

export default AppRoutes