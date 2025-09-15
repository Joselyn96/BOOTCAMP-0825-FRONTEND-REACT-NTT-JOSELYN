import AuthenticatedNavbar from "../layout/AuthenticateNavbar"
import SecondaryNavbar from "../layout/SecondaryNavbar"
import CategoryFilter from "./CategoryFilter"

const Productos = () => {
  return (
    <>
    <AuthenticatedNavbar 
        cartItemCount={2}
        onCartClick={() => console.log('Carrito clicked')}
      />
      <SecondaryNavbar 
        activeTab="products" 
        onSearch={(query) => console.log('Search query:', query)} 
      />
      <div className="main-layout">
        <CategoryFilter 
          onCategoryChange={(slug) => console.log('Categoría seleccionada:', slug)} 
        />
        
        <div className="products-area">
          <h1>Productos</h1>
          <p>Aquí irán los productos...</p>
        </div>
      </div>
      <h1>Productos</h1>
    </>
  )
}

export default Productos