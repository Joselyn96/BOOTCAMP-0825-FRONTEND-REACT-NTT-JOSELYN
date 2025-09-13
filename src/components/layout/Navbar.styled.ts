import styled from 'styled-components'

const Container = styled.nav<{ $isScrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 30;
  border-bottom: 1px solid #e5e7eb;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;

  ${props => props.$isScrolled && `
    background-color: #22c55e;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  `}
`

const ContainerInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`

const Left = styled.div`
  display: flex;
  align-items: center;
`

const MenuBtn = styled.button`
  display: block;
  padding: 0.5rem;
  margin-right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`

const MenuIcon = styled.span<{ $isScrolled: boolean }>`
  height: 1.5rem;
  width: 1.5rem;
  color: ${props => props.$isScrolled ? 'white' : '#22c55e'};
  transition: color 0.3s ease;
`

const Logo = styled.h1<{ $isScrolled: boolean }>`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.$isScrolled ? 'white' : '#22c55e'};
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Links = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

const Link = styled.a<{ $isScrolled: boolean; $secondary?: boolean }>`
  color: ${props => {
    if (props.$isScrolled) return 'white'
    if (props.$secondary) return '#6b7280'
    return '#374151'
  }};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.$isScrolled ? 'white' : '#22c55e'};
  }
`

const LoginBtn = styled.button<{ $isScrolled: boolean }>`
  display: none;
  padding: 0.5rem 1rem;
  background-color: ${props => props.$isScrolled ? 'white' : '#22c55e'};
  color: ${props => props.$isScrolled ? '#22c55e' : 'white'};
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$isScrolled ? 'rgba(255, 255, 255, 0.9)' : '#16a34a'};
  }

  @media (min-width: 768px) {
    display: inline-flex;
  }
`

const NavbarStyled = {
  Container,
  ContainerInner,
  Content,
  Left,
  MenuBtn,
  MenuIcon,
  Logo,
  Right,
  Links,
  Nav,
  Link,
  LoginBtn,
}

export default NavbarStyled