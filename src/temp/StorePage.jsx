import { useState, useEffect} from 'react';
import axios from 'axios';
import api from '../api';

import { useNavigate, useOutletContext } from 'react-router-dom';

function StorePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const getStores = async () => {
            try {
                const stores = await api.get("/api/user/store/list", {

                })
            } catch (error) {

            }
        }
    })

    const goCreateStorePage = () => {
        navigate('/my/store/create');
    }


    const {userName} = useOutletContext();
    return(
        <div class="no-header-content">
            <p>{userName}</p>
            <div>
                <div>
                    <div onClick={goCreateStorePage}>
                        <h3>
                            새로운 가게 만들기
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StorePage;