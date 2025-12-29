import api from '../api';
import '../Style.css'; 
import '../CustomStyle.css';
import { useNavigate, useOutletContext  } from 'react-router-dom';

function MenuCategoryPage() {
    const navigate = useNavigate();
    const { store, menuGroup } = useOutletContext();

    const goCreateMenuPage = () => {
        navigate(`/my/store/${store.storeId}}/menu/group/${menuGroup.menuGroupId}/category/create`, {state: { store, menuGroup }})
    }

    console.log("가게정보: ", store)
    return (
        <div className="store-content">
            <div>
                <h2>메뉴 카테고리 상세 페이지(메뉴 관리)</h2>
            </div>
            <div className="content-card">
                <div onClick={goCreateMenuPage}>
                    <h3>메뉴 만들기</h3>
                </div>
            </div>

            <div className="content-card">

            </div>
        </div>
    )
}

export default MenuCategoryPage;