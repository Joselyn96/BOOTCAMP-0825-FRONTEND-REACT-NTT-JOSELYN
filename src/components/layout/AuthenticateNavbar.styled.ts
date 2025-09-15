import styled from 'styled-components'

const NavContainer = styled.nav`
  background: white;
  border-bottom: 1px solid #e1e5e9;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.5rem;
  }
`

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    color: #28a745;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    gap: 0.3rem;
  }
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #333;
  font-size: 0.9rem;
  position: relative;

  &:hover {
    color: #28a745;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    gap: 0.2rem;
  }
`

const Badge = styled.span`
  background: #ff6b6b;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  position: absolute;
  top: -8px;
  right: -8px;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    font-size: 0.6rem;
  }
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    gap: 0.3rem;
  }
`

const MaterialIcon = styled.span`
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 20px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const AuthenticatedNavbarStyled = {
  NavContainer,
  NavItem,
  IconButton,
  Badge,
  UserInfo,
  MaterialIcon
}

export default AuthenticatedNavbarStyled