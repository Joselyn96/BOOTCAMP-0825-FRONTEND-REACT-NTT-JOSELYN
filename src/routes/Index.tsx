import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import LoginPage from '../pages/Login'
import ProductosPage from '../pages/Products'
import ProtectedRoute from './ProtectedRoute'
import { ProductsProvider } from '../contexts/ProductsContext'
import Profile from '../pages/Profile'
import Cart from '../pages/Cart'
import { CartProvider } from '../contexts/CartContext'

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <ProductsProvider>
      <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProtectedRoute><ProductosPage /></ProtectedRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route 
            path="/profile" 
            element={
                <Profile />
            } 
          />
      </Routes>
      </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  )
}

export default AppRoutes