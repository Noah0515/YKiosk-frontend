import api from '../api';
import '../Style.css'; 
import '../CustomStyle.css';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext  } from 'react-router-dom';

function MenuGroupPage() {
    const navigate = useNavigate();
    const { store } = useOutletContext();
    const [menuGroups, setMenuGroups] = useState([]);

    useEffect(() => {
        if (!store || !store.storeId) return;

        const getMenuGroups = async () => {
            try {
                console.log("현재 storeId: ", store.storeId)
                const response = await api.get("/api/user/store/group/list", {
                    params: {
                        storeId: store.storeId
                    }
                });
                const menuGroupList = response.data;

                console.log("메뉴그룹 리스트: ", menuGroupList)
                setMenuGroups(menuGroupList);
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

        getMenuGroups();
    }, [store])

    const goCreateGroupPage = () => {
        navigate(`/my/store/${store.storeId}/menu/group/create`, {state: { store }})
    }

    const goMenuCategoryPage = ( menuGroup ) => {
        navigate(`/my/store/${store.storeId}/menu/group/${menuGroup.menuGroupId}/`, {state: { store, menuGroup }})
    }

    console.log("가게정보: ", store)
    return (
        <div className="store-content">
            <div className="content-card">
                <div onClick={goCreateGroupPage}>
                    <h3>메뉴 그룹 만들기</h3>
                </div>
            </div>

            <div className="content-card">
                <div className="component-list">
                    {menuGroups.map((menuGroup) => (
                        <div className="content-component" onClick={() => goMenuCategoryPage(menuGroup)}>
                            <h3>{menuGroup.menuGroupName}</h3>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MenuGroupPage;