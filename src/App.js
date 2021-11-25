import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { AuthContextProvider } from "./context/authContext"
import CarritoContextProvider from "./context/carritoContext"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import LoginView from "./views/LoginView"
import HomeView from "./views/HomeView"
import CheckOutView from "./views/CheckOutView"
import Navegacion from "./components/Navegacion"
import ProductoDetalleView from "./views/ProductoDetalleView"
import CarritoView from "./views/CarritoView"
import NotFound from "./views/NotFound"
import ProductoConFiltrosView from "./views/ProductoConFiltrosView"
import Footer from "./components/Footer"

export default function App() {
  return (
    <AuthContextProvider>
      <CarritoContextProvider>
      <Router>
        <Navegacion />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/carrito" element={<CarritoView />} />
          <Route path="/detalleproducto/:id" element={<ProductoDetalleView />} />
          <Route path="/productofiltros">
            <Route path="/productofiltros" element={<ProductoConFiltrosView />} />
            <Route path="/productofiltros/:busqueda" element={<ProductoConFiltrosView />} />
          </Route>
          <Route path="/checkout" element={
          <PrivateRoute>
            <CheckOutView />
            </PrivateRoute>} />
        </Routes>
        <Footer />
      </Router>
      </CarritoContextProvider>
    </AuthContextProvider>
  )
}

