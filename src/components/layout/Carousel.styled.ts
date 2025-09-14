import styled from 'styled-components'

const Container = styled.section`
  padding: 0.5rem 0;
  background-color: #f9fafb;
`

const ContainerInner = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 0rem;
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
  color: #111827;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.25rem;
  }
`

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  @media (max-width: 639px) {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    
    /* ocultar scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const CarouselTrack = styled.div<{ $currentIndex: number }>`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(-${props => props.$currentIndex * 100}%);
  @media (max-width: 639px) {
    transform: none;
`

const CarouselSlide = styled.div`
  min-width: 100%;
  position: relative;
  height: 400px;

    @media (max-width: 639px) {
    scroll-snap-align: start;
  }

  @media (min-width: 640px) {
    height: 500px;
  }

  @media (min-width: 1024px) {
    height: 600px;
  }
`

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const SlideOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
`

const SlideTitle = styled.h3`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (min-width: 640px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`

const NavButton = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$direction === 'prev' ? 'left: 1rem;' : 'right: 1rem;'}
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  color: #374151;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background-color: white;
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 639px) {
    display: none;
  }

`

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`

const Indicator = styled.button<{ $active: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.$active ? '#22c55e' : '#d1d5db'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`

const CarouselStyled = {
  Container,
  ContainerInner,
  Header,
  Title,
  CarouselWrapper,
  CarouselTrack,
  CarouselSlide,
  SlideImage,
  SlideOverlay,
  SlideTitle,
  NavButton,
  Indicators,
  Indicator,
}

export default CarouselStyled