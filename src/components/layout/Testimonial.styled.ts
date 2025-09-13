import styled from "styled-components";

const Container = styled.section`
  padding: 3rem 0;
  @media (min-width: 640px) { 
  padding: 4rem 0; 
  }
`;

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
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  @media (min-width: 640px) { 
  margin-bottom: 3rem; 
  }
`;

const Title = styled.h2`
  font-size: 1.5rem; 
  font-weight: bold; 
  margin-bottom: 1rem;
  color: var(--text-primary);
  @media (min-width: 640px) { 
  font-size: 1.875rem; 
  }
  @media (min-width: 768px) { 
  font-size: 2.25rem; 
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem; 
  color: var(--text-secondary);

  max-width: 32rem; 
  margin: 0 auto;
  @media (min-width: 640px) { 
  font-size: 1.25rem; 
  }
`;

/* Slider */
const Slider = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0.25rem;
`;

const Track = styled.div<{ $index: number; $itemsPerView: number }>`
  display: flex;
  gap: 1rem;
  transition: transform .4s ease;
  transform: translateX(${p => `-${p.$index * (100 / p.$itemsPerView)}%`});
  padding: 0 .5rem; 
`;

const Card = styled.div<{ $itemsPerView: number }>`
  flex: 0 0 calc(
    (100% / ${p => p.$itemsPerView}) - 1rem * (${p => (p.$itemsPerView - 1) / p.$itemsPerView})
  );
  background: #fff; 
  border: 1px solid var(--border); 
  border-radius: .5rem;
  box-shadow: 0 1px 3px rgba(68, 67, 67, 0.1);
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    box-shadow: 0 4px 16px rgba(55, 58, 57, 0.15), 0 1.5px 6px rgba(0,0,0,.12);
    transform: translateY(-4px) scale(1.03);
  }
`;

const Content = styled.div`
  padding: 1rem; 
  text-align: center;
  @media (min-width: 640px) { 
  padding: 1.5rem; 
  }
`;

const Rating = styled.div`
  display: flex; 
  justify-content: center;
  margin-bottom: 1rem;
`;

const Star = styled.span`
  font-size: 1rem; 
  line-height: 1; 
  color: #fbbf24; /* ★ */
  margin: 0 2px;
  @media (min-width: 640px) { 
  font-size: 1.25rem; 
  }
`;

const Comment = styled.p`
  font-size: .95rem; 
  color: var(--text-secondary);
  margin-bottom: 1rem; 
  font-style: italic;
  @media (min-width: 640px) { 
  font-size: 1rem; 
  }
`;

const Author = styled.div`
  display: flex; 
  align-items: center; 
  justify-content: center;
`;

const Name = styled.p`
  font-size: .9rem; 
  font-weight: 600; 
  color: var(--text-primary);
  margin: 0;
  @media (min-width: 640px) { 
  font-size: 1rem; 
  }
`;

const Controls = styled.div`
  margin-top: 1rem; 
  text-align: center;
  
  button {
    background: #1ece7cff;   /* de color verde cuando está habilitado */
    color: #fff;            
    border: none;
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;

    &:disabled {
      background: #ccc;   /* fondo plomo cuando está deshabilitado */
      color: #888;        
      cursor: not-allowed;
    }
  }
`;

const TestimonialsStyled = {
  Container,
  ContainerInner,
  Header,
  Title,
  Subtitle,
  Slider,
  Track,
  Card,
  Content,
  Rating,
  Star,
  Comment,
  Author,
  Name,
  Controls,
};

export default TestimonialsStyled;
