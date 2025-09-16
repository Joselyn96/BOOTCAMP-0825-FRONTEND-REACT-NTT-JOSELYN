import { useState } from "react"
import { useForm } from "react-hook-form"
import LoginStyled from "./Login.styled"
// import LoadingSpinner from "../ui/LoadingSpinner"

// tipo para los datos del formulario
interface LoginFormData {
  username: string
  password: string
}

interface LoginProps {
  onSubmit: (credentials: LoginFormData) => void
  onBackToHome: () => void
  onForgotPassword?: () => void 
  isLoading: boolean
  error?: string
}

const Login = ({ onSubmit, onBackToHome, onForgotPassword, isLoading, error }: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false)
// react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

// funcion del submit del formulario
  const onSubmitHandler = (data: LoginFormData) => {
    console.log("Form Data:", data)
    onSubmit(data)
  }
  
  return (
    <LoginStyled.Container>
      <LoginStyled.MainContent>
        <LoginStyled.ImageSection>
          <LoginStyled.Image 
            src="/comprando.png"
            alt="persona comprando en línea"
          />
        </LoginStyled.ImageSection>
        
        <LoginStyled.FormSection>
          <LoginStyled.Card>
            <LoginStyled.BackButton onClick={onBackToHome}>
              ← Back to Home
            </LoginStyled.BackButton>
            <LoginStyled.Title>Log in to shop</LoginStyled.Title>
                  {/* Mostrar error global si existe */}
            {error && (
              <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </div>
            )}  

            <LoginStyled.Form onSubmit={handleSubmit(onSubmitHandler)}>
              <LoginStyled.InputGroup>
                <LoginStyled.Label>Username</LoginStyled.Label>
                <LoginStyled.Input
                  type="text"
                  placeholder="your_username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters"
                    }
                  })}
                />
                {/* Mostrar error de validación */}
                {errors.username && (
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>
                    {errors.username.message}
                  </span>
                )}
              </LoginStyled.InputGroup>

              <LoginStyled.InputGroup>
                <LoginStyled.Label>Password</LoginStyled.Label>
                <LoginStyled.InputWrapper>
                  <LoginStyled.Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Password must be at least 4 characters"
                      }
                    })}
                  />
                  <LoginStyled.PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </LoginStyled.PasswordToggle>
                </LoginStyled.InputWrapper>
                             {/* Mostrar error de validación */}
                {errors.password && (
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>
                    {errors.password.message}
                  </span>
                )}
                {onForgotPassword ? (
  <LoginStyled.ForgotPasswordLink 
    as="button"
    type="button"
    onClick={onForgotPassword}
    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
  >
    forgot password?
  </LoginStyled.ForgotPasswordLink>
) : (
  <LoginStyled.ForgotPasswordLink href="/forgot-password">
    forgot password?
  </LoginStyled.ForgotPasswordLink>
)}
              </LoginStyled.InputGroup>
              <LoginStyled.LoginButton type="submit" disabled={isLoading}>
              Log In
              </LoginStyled.LoginButton>
            </LoginStyled.Form>

            <LoginStyled.LinkText>
              Don't have an account? <a href="/register">Sign up here</a>
            </LoginStyled.LinkText>
          </LoginStyled.Card>
        </LoginStyled.FormSection>
      </LoginStyled.MainContent>
    </LoginStyled.Container>
  )
}

export default Login