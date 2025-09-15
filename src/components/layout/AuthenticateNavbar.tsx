import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import AuthenticatedNavbarStyled from './AuthenticateNavbar.styled'

interface AuthenticatedNavbarProps {
  onCartClick?: () => void
  cartItemCount?: number
}

const AuthenticatedNavbar = ({ 
  onCartClick, 
  cartItemCount = 0, 
}: AuthenticatedNavbarProps) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AuthenticatedNavbarStyled.NavContainer>
      <AuthenticatedNavbarStyled.UserInfo>
        <AuthenticatedNavbarStyled.MaterialIcon>person</AuthenticatedNavbarStyled.MaterialIcon>
        <span>{user?.firstName || 'User'}</span>
      </AuthenticatedNavbarStyled.UserInfo>
      <AuthenticatedNavbarStyled.IconButton>
        <AuthenticatedNavbarStyled.MaterialIcon>favorite</AuthenticatedNavbarStyled.MaterialIcon>
      </AuthenticatedNavbarStyled.IconButton>
      <AuthenticatedNavbarStyled.IconButton onClick={onCartClick}>
        <AuthenticatedNavbarStyled.MaterialIcon>shopping_cart</AuthenticatedNavbarStyled.MaterialIcon>
        {cartItemCount > 0 && <AuthenticatedNavbarStyled.Badge>{cartItemCount}</AuthenticatedNavbarStyled.Badge>}
      </AuthenticatedNavbarStyled.IconButton>
      <AuthenticatedNavbarStyled.NavItem onClick={handleLogout}>
        <AuthenticatedNavbarStyled.MaterialIcon>logout</AuthenticatedNavbarStyled.MaterialIcon>
      </AuthenticatedNavbarStyled.NavItem>
    </AuthenticatedNavbarStyled.NavContainer>
  )
}

export default AuthenticatedNavbar