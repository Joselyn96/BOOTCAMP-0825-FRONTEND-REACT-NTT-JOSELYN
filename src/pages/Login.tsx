import { useState } from 'react'
import Login from '../components/features/Login'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { authService } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setIsLoading(true)
    setError("")

    try {
      console.log("Login attempt:", credentials)

      //se encarga de que service haga el llamado a la api
      const userData = await authService.login(credentials)

      console.log("Login successful:", userData)

      login({
        id: userData.id,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        image: userData.image
      }, userData.accessToken, userData.refreshToken)

      // navegacion con router
      navigate("/products")

    } catch (error) {
      console.error("Login error:", error)
      setError(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToHome = () => {
    navigate("/")
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