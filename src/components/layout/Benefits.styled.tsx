import styled from 'styled-components'

const Container = styled.section`
  padding: 2rem 1rem;
  background-color: #f9fafb;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
`

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;
  

  @media (max-width: 767px) {
    justify-content: center;
    text-align: center;
  }

  @media (width > 1024px) {
    padding-left: 2.5rem;
  }
`

const Icon = styled.span`
    font-size: 2.5rem;
  color: #22c55e;
  flex-shrink: 0;
  
  /* Estilos específicos para Google Icons */
  &.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.span`
  font-weight: bold;
  font-size: 0.875rem;
  color: #111827;
  line-height: 1;
`

const Subtitle = styled.span`
  font-weight: bold;
  font-size: 0.875rem;
  color: #111827;
  line-height: 1;
`

const BenefitsStyled = {
  Container,
  Grid,
  Item,
  Icon,
  Content,
  Title,
  Subtitle,
}

export default BenefitsStyled