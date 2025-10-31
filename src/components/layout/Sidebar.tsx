import SidebarStyled from './Sidebar.styled'
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <SidebarStyled.Container $isOpen={isOpen}>
      <SidebarStyled.Content>
        <SidebarStyled.Header>
          <SidebarStyled.Title>dummyStore</SidebarStyled.Title>
          <SidebarStyled.CloseBtn onClick={onClose}>
            <SidebarStyled.CloseIcon>✕</SidebarStyled.CloseIcon>
          </SidebarStyled.CloseBtn>
        </SidebarStyled.Header>
        <SidebarStyled.Nav>
          <SidebarStyled.NavLink href="#" $active onClick={onClose}>
            Home
          </SidebarStyled.NavLink>
          <SidebarStyled.NavLink href="#" onClick={onClose}>
            About
          </SidebarStyled.NavLink>
          <SidebarStyled.NavLink href="#" onClick={onClose}>
            Contact
          </SidebarStyled.NavLink>
          <SidebarStyled.Login>
            <SidebarStyled.LoginBtn as={Link} to="/login">Login</SidebarStyled.LoginBtn>
          </SidebarStyled.Login>
        </SidebarStyled.Nav>
      </SidebarStyled.Content>
    </SidebarStyled.Container>
  )
}

export default Sidebar