import { useState, useEffect, createContext } from "react";

export const CarritoContext = createContext()

const CarritoContextProvider = (props) => {

    const [carrito,setCarrito] = useState([])

    const anadirACarrito = (nuevoProducto) => {
        const existe = carrito.findIndex((prod) => prod.id === nuevoProducto.id)
        if(existe === -1){
            setCarrito([...carrito,nuevoProducto])
        }else{
            let carritoTmp = [...carrito]
            carritoTmp[existe].cantidad = carritoTmp[existe].cantidad + nuevoProducto.cantidad
            setCarrito(carritoTmp)
        }
    }
    
    const limpiarCarrito = () => {
        setCarrito([])
    }

    useEffect(() => {
        const carritoStorage = JSON.parse(localStorage.getItem("carrito"))
        if(carritoStorage.length > 0){
            setCarrito(carritoStorage)
        }
    },[])

    useEffect(() => {
        localStorage.setItem("carrito",JSON.stringify(carrito))
    },[carrito])

    return <CarritoContext.Provider value={{carrito,anadirACarrito,limpiarCarrito}}>{props.children}</CarritoContext.Provider>
}

export default CarritoContextProvider