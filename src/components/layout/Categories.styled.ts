import styled from 'styled-components'

const DURATION = '180ms';
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const Container = styled.section`
  padding: 3rem 0;

  @media (min-width: 640px) {
    padding: 4rem 0;
  }
`

const ContainerInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    margin-bottom: 3rem;
  }
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--text-primary);

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.25rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 32rem;
  margin: 0 auto;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 2rem;
  }
`
// box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

const ImageWrapper = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  margin: 0 auto 0.75rem;
  border-radius: 50%;
  overflow: hidden;
  transition: border-color 0.3s ease;

  border: 2px solid transparent;
  transition: border-color ${DURATION} ${EASE};

  @media (min-width: 640px) {
    width: 6rem;
    height: 6rem;
    margin-bottom: 1rem;
  }
`

const Image = styled.img.attrs({
  loading: 'lazy',
  decoding: 'async',
})`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translateZ(0);
  will-change: transform;
  transition: transform ${DURATION} ${EASE};
`

const Name = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
  transition: color ${DURATION} ${EASE};

  @media (min-width: 640px) {
    font-size: 1.125rem;
  }
`
const Item = styled.div`
  text-align: center;
  cursor: pointer;
  will-change: transform;
  transition: transform ${DURATION} ${EASE};

  &:hover {
    transform: translate3d(0, -6px, 0) scale(1.04);
  }

  /* 👇 Hover apuntando a los componentes */
  &:hover ${ImageWrapper} { 
  border-color: var(--primary, #16a34a); 
  }
  &:hover ${Image} { 
  transform: translateZ(0) scale(1.06); 
  }
  &:hover ${Name} { 
  color: var(--primary, #16a34a); 
  }
`

const Description = styled.p`
  font-size: 0.75rem;
  color: var(--text-secondary);
  display: none;

  @media (min-width: 640px) {
    display: block;
    font-size: 0.875rem;
  }
`

const CategoriesStyled = {
  Container,
  ContainerInner,
  Header,
  Title,
  Subtitle,
  Grid,
  Item,
  ImageWrapper,
  Image,
  Name,
  Description,
}

export default CategoriesStyled