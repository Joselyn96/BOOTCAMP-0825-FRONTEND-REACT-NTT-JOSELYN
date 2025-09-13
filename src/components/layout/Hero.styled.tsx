import styled from 'styled-components'

const Container = styled.section`
  position: relative;
  height: 25rem;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 1rem;
  overflow: hidden;

  @media (min-width: 640px) {
    height: 31.25rem;
  }

  @media (min-width: 1024px) {
    height: 37.5rem;
    padding: 0 3rem;
  }
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("/modern-ecommerce-hero-shopping-background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

const Content = styled.div`
  position: relative;
  z-index: 10;
  text-align: left;
  color: white;
  padding: 0 1rem;
  max-width: 40rem;
`

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  text-wrap: balance;

  @media (min-width: 640px) {
    font-size: 2.25rem;
    margin-top: 6rem;
  }

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    font-size: 3.75rem;
  }
`

// const Subtitle = styled.p`
//   font-size: 1.125rem;
//   text-wrap: pretty;

//   @media (min-width: 640px) {
//     font-size: 1.25rem;
//   }

//   @media (min-width: 768px) {
//     font-size: 1.5rem;
//   }
// `

const HeroStyled = {
  Container,
  Background,
  Overlay,
  Content,
  Title,
}

export default HeroStyled