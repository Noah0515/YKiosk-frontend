import '../Style.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function StoreCard({ store }) {
    const navigate = useNavigate();

    const goStoreDetailPage = () => {
        navigate('/my/store/{store.storeId}')
    }

    console.log(store);
    //console.log(state.storeName);
    //console.log(store.state);
    return (
        <div class="card" onClick={goStoreDetailPage}>
            <h4>{store.storeName}</h4>
            <p>{store.state}</p>
        </div>
    );
}

export default StoreCard;