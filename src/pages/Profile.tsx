import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import SecondaryNavbar from '../components/layout/SecondaryNavbar'
import ProfileStyled from './Profile.styled'

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    username: user?.username || ''
  })

  // si no está autenticado, redirigir
 useEffect(() => {
  if (!isAuthenticated || !user) {
    navigate('/login')
  }
}, [isAuthenticated, user, navigate])

if (!isAuthenticated || !user) {
  return null
}

  const handleEditToggle = () => {
    if (isEditing) {
      // cancelar edición, restaurar valores originales
      setEditForm({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        username: user?.username || ''
      })
    }
    setIsEditing(!isEditing)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveProfile = () => {
    // Aquí implementarías la lógica para guardar los cambios
    console.log('Guardando perfil:', editForm)
    alert('Perfil actualizado exitosamente')
    setIsEditing(false)
  }

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout()
      navigate('/login')
    }
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
                
                {isEditing && (
                  <ProfileStyled.ChangePhotoButton>
                    Cambiar Foto
                  </ProfileStyled.ChangePhotoButton>
                )}
              </ProfileStyled.AvatarSection>
            </ProfileStyled.LeftColumn>

            {/* Columna Derecha - Datos */}
            <ProfileStyled.RightColumn>
              <ProfileStyled.InfoSection>
                <ProfileStyled.SectionTitle>Información Personal</ProfileStyled.SectionTitle>
                
                <ProfileStyled.FormRow>
                  <ProfileStyled.FormGroup>
                    <ProfileStyled.Label>Nombre</ProfileStyled.Label>
                    {isEditing ? (
                      <ProfileStyled.Input
                        type="text"
                        name="firstName"
                        value={editForm.firstName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <ProfileStyled.InfoValue>{user.firstName}</ProfileStyled.InfoValue>
                    )}
                  </ProfileStyled.FormGroup>

                  <ProfileStyled.FormGroup>
                    <ProfileStyled.Label>Apellido</ProfileStyled.Label>
                    {isEditing ? (
                      <ProfileStyled.Input
                        type="text"
                        name="lastName"
                        value={editForm.lastName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <ProfileStyled.InfoValue>{user.lastName}</ProfileStyled.InfoValue>
                    )}
                  </ProfileStyled.FormGroup>
                </ProfileStyled.FormRow>

                <ProfileStyled.FormGroup>
                  <ProfileStyled.Label>Usuario</ProfileStyled.Label>
                  {isEditing ? (
                    <ProfileStyled.Input
                      type="text"
                      name="username"
                      value={editForm.username}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <ProfileStyled.InfoValue>{user.username}</ProfileStyled.InfoValue>
                  )}
                </ProfileStyled.FormGroup>

                <ProfileStyled.FormGroup>
                  <ProfileStyled.Label>Email</ProfileStyled.Label>
                  {isEditing ? (
                    <ProfileStyled.Input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <ProfileStyled.InfoValue>{user.email}</ProfileStyled.InfoValue>
                  )}
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