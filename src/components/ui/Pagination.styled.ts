import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    gap: 0.25rem;
    margin: 1.5rem 0;
  }
`

const Button = styled.button<{ isActive?: boolean; disabled?: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  background: ${props => 
    props.isActive ? '#28a745' : 
    props.disabled ? '#f9fafb' : 'white'
  };
  color: ${props => 
    props.isActive ? 'white' : 
    props.disabled ? '#9ca3af' : '#374151'
  };
  border-radius: 6px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: ${props => props.isActive ? '600' : '500'};
  font-size: 0.875rem;
  transition: all 0.2s ease;
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => 
      props.disabled ? '#f9fafb' :
      props.isActive ? '#2a8d3fff' : '#f3f4f6'
    };
    border-color: ${props => 
      props.disabled ? '#d1d5db' :
      props.isActive ? '#2a8d3fff' : '#9ca3af'
    };
  }
  
  &:active {
    transform: ${props => props.disabled ? 'none' : 'scale(0.95)'};
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    min-width: 36px;
    height: 36px;
    font-size: 0.8rem;
  }
`

const NavigationButton = styled(Button)`
  font-weight: 600;
  font-size: 1rem;
  
  &:disabled {
    opacity: 0.5;
  }
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const PageButton = styled(Button)`
  font-variant-numeric: tabular-nums;
`

const PaginationStyled = {
  Container,
  Button,
  NavigationButton,
  PageButton,
}

export default PaginationStyled