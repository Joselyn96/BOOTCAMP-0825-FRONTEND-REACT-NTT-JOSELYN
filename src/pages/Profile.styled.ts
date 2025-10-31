import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  background-color: #ffffffff;
`

const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  /* Ocultar el input de búsqueda en el navbar */
  .search-container-relative,
  .search-error-message {
    display: none !important;
  }
`

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  background: linear-gradient(135deg, #85c4a4ff 0%, #22c55e 100%);
  color: white;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 8px 15px;
    text-align: center;
  }
`

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  padding: 40px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 30px 25px;
  }
  
  @media (max-width: 480px) {
    padding: 25px 20px;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`

const Avatar = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 25px;
  transition: all 0.3s ease;

  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
  
  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`

const AvatarInfo = styled.div`
  width: 100%;
`

const UserName = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 8px 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const UserEmail = styled.p`
  font-size: 1.1rem;
  color: #667eea;
  margin: 0 0 5px 0;
  font-weight: 500;
`

const UserId = styled.p`
  font-size: 0.9rem;
  color: #a0aec0;
  margin: 0;
`

const ChangePhotoButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  }
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const SectionTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  padding-bottom: 5px;
  border-bottom: 2px solid #e2e8f0;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-weight: 600;
  color: #4a5568;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const InfoValue = styled.div`
  padding: 8px 12px;
  background-color: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1.1rem;
  color: #2d3748;
  min-height: 22px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #cbd5e0;
  }
`

const Input = styled.input`
  padding: 10px 9px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1.1rem;
  color: #2d3748;
  transition: all 0.3s ease;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover:not(:focus) {
    border-color: #cbd5e0;
  }
`


const ProfileStyled = {
  Container,
  NavbarContainer,
  Content,
  ProfileCard,
  Header,
  Title,
  ProfileContent,
  LeftColumn,
  RightColumn,
  AvatarSection,
  Avatar,
  AvatarInfo,
  UserName,
  UserEmail,
  UserId,
  ChangePhotoButton,
  InfoSection,
  SectionTitle,
  FormRow,
  FormGroup,
  Label,
  InfoValue,
  Input,
}

export default ProfileStyled