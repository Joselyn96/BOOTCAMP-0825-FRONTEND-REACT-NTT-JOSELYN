import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import SecondaryNavbar from '../components/layout/SecondaryNavbar'
import ProfileStyled from './Profile.styled'

const Profile = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // si no está autenticado, redirigir
 useEffect(() => {
  if (!isAuthenticated || !user) {
    navigate('/login')
  }
}, [isAuthenticated, user, navigate])

if (!isAuthenticated || !user) {
  return null
}

  return (
    <ProfileStyled.Container>
      {/* SecondaryNavbar sin búsqueda */}
      <ProfileStyled.NavbarContainer>
        <SecondaryNavbar activeTab="profile" />
      </ProfileStyled.NavbarContainer>

      <ProfileStyled.Content>
        <ProfileStyled.ProfileCard>
          <ProfileStyled.Header>
            <ProfileStyled.Title>Mi Perfil</ProfileStyled.Title>
          </ProfileStyled.Header>

          <ProfileStyled.ProfileContent>
            {/* Columna Izquierda - Avatar */}
            <ProfileStyled.LeftColumn>
              <ProfileStyled.AvatarSection>
                <ProfileStyled.Avatar 
                  src={user.image || '/default-avatar.png'} 
                  alt={`Avatar de ${user.firstName}`}
                  onError={(e) => {
                    e.currentTarget.src = '/default-avatar.png'
                  }}
                />
                <ProfileStyled.AvatarInfo>
                  <ProfileStyled.UserName>
                    {user.firstName} {user.lastName}
                  </ProfileStyled.UserName>
                  <ProfileStyled.UserEmail>@{user.username}</ProfileStyled.UserEmail>
                </ProfileStyled.AvatarInfo>
                
              </ProfileStyled.AvatarSection>
            </ProfileStyled.LeftColumn>

            {/* Columna Derecha - Datos */}
            <ProfileStyled.RightColumn>
              <ProfileStyled.InfoSection>
                <ProfileStyled.SectionTitle>Información Personal</ProfileStyled.SectionTitle>
                
                <ProfileStyled.FormRow>
                  <ProfileStyled.FormGroup>
                    <ProfileStyled.Label>Nombre</ProfileStyled.Label>
                  </ProfileStyled.FormGroup>

                  <ProfileStyled.FormGroup>
                    <ProfileStyled.Label>Apellido</ProfileStyled.Label>
                     (
                      <ProfileStyled.InfoValue>{user.lastName}</ProfileStyled.InfoValue>
                    )
                  </ProfileStyled.FormGroup>
                </ProfileStyled.FormRow>

                <ProfileStyled.FormGroup>
                  <ProfileStyled.Label>Usuario</ProfileStyled.Label> : (
                    <ProfileStyled.InfoValue>{user.username}</ProfileStyled.InfoValue>
                  )
                </ProfileStyled.FormGroup>

                <ProfileStyled.FormGroup>
                  <ProfileStyled.Label>Email</ProfileStyled.Label>
                  : (
                    <ProfileStyled.InfoValue>{user.email}</ProfileStyled.InfoValue>
                  )
                </ProfileStyled.FormGroup>
              </ProfileStyled.InfoSection>
            </ProfileStyled.RightColumn>
          </ProfileStyled.ProfileContent>
        </ProfileStyled.ProfileCard>
      </ProfileStyled.Content>
    </ProfileStyled.Container>
  )
}

export default Profile