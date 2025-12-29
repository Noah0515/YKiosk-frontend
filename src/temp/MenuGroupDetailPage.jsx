import api from '../api';
import '../Style.css'; 
import '../CustomStyle.css';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useLocation  } from 'react-router-dom';

function MenuGroupDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { store, menuGroup } = location.state || {};
    const [menuCategories, setMenuCategories] = useState([]);

    useEffect(() => {
        if (!store || !store.storeId) return;

        const getMenuCategories = async () => {
            try {
                console.log("메뉴그룹 아이디: ", menuGroup.menuGroupId)
                const response = await api.get("/api/user/store/group/category/list", {
                    params: {
                        menuGroupId: menuGroup.menuGroupId
                    }
                });
                const menuCategoryList = response.data;

                console.log("메뉴그룹 리스트: ", menuCategoryList)
                setMenuCategories(menuCategoryList);
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

        getMenuCategories();
    }, [menuGroup])

    const goCreateCategoryPage = () => {
        console.log("전달되는 menuGroup: ", menuGroup)
        navigate(`/my/store/${store.storeId}/menu/group/${menuGroup.menuGroupId}/category/create`, {state: { store, menuGroup }})
    }

    const goMenuCategoryPage = ( menuCategory ) => {
        navigate(`/my/store/${store.storeId}/menu/group/${menuGroup.menuGroupId}/category/${menuCategory.menuCategoryId}`, {state: { store, menuGroup, menuCategory }})
    }

    return (
        <div className="store-content">
            <div>
                <h2>메뉴 그룹 상세 페이지</h2>
            </div>
            <div className="content-card">
                <div onClick={goCreateCategoryPage}>
                    <h3>메뉴 카테고리 만들기</h3>
                </div>
            </div>

            <div className="content-card">
                <div className="component-list">
                    <div>
                        <h3>카테고리 항목</h3>
                    </div>
                    {menuCategories.map((menuCategory) => (
                        <div className="content-component" onClick={() => goMenuCategoryPage(menuCategory)}>
                            <h3>{menuCategory.menuCategoryName}</h3>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MenuGroupDetailPage;