import LoadingSpinnerStyled from './LoadingSpinner.styled'

interface LoadingSpinnerProps {
  show: boolean
}

export default function LoadingSpinner({ show }: LoadingSpinnerProps) {
  if (!show) return null

  return (
    <LoadingSpinnerStyled.LoadingOverlay>
      <LoadingSpinnerStyled.Spinner />
    </LoadingSpinnerStyled.LoadingOverlay>
  )
}