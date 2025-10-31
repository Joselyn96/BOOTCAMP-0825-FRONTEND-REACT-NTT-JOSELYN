import styled from "styled-components"

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  position: relative;
`

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255);
  border: none;
  color: #6b7280;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  z-index: 10;

  animation: breathe 2s ease-in-out infinite;

  &:hover {
    color: #22c55e;
    background-color: rgba(255, 255, 255);
    animation-play-state: paused;
  }

  @keyframes breathe {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
    font-size: 0.875rem;
    animation: none;
  }
`


const MainContent = styled.div`
  flex: 1;
  display: flex;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

// Sección de la imagen
const ImageSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #85c4a4ff 0%, #22c55e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    display: none; // La imagen desaparece en móvil
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 600px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
`

// sección del formulario
const FormSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    flex: none;
    min-height: 100vh;
    padding: 1rem;
  }
`

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: none;
  }
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
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #16a34a;
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
  font-size: 1.125rem;

  &:hover {
    color: #374151;
  }
`

const ForgotPasswordLink = styled.a`
  font-size: 0.875rem;
  color: #16a34a;
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
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #16a34a;
  }

  &:active {
    background-color: #16a34a;
  }
`

const LinkText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;
    
  a {
    color: #16a34a;
    text-decoration: none;
        
    &:hover {
      text-decoration: underline;
    }
  }
`

const LoginStyled = {
  Container,
  BackButton,
  MainContent,
  ImageSection,
  Image,
  FormSection,
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