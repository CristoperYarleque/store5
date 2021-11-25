import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import {obtenerProductosPorPagina, obtenerProductos} from "../services/productoService"
import ProductoCard from "../components/ProductoCard"
import {obtenerCategorias} from "../services/categoriaService"
import Slider from "@mui/material/Slider"

export default function ProductoConFiltrosView() {
    const [ productosOriginal,setProductosOriginal] = useState([])
    const [categorias,setCategorias] = useState([])
    const[productos,setProductos] = useState([])
    const [pagina,setPagina] = useState(1)
    const [limite,setLimite] = useState(20)
    const [precio,setPrecio] = useState([0,500])

    const {busqueda} = useParams()

    const getData = async () => {
        try {
            let prodObtenidos
            if(typeof busqueda === "undefined"){
                prodObtenidos = await obtenerProductosPorPagina(pagina,limite)
            } else {
                prodObtenidos = await obtenerProductos(busqueda)
            }
            const catObtenidas = await obtenerCategorias()
            setProductos(prodObtenidos)
            setProductosOriginal(prodObtenidos)
            setCategorias(catObtenidas)
        } catch (error) {
            throw error
        }
    }

    const filtrarPorCategoria = (idCategoria) => {
        const productosFiltrados = productosOriginal.filter((prod) => prod.categoria_id === idCategoria)
        setProductos(productosFiltrados)
    }

    const manejarFiltroPrecio = (e,nuevoRango) => {
        setPrecio(nuevoRango)
        const productosPorPrecio = productosOriginal.filter((prod) => prod.precio >= precio[0] && prod.precio <= precio[1])
        setProductos(productosPorPrecio)
    }

    useEffect(() => {
        getData()
    },[])

    return (
    <>
    <div className="container">
        <div className="d-flex justify-content-around my-3 px-5">
            <button className="btn btn-outline-dark btn-sm" onClick={() =>{
                setProductos(productosOriginal)
            }}>Todas las categorias</button>
            {categorias.map((cat,i) => (
                <button className="btn btn-outline-dark btn-sm" key={i}
                onClick={() => {
                    filtrarPorCategoria(cat.id)
                }}>
                    {cat.nombre}
                </button>
            ))}
        </div>
        <div>
            <small>Filtro por precio:</small>
            <Slider value={precio} onChange={manejarFiltroPrecio} valueLabelDisplay="auto" min={1} max={500} />
        </div>
        <div className="row my-3">
            {productos.map((prod,i) => (
                <div className="col-12 col-md-6 col-lg-4" key={i}>
                    <ProductoCard producto={prod} />
                </div>
            ))}
        </div>
    </div>
    </>
)
}
