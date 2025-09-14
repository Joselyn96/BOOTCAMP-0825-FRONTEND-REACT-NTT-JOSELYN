import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import LoginPage from '../pages/Login'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes