import HeroStyled from './Hero.styled'

const Hero = () => {
  return (
    <HeroStyled.Container>
      <HeroStyled.Background>
        <HeroStyled.Overlay></HeroStyled.Overlay>
      </HeroStyled.Background>
      <HeroStyled.Content>
        <HeroStyled.Title>Shopping has never been easier</HeroStyled.Title>
      </HeroStyled.Content>
    </HeroStyled.Container>
  )
}

export default Hero