import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated)
    
    if (!isAuthenticated) {
      console.log('Usuario no autenticado, redirigiendo a /login')
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  // verrificamos el estado de autenticación
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute