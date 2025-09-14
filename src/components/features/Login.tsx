import { useState } from "react"
import LoginStyled from "./Login.styled"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password })
    // Aquí manejarías la lógica de login
  }

  return (
    <LoginStyled.Container>
      <LoginStyled.Card>
        <LoginStyled.Title>Iniciar Sesión</LoginStyled.Title>
        
        <LoginStyled.Form onSubmit={handleSubmit}>
          <LoginStyled.InputGroup>
            <LoginStyled.Label>Correo electrónico</LoginStyled.Label>
            <LoginStyled.Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu@email.com"
              required 
            />
          </LoginStyled.InputGroup>

          <LoginStyled.InputGroup>
            <LoginStyled.Label>Contraseña</LoginStyled.Label>
            <LoginStyled.InputWrapper>
              <LoginStyled.Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                required
              />
              <LoginStyled.PasswordToggle 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "X" : "Y"}
              </LoginStyled.PasswordToggle>
            </LoginStyled.InputWrapper>
            
            <LoginStyled.ForgotPasswordLink href="/forgot-password">
              ¿Olvidaste tu contraseña?
            </LoginStyled.ForgotPasswordLink>
          </LoginStyled.InputGroup>

          <LoginStyled.HelpText>
            ¿Olvidaste tu contraseña? No te preocupes, solicita un código de verificación por email o SMS para cambiarla.
          </LoginStyled.HelpText>

          <LoginStyled.LoginButton type="submit">
            Iniciar Sesión
          </LoginStyled.LoginButton>
        </LoginStyled.Form>

        <LoginStyled.LinkText>
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </LoginStyled.LinkText>
      </LoginStyled.Card>
    </LoginStyled.Container>
  )
}

export default Login