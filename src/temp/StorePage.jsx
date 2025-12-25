import { useState, useEffect} from 'react';
import axios from 'axios';
import api from '../api';

import { useNavigate, useOutletContext } from 'react-router-dom';
import StoreCard from './StoreCard';

function StorePage() {
    const navigate = useNavigate();
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const getStores = async () => {
            try {
                const response = await api.get("/api/user/store/list");
                const storeList = response.data;

                console.log("가게 리스트:" , storeList);
                setStores(storeList);
            } catch (error) {
                if (error.response) {
                    // 서버가 응답을 보냈으나 2xx 범위를 벗어난 경우 (예: 401, 403, 500)
                    console.error("에러 상태 코드:", error.response.status);
                    if (error.response.status === 401) {
                        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
                    }
                } else {
                    // 요청 자체가 실패한 경우 (네트워크 오류 등)
                    console.error("네트워크 에러 혹은 서버 응답 없음:", error.message);
                }
            }
        }
        getStores();
    }, [])

    const goCreateStorePage = () => {
        navigate('/my/store/create');
    }


    const {userName} = useOutletContext();
    return(
        <div className="no-header-content">
            <p>{userName}</p>
            <div className="">
                <div>
                    <div onClick={goCreateStorePage}>
                        <h3>
                            새로운 가게 만들기
                        </h3>
                    </div>
                </div>
                    {stores.map((store) => (
                        <StoreCard key={store.storeId} store={store} />
                    ))
                    }
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default StorePage;