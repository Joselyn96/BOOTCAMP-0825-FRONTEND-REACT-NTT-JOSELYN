import AuthenticatedNavbar from "../layout/AuthenticateNavbar"
const Productos = () => {
  return (
    <>
    <AuthenticatedNavbar 
        cartItemCount={2}
        onCartClick={() => console.log('Carrito clicked')}
      />
      <h1>Productos</h1>
    </>
  )
}

export default Productos