import styled from 'styled-components'

const Container = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 16rem;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 50;
  display: block;

  ${props => props.$isOpen && `
    transform: translateX(0);
  `}

  @media (min-width: 768px) {
    display: none;
  }
`

const Content = styled.div`
  padding: 1rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #22c55e;
`

const CloseBtn = styled.button`
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
`

const CloseIcon = styled.span`
  height: 1.5rem;
  width: 1.5rem;
  color: #6b7280;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const NavLink = styled.a<{ $active?: boolean }>`
  display: block;
  padding: 0.5rem 1rem;
  color: ${props => props.$active ? '#22c55e' : '#374151'};
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #22c55e;
    background-color: rgba(34, 197, 94, 0.05);
  }
`

const Login = styled.div`
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`

const LoginBtn = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #16a34a;
  }
`

const SidebarStyled = {
  Container,
  Content,
  Header,
  Title,
  CloseBtn,
  CloseIcon,
  Nav,
  NavLink,
  Login,
  LoginBtn,
}

export default SidebarStyled