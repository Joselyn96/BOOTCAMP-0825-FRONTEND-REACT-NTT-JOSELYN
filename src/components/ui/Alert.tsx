import AlertStyled from './Alert.styled'

interface AlertProps {
  show: boolean
  type: 'success' | 'warning'
  message: string
}

export default function Alert({ show, type, message }: AlertProps) {
  if (!show) return null
  
  return (
    <AlertStyled.AlertContainer type={type}>
      {message}
    </AlertStyled.AlertContainer>
  )
}