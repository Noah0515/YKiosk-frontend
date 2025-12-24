import '../Style.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function StoreCard({ store }) {
    const navigate = useNavigate();

    const goStoreDetailPage = () => {
        navigate('/my/store/detail/{store.storeId')
    }

    return (
        <div class="card" onClick={goStoreDetailPage}>
            <h4>{store.name}</h4>
        </div>
    );
}