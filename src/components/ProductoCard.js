import { Link } from "react-router-dom";


export default function ProductoCard({producto}) {
    return (
        <Link className="card m-3" to={`/detalleproducto/${producto.id}`}>
            <img className="card-img-top" src={producto.imagen} alt={producto.nombre}/>
            <div className="card-body text-center">
                <h5 className="card-title">{producto.nombre}</h5>
                <p>{producto.precio}</p>
            </div>
        </Link>
    )
}
