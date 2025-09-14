import { useState } from 'react'
import Login from '../components/features/Login'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { authService } from '../services/authService'

const LoginPage = () => {
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string>("")

const handleLogin = async (credentials: { username: string; password: string }) => {
    setIsLoading(true)
    setError("")
    
    try {
      console.log("Login attempt:", credentials)
      
      // Delega la llamada API al servicio
      const userData = await authService.login(credentials)
      
      console.log("Login successful:", userData)
      
      // Maneja qué hacer con los datos (localStorage, navegación)
      localStorage.setItem('accessToken', userData.accessToken)
      localStorage.setItem('refreshToken', userData.refreshToken)
      
      // Decide a dónde navegar
      window.location.href = "/products"
      
    } catch (error) {
      console.error("Login error:", error)
      setError(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToHome = () => {
    window.location.href = "/"
  }

  return (
    <>
      <Login
        onSubmit={handleLogin}
        onBackToHome={handleBackToHome}
        isLoading={isLoading}
        error={error}
      />
      <LoadingSpinner show={isLoading} />
    </>
  )
}

export default LoginPage