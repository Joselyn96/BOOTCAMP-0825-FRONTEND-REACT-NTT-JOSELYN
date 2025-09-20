import CategoriesStyled from './Categories.styled'

const categories = [
    {
      name: "Smartphones",
      image: "/smartphones.png",
      description: "Latest models and technology",
    },
    {
      name: "Laptops",
      image: "/laptops.png",
      description: "Power and performance",
    },
    {
      name: "Fragances",
      image: "/fragance.png",
      description: "Exclusive fragrances",
    },
    {
      name: "Skincare",
      image: "/skincare.png",
      description: "Skin care for everyone",
    },
    {
      name: "Groceries",
      image: "/groceries.png",
      description: "Fresh produce",
    },
    {
      name: "clothes",
      image: "/clothes.png",
      description: "Home decor",
    },
  ]

const Categories = () => {

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
          {categories.map((category) => (
            <CategoriesStyled.Item key={category.name}>
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