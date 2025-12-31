import api from '../api';
import '../Style.css'; 
import '../CustomStyle.css';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext  } from 'react-router-dom';
import OrderCard from './OrderCard';

function OrderDetailPage() {
    const { store } = useOutletContext();
    const [orders, setOrders] = useState([]);

    // 순수하게 목록을 가져오는 GET 함수
    const fetchOrders = async () => {
        if (!store || !store.storeId) return;
        
        try {
            const response = await api.get("/api/user/store/menu/get-order", {
                params: { storeId: store.storeId }
            });
            
            // 서버에서 받아온 주문들 중 null이 아닌 것만 필터링 (서버에서 null을 보낼 경우 대비)
            const validOrders = (response.data.orders || []).filter(o => o !== null);
            setOrders(validOrders);
            
            console.log("목록 갱신 성공:", validOrders.length, "건");
        } catch (error) {
            console.error("데이터 로드 실패:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [store]);

    return (
        <div className="order-list-container">
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2>주문 관리 <span>({store?.storeName})</span></h2>
                <button onClick={fetchOrders} className="refresh-btn">🔄 새로고침</button>
            </header>

            <div className="order-grid">
                {orders.map((order) => (
                    <OrderCard 
                        key={`${order.orderNum}-${order.orderTime}`} 
                        order={order} 
                        storeId={store.storeId}
                        onUpdate={fetchOrders} // 자식이 POST 후 이 함수를 부름
                    />
                ))}
            </div>
        </div>
    );
}

export default OrderDetailPage;