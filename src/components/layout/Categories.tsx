import CategoriesStyled from './Categories.styled'

const Categories = () => {
  const categories = [
    {
      name: "Smartphones",
      image: "/smartphones.png",
      description: "Últimos modelos y tecnología",
    },
    {
      name: "Laptops",
      image: "/laptops.png",
      description: "Potencia y rendimiento",
    },
    {
      name: "Fragances",
      image: "/fragance.png",
      description: "Fragancias exclusivas",
    },
    {
      name: "Skincare",
      image: "/skincare.png",
      description: "Cuidado de la piel",
    },
    {
      name: "Groceries",
      image: "/groceries.png",
      description: "Productos frescos",
    },
    {
      name: "Ropa",
      image: "/clothes.png",
      description: "Decoración del hogar",
    },
  ]

  return (
    <CategoriesStyled.Container>
      <CategoriesStyled.ContainerInner>
        <CategoriesStyled.Header>
          <CategoriesStyled.Title>Discover our products</CategoriesStyled.Title>
          <CategoriesStyled.Subtitle>
            Explore our wide selection of products organized by category
          </CategoriesStyled.Subtitle>
        </CategoriesStyled.Header>
        <CategoriesStyled.Grid>
          {categories.map((category, index) => (
            <CategoriesStyled.Item key={index}>
              <CategoriesStyled.ImageWrapper>
                <CategoriesStyled.Image 
                  src={category.image || "/placeholder.svg"} 
                  alt={category.name} 
                />
              </CategoriesStyled.ImageWrapper>
              <CategoriesStyled.Name>{category.name}</CategoriesStyled.Name>
              <CategoriesStyled.Description>{category.description}</CategoriesStyled.Description>
            </CategoriesStyled.Item>
          ))}
        </CategoriesStyled.Grid>
      </CategoriesStyled.ContainerInner>
    </CategoriesStyled.Container>
  )
}

export default Categories