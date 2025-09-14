import styled from "styled-components"

// Container de página completa (reemplaza Overlay + Modal)
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fafb;
  padding: 1rem;
`

// Card del formulario (era Modal)
const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 2rem;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
`

const InputWrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;

  &:hover {
    color: #374151;
  }
`

const ForgotPasswordLink = styled.a`
  font-size: 0.875rem;
  color: #3b82f6;
  text-decoration: none;
  align-self: flex-end;
  margin-top: -0.5rem;

  &:hover {
    text-decoration: underline;
  }
`

const HelpText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.4;
  margin: 0.5rem 0;
`

const LoginButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #2563eb;
  }

  &:active {
    background-color: #1d4ed8;
  }
`

const LinkText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  
  a {
    color: #3b82f6;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const LoginStyled = {
  Container,
  Card,
  Title,
  Form,
  InputGroup,
  Label,
  InputWrapper,
  Input,
  PasswordToggle,
  ForgotPasswordLink,
  HelpText,
  LoginButton,
  LinkText,
}

export default LoginStyled