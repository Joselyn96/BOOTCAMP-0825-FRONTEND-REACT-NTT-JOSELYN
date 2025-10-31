import { useState } from 'react'
import Login from '../components/features/Login'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { authService } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Modal from '../components/ui/Modal'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [forgotPasswordError, setForgotPasswordError] = useState<string>("")
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
      const errorMessage = error instanceof Error ? error.message : 'Credenciales incorrectas'
      setError(errorMessage)
      setShowErrorModal(true) // modal de error
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToHome = () => {
    navigate("/")
  }

  const handleCloseErrorModal = () => {
    setShowErrorModal(false)
    setError("")
  }

  const handleForgotPassword = () => {
    console.log("handleForgotPassword called!")
    setForgotPasswordError("")
    setShowForgotModal(true)
  }

  const handleSendResetEmail = async (email: string) => {
    setIsLoading(true)
    setForgotPasswordError("")
    
    try {
      const result = await authService.requestPasswordReset(email)
      
      console.log('Resultado:', result.message)
      
      setShowForgotModal(false)
      setShowSuccessModal(true)
      
    } catch (error) {
      console.error('Error al procesar email:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error al procesar email'
      setForgotPasswordError(errorMessage)
      
    } finally {
      setIsLoading(false)
    }
  }

  console.log("showForgotModal state:", showForgotModal)

  return (
    <>
      <Login
        onSubmit={handleLogin}
        onBackToHome={handleBackToHome}
        onForgotPassword={handleForgotPassword}
        isLoading={isLoading}
        error="" //mostramos error aquí
      />
      
      <LoadingSpinner show={isLoading} />
      <Modal 
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        type="error"
        title="Error de autenticación"
        description={error || "Las credenciales ingresadas no son correctas"}
        confirmText="Entendido"
      />
      <Modal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="error"
        title="Email procesado"
        description="Recibirás un enlace de recuperación en tu bandeja de entrada."
        confirmText="Entendido"
      />

      {/* modal de recuperar contraseña */}
      <Modal
        isOpen={showForgotModal}
        onClose={() => {
          setShowForgotModal(false)
          setForgotPasswordError("")
        }}
        type="forgot-password"
        title="Recuperar contraseña"
        description="Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña."
        onSend={handleSendResetEmail}
        cancelText="Cancelar"
        sendText="Enviar"
        isLoading={isLoading}
        errorMessage={forgotPasswordError}
      />
    </>
  )
}

export default LoginPage