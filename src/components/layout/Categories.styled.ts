import styled from 'styled-components'

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

const Item = styled.div`
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:hover .category-image-wrapper {
    border-color: var(--primary-color);
  }

  &:hover .category-image {
    transform: scale(1.1);
  }

  &:hover .category-name {
    color: var(--primary-color);
  }
`

const ImageWrapper = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  margin: 0 auto 0.75rem;
  border-radius: 50%;
  overflow: hidden;
  transition: border-color 0.3s ease;

  @media (min-width: 640px) {
    width: 6rem;
    height: 6rem;
    margin-bottom: 1rem;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`

const Name = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
  transition: color 0.3s ease;

  @media (min-width: 640px) {
    font-size: 1.125rem;
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