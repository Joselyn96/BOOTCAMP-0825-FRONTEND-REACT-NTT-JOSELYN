import { useEffect, useState } from "react"
import TestimonialsStyled from "./Testimonial.styled"

const testimonialsData = [
  { 
    name: "María González",  
    comment: "Excelente servicio y productos de calidad. Muy recomendado.", 
    rating: 5 
},
  { 
    name: 
    "Carlos Rodríguez", 
    comment: "Entrega rápida y atención al cliente excepcional.", 
    rating: 5 
},
  { 
    name: "Ana Martínez",     
    comment: "Gran variedad de productos y precios competitivos.", 
    rating: 5 
},
  { 
    name: "Luis Fernández",   
    comment: "La mejor experiencia de compra online que he tenido.", 
    rating: 5 
},
  { 
    name: "Carmen López",     
    comment: "Productos auténticos y envío súper rápido.", 
    rating: 5 
},
  { 
    name: "Diego Morales",    
    comment: "Atención personalizada y precios increíbles.", 
    rating: 5 
},
];

const Testimonials = () => {
  const [itemsPerView, setItemsPerView] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  // calcular items por vista según ancho ventana
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const nextItems = w >= 1024 ? 3 : w >= 768 ? 2 : 1;
      setItemsPerView(nextItems);
      // al cambiar tamaño evita quedar fuera de rango
      setCurrentIndex(i =>
        Math.min(i, Math.max(0, testimonialsData.length - nextItems))
      );
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const maxIndex = Math.max(0, testimonialsData.length - itemsPerView);
  const next = () => setCurrentIndex(i => Math.min(i + 1, maxIndex));
  const prev = () => setCurrentIndex(i => Math.max(i - 1, 0));

  return (
    <TestimonialsStyled.Container>
      <TestimonialsStyled.ContainerInner>
        <TestimonialsStyled.Header>
          <TestimonialsStyled.Title>What Our Customers Say</TestimonialsStyled.Title>
          <TestimonialsStyled.Subtitle>
            Real testimonials from satisfied customers with our service
          </TestimonialsStyled.Subtitle>
        </TestimonialsStyled.Header>

        <TestimonialsStyled.Slider>
          <TestimonialsStyled.Track $index={currentIndex} $itemsPerView={itemsPerView}>
            {testimonialsData.map((t, i) => (
              <TestimonialsStyled.Card key={i} $itemsPerView={itemsPerView}>
                <TestimonialsStyled.Content>
                  <TestimonialsStyled.Rating aria-label={`Calificación ${t.rating} de 5`}>
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <TestimonialsStyled.Star key={k}>★</TestimonialsStyled.Star>
                    ))}
                  </TestimonialsStyled.Rating>
                  <TestimonialsStyled.Comment>"{t.comment}"</TestimonialsStyled.Comment>
                  <TestimonialsStyled.Author>
                    <TestimonialsStyled.Name>{t.name}</TestimonialsStyled.Name>
                  </TestimonialsStyled.Author>
                </TestimonialsStyled.Content>
              </TestimonialsStyled.Card>
            ))}
          </TestimonialsStyled.Track>
        </TestimonialsStyled.Slider>

        <TestimonialsStyled.Controls>
          <button onClick={prev} disabled={currentIndex === 0} aria-label="Anterior">‹</button>
          <button onClick={next} disabled={currentIndex === maxIndex} aria-label="Siguiente">›</button>
        </TestimonialsStyled.Controls>
      </TestimonialsStyled.ContainerInner>
    </TestimonialsStyled.Container>
  );
};

export default Testimonials;
