import api from '../api';
import '../Style.css'; 
import '../CustomStyle.css'
import React, { useState } from 'react';

const getStatusConfig = (state) => {
    switch (state) {
        case "ORDERED": 
            return { text: "조리 시작", color: "#2196F3" }; // 파랑
        case "COOKING": 
            return { text: "조리 완료", color: "#4CAF50" }; // 초록
        case "READY":   
            return { text: "수령 완료", color: "#9E9E9E" }; // 회색
        default:        
            return { text: "처리 완료", color: "#ddd" };
    }
};


function OrderCard({ order, storeId, onUpdate }) {
    const [isUpdating, setIsUpdating] = useState(false);

    // 이제 여기서 getStatusConfig를 호출해도 에러가 나지 않습니다.
    const config = getStatusConfig(order.orderState);

    const handleStatusUpdate = async () => {
        if (isUpdating || order.orderState === "SERVED") return;

        setIsUpdating(true);

        const requestData = {
            orderNum: order.orderNum,
            orderTime: order.orderTime,
            orderState: order.orderState, // 현재 상태를 그대로 서버에 보냄
            storeId: storeId
        };

        try {
            // POST 방식으로 서버에 상태 변경 요청
            await api.post("/api/user/store/order/update-status", requestData);
            
            // 성공 시 부모 컴포넌트의 fetchOrders 호출 (목록 갱신)
            await onUpdate(); 
        } catch (error) {
            console.error("업데이트 실패:", error);
            alert("상태 변경에 실패했습니다.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="order-card" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            width: '320px',    
            height: '480px',   // 카드의 높이를 고정해서 버튼 위치를 확보합니다.
            borderTop: `8px solid ${config.color}`,
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '16px',
            flexShrink: 0,     // 가로로 나열될 때 카드가 찌그러지지 않게 함
            boxSizing: 'border-box',
            boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
        }}>
            {/* 상단: 주문 번호 및 시간 */}
            <div style={{ flexShrink: 0, marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: '900' }}>#{order.orderNum}</span>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>
                    {new Date(order.orderTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            {/* 중단: 메뉴 리스트 (내부 스크롤 허용) */}
            <div style={{ 
                flexGrow: 1, 
                overflowY: 'auto', 
                marginBottom: '15px'
            }}>
                {order.orderedMenuResDtos.map((menu, i) => (
                    <div key={i} style={{ marginBottom: '12px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{menu.menuName} x {menu.quantity}</div>
                        {menu.orderedMenuOptions?.map((opt, j) => (
                            <div key={j} style={{ color: '#666', fontSize: '0.85rem', marginLeft: '10px' }}>
                                └ {opt.optionCategoryName}: {opt.optionContent}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* 하단: 상태 변경 버튼 (항상 바닥에 고정) */}
            <button 
                onClick={handleStatusUpdate}
                disabled={isUpdating}
                style={{ 
                    flexShrink: 0,
                    width: '100%',
                    padding: '16px',
                    backgroundColor: isUpdating ? "#ccc" : config.color,
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: isUpdating ? 'default' : 'pointer'
                }}
            >
                {isUpdating ? "처리 중..." : config.text}
            </button>
        </div>
    );
}

export default OrderCard;
