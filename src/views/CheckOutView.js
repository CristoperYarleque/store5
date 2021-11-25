import { useContext,useState } from "react"
import { CarritoContext } from "../context/carritoContext"
import { useForm } from "react-hook-form"
import {MapContainer,TileLayer,Marker,useMapEvents} from "react-leaflet"
import { guardarVenta } from "../services/ventasServices"
import Swal from "sweetalert2"

export default function CheckOutView() {
    const [coordenadas,setCoordenadas] = useState([-5.164098018141368,-80.66452860832216])
    const { carrito } = useContext(CarritoContext)

    let total = 0

    total = carrito.reduce((acum,prod) => {
        return acum + prod.cantidad * prod.precio
    }, 0)

    const {register,handleSubmit,formState:{errors}} = useForm()

    const recibirSubmit = async (data) => {
        try {
            let nuevaVenta = {
                ...data,
                coordenadas,
                productos:carrito,
                total
            }
            await guardarVenta(nuevaVenta)
            Swal.fire({
                icon:"success",
                title:"Venta Realizada"
            })
        } catch (error) {
            throw error
        }  
    }

    const AnadirMarcador = () => {
        const map = useMapEvents({
            click:(e) => {
                const {lat,lng} = e.latlng
                setCoordenadas([lat,lng])
            }
        })
        return null
    }


    return (
        <div className="container mt-4">
            <h1>Checkout</h1>
            <div className="row my-2">
                <div className="col-12 col-md-6">
                    <h5>Verifique el carrito</h5>
                    <ul className="list-group">
                        {carrito.map((prod,i) => (
                            <li className="list-group-item d-flex justify-content-between" key={i}>
                                <div>
                                    <h6 className="fw-boldss">{prod.nombre}</h6>
                                    <small>Cantidad: {prod.cantidad}</small>
                                </div>
                                <div className="badge bg-dark rounded-pill p-4">
                                   S/ {(prod.cantidad * prod.precio).toFixed(2)}
                                </div>
                            </li>
                        ))}
                        {total > 0 ? <li className="list-group-item d-flex justify-content-between">
                            <span className="fw-bold">TOTAL</span>
                            <span className="fw-bold">S/ {total.toFixed(2)}</span>
                        </li> : <li className="list-group-item">Todavia no ha agregado ningun producto.</li>}
                    </ul>
                </div>

                <div className="col-12 col-md-6">
                <form onSubmit={handleSubmit(recibirSubmit)}>
                    <div className="mb-2">
                        <label className="form-label">Nombres y Apellidos</label>
                        <input type="text" placeholder="Ej. Juan Perez" className="form-control" {...register("nombreCompleto",{required:true})} />
                        {errors.nombreCompleto && (<small className="text-danger">Este campo es obligatorio</small>)}
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Telefono</label>
                        <input type="text" placeholder="Ej. 926384678" className="form-control" {...register("telefono",{required:{value:true,message:"Es requerido"},minLength:{value:6,message:"Se requiere 6 digitos"},maxLength:{value:14,message:"Maximo 14 digitos"}})} />
                        {errors.telefono && (<small className="text-danger">{errors.telefono.message}</small>)}
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Correo</label>
                        <input type="email" placeholder="Ej. jperez@tecsup.edu.pe" className="form-control" {...register("email",{required:true})} />
                        {errors.email && (<small className="text-danger">Este correo es obligatorio</small>)}
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Direccion</label>
                        <input type="text" placeholder="Ej. Urb Los Arces F 67" className="form-control" {...register("direccion",{ pattern:/^[A-Za-z0-9]*$/ })} />
                        {errors.direccion && (<small className="text-danger">Solo se acepta letras y digitos</small>)}
                    </div>

                    <MapContainer center={coordenadas} zoom={15} style={{height:"400px"}}>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <AnadirMarcador />
                    <Marker position={coordenadas} />
                    </MapContainer>

                    <button type="submit" className="btn btn-dark btn-lg" disabled={carrito.length <= 0}>
                        comprar
                    </button>
                </form>
                </div>
            </div>
        </div>
    )
}
