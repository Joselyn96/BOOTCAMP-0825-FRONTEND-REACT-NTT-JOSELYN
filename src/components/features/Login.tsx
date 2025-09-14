import { useState } from "react"
import LoginStyled from "./Login.styled"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password })
  }

  const handleBackToHome = () => {
    
    window.location.href = "/"
    
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
            <LoginStyled.BackButton onClick={handleBackToHome}>
              ← Back to Home
            </LoginStyled.BackButton>
            <LoginStyled.Title>Log in to shop</LoginStyled.Title>
                    
            <LoginStyled.Form onSubmit={handleSubmit}>
              <LoginStyled.InputGroup>
                <LoginStyled.Label>Email address</LoginStyled.Label>
                <LoginStyled.Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
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
                            
                <LoginStyled.ForgotPasswordLink href="/forgot-password">
                  forgot password?
                </LoginStyled.ForgotPasswordLink>
              </LoginStyled.InputGroup>
              <LoginStyled.LoginButton type="submit">
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