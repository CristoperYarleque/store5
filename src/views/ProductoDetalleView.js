import { useState , useEffect,useContext} from "react"
import { CarritoContext } from "../context/carritoContext"
import { useParams,useNavigate } from "react-router"
import { obtenerProductoPorId } from "../services/productoService"
import { obtenerCategorias } from "../services/categoriaService"
import ReactImageMagnify from "react-image-magnify"

export default function ProductoDetalleView() {
    const [producto,setProducto] = useState(null)
    const [cantidad,setCantidad] = useState(1)

    const[categoria,setCategoria] = useState("")

    const{ id} = useParams()

    const { anadirACarrito } = useContext(CarritoContext)

    const getProducto = async () => {
        try {
            const proObtenido = await obtenerProductoPorId(id)
            const catObtenidas = await obtenerCategorias()
            const catProducto = catObtenidas.find((cat) => {
                return cat.id === proObtenido.categoria_id
            })
            setCategoria(catProducto)
            setProducto(proObtenido)
        } catch (error) {
            throw error
        }
    }

    const modificarCantidad = (numero) => {
        if(cantidad + numero === 0 || cantidad + numero === 11){
            return
        }
        setCantidad(cantidad + numero)
    }

    const anadirACarritoContext = () => {
        const {id,nombre,precio} = producto
        const nuevoProducto = {
            id,
            nombre,
            precio,
            cantidad
        }
        anadirACarrito(nuevoProducto)
    }

    const navigate = useNavigate()

    const ejecutarComprarAhora = () => {
        anadirACarritoContext()
        navigate("/checkout")
    }

    useEffect(() => {
        getProducto()
    },[])

    return (
        <>
        <div className="title-product py-5 mb-5" style={{
                    backgroundImage: `url('${categoria.imagen}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}>
                <h2 className="fw-bold container">
                    {/* si categoria existe, pregunta por la propiedad nombre */}
                    {categoria?.nombre} - {producto?.nombre}
                </h2>
        </div>


        <div className="container">
            <div className="row my-3">
                  {producto ? (<>
                    <div className="col-12 col-md-6">
                        <ReactImageMagnify {...{
                            smallImage:{
                                alt:producto.nombre,
                                isFluidWidth:true,
                                src:producto.imagen
                            },
                            largeImage:{
                                src:producto.imagen,
                                width:1280,
                                height:720,

                            }
                        }} />
                    </div>
                    <div className="col-12 col-md-6">
                        <h4>{producto.nombre}</h4>
                        <h3>S/ {producto.precio}</h3>
                        <hr />
                        <p>{producto.descripcion}</p>
                        <div className="d-flex">
                                <button className="btn btn-dark" onClick={() => {
                                    modificarCantidad(-1)
                                }}><i className="fas fa-minus"></i></button>
                                <h4 className="mx-2">{cantidad}</h4>
                                <button className="btn btn-dark" onClick={() => {
                                    modificarCantidad(1)
                                }}><i className="fas fa-plus"></i></button>
                            <button className="btn btn-outline-dark ms-3" onClick={anadirACarritoContext}><i classname="fas fa-cart-plus"></i>Añadir a carrito</button>
                        </div>
                        <button className="btn btn-outline-dark btn-lg mt-2" onClick={() => {
                            ejecutarComprarAhora()
                        }}>Comprar ahora!</button>
                    </div>
                    </>) : null}  
            </div>
        </div>
    </>
    )
}
