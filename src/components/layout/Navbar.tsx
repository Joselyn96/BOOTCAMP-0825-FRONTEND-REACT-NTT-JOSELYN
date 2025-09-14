import NavbarStyled from './Navbar.styled'
import { NavLink } from 'react-router-dom'

interface NavbarProps {
  isScrolled: boolean
  onToggleSidebar: () => void
}

const Navbar = ({ isScrolled, onToggleSidebar }: NavbarProps) => {
  return (
    <NavbarStyled.Container $isScrolled={isScrolled}>
      <NavbarStyled.ContainerInner>
        <NavbarStyled.Content>
          <NavbarStyled.Left>
            <NavbarStyled.MenuBtn onClick={onToggleSidebar}>
              <NavbarStyled.MenuIcon $isScrolled={isScrolled}>☰</NavbarStyled.MenuIcon>
            </NavbarStyled.MenuBtn>
            <NavbarStyled.Logo $isScrolled={isScrolled}>dummyStore</NavbarStyled.Logo>
          </NavbarStyled.Left>
          <NavbarStyled.Right>
            <NavbarStyled.Links>
              <NavbarStyled.Nav>
                <NavbarStyled.Link href="#" $isScrolled={isScrolled}>Home</NavbarStyled.Link>
                <NavbarStyled.Link href="#" $isScrolled={isScrolled} $secondary>About</NavbarStyled.Link>
                <NavbarStyled.Link href="#" $isScrolled={isScrolled} $secondary>Contact</NavbarStyled.Link>
              </NavbarStyled.Nav>
            </NavbarStyled.Links>
            <NavbarStyled.LoginBtn as={NavLink} to="/login" $isScrolled={isScrolled}>Login</NavbarStyled.LoginBtn>
          </NavbarStyled.Right>
        </NavbarStyled.Content>
      </NavbarStyled.ContainerInner>
    </NavbarStyled.Container>
  )
}

export default Navbar