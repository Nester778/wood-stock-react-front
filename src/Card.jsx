import { Link } from 'react-router-dom';
import "./Card.css"

export default function Card(prod) {
    return (
        <div className="col-12 col-md-6 col-lg-4 my-3">
            <div className="food-card">
                <div className="card">
                    <div id="img-card-wrapper" className="img-wrapper d-flex justify-content-center">
                        <img
                            src={`data:image/jpeg;base64,${arrayBufferToBase64(prod.prod.data[0].data)}`}
                            className="img-style card-img-top"
                            id="img-card"
                        />
                    </div>
                    <div className="card-body">
                        <Link to={`/wood-stock-react-front/product/${prod.prod._id}`} className="card-title">
                            {prod.prod.Name}
                        </Link>
                        <p className="card-text">
                            {prod.prod.Price}$
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
