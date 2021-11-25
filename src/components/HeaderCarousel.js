import { Carousel } from "react-bootstrap"
import lentes from "../assets/lentes.jpg"
import zapatos from "../assets/zapatos.jpg"
import cosmeticos from "../assets/cosmeticos.jpg"

export default function HeaderCarousel() {
    return (
        <header>
            <Carousel style={{maxHeight:"600px",overflow:"hidden"}}>
                <Carousel.Item>
                    <img src={lentes} alt="lentes" className="d-block w-100" style={{objectFit:"cover",height:"100%",transform:"translateY(-300px)"}}/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={zapatos} alt="zapatos" className="d-block w-100" style={{objectFit:"cover",height:"100%",transform:"translateY(-850px)"}}/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={cosmeticos} alt="cosmeticos" className="d-block w-100" style={{objectFit:"cover",height:"100%",transform:"translateY(-300px)"}}/>
                </Carousel.Item>
            </Carousel>
        </header>
    )
}
