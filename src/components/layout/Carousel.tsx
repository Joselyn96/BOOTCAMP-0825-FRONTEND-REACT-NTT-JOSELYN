import { useState, useEffect } from 'react'
import CarouselStyled from './Carousel.styled'

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = [
    {
      title: "TECHNOLOGY",
      image: "/technology-headphones.jpg",
    },
    {
      title: "FASHION",
      image: "/fashion-woman-style.jpg",
    },
    {
      title: "BEAUTY",
      image: "/beauty-cosmetics.jpg",
    },
    {
      title: "SPORTS",
      image: "/sports-equipment.jpg",
    },
    {
      title: "HOME",
      image: "/home-decoration.jpg",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play opcional
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000) // Cambia cada 5 segundos
    return () => clearInterval(interval)
  }, [])

  return (
    <CarouselStyled.Container>
      <CarouselStyled.ContainerInner>
        <CarouselStyled.Header>
          <CarouselStyled.Title>Explore Our Categories</CarouselStyled.Title>
        </CarouselStyled.Header>
        
        <CarouselStyled.CarouselWrapper>
          <CarouselStyled.CarouselTrack $currentIndex={currentIndex}>
            {slides.map((slide, index) => (
              <CarouselStyled.CarouselSlide key={index}>
                <CarouselStyled.SlideImage 
                  src={slide.image || "/placeholder.svg"} 
                  alt={slide.title} 
                />
                <CarouselStyled.SlideOverlay>
                  <CarouselStyled.SlideTitle>{slide.title}</CarouselStyled.SlideTitle>
                </CarouselStyled.SlideOverlay>
              </CarouselStyled.CarouselSlide>
            ))}
          </CarouselStyled.CarouselTrack>

          <CarouselStyled.NavButton $direction="prev" onClick={prevSlide}>
            ‹
          </CarouselStyled.NavButton>
          <CarouselStyled.NavButton $direction="next" onClick={nextSlide}>
            ›
          </CarouselStyled.NavButton>
        </CarouselStyled.CarouselWrapper>

        <CarouselStyled.Indicators>
          {slides.map((_, index) => (
            <CarouselStyled.Indicator
              key={index}
              $active={index === currentIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </CarouselStyled.Indicators>
      </CarouselStyled.ContainerInner>
    </CarouselStyled.Container>
  )
}

export default Carousel