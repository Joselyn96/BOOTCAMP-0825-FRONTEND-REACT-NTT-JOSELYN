import { useState } from "react"
import LoginStyled from "./Login.styled"
// import LoadingSpinner from "../ui/LoadingSpinner"


interface LoginProps {
  onSubmit: (credentials: { username: string; password: string }) => void
  onBackToHome: () => void
  isLoading: boolean
  error?: string
}

const Login = ({ onSubmit, onBackToHome, isLoading, error }: LoginProps) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username || !password) {
      alert("Please complete all fields")
      return
    }
    onSubmit({ username, password })
  
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
                    
            <LoginStyled.Form onSubmit={handleSubmit}>
              <LoginStyled.InputGroup>
                <LoginStyled.Label>Username</LoginStyled.Label>
                <LoginStyled.Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your_username"
                  required
                  // revisar este isloading
                  disabled={isLoading}
                />
              </LoginStyled.InputGroup>

              <LoginStyled.InputGroup>
                <LoginStyled.Label>Password</LoginStyled.Label>
                <LoginStyled.InputWrapper>
                  <LoginStyled.Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    required
                    disabled={isLoading}
                  />
                  <LoginStyled.PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </LoginStyled.PasswordToggle>
                </LoginStyled.InputWrapper>
                            
                <LoginStyled.ForgotPasswordLink href="/forgot-password">
                  forgot password?
                </LoginStyled.ForgotPasswordLink>
              </LoginStyled.InputGroup>
              {/* revisar */}
              {error && (
                <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                  {error}
                </div>
              )}
              {/* revisar */}
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