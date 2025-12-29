import api from '../api';
import '../Style.css'; 
import '../CustomStyle.css';
import { useNavigate, useOutletContext  } from 'react-router-dom';

function MenuPage() {
    const navigate = useNavigate();
    const { store } = useOutletContext();
    //const 

    const goMenuDetailPage = () => {
        navigate(`/my/store/${store.storeId}/menu/detail`, {state: { store }});
    }

    const goMenuGroupPage = () => {
        navigate(`/my/store/${store.storeId}/menu/group/`, {state: { store }});
    }

    console.log("가게정보: ", store)
    return (
        <div className="store-content">
            
            <div class="content-card content-card-horizen height-30">
                <div>
                    <button onClick={goMenuGroupPage}>
                        <h4>메뉴 그룹 설정</h4>
                    </button>
                </div>
            </div>

            <div className="content-card content-card-horizen width-80 height-100">

                <div class="component-list ">
                    <div class="content-component">
                        <h4>컨텐츠1</h4>
                    </div>
                    <div class="content-component">
                        <h4>컨텐츠2</h4>
                    </div>
                    <div class="content-component">
                        <h4>컨텐츠3</h4>
                    </div>
                    <div class="content-component">
                        <h4>컨텐츠4</h4>
                    </div>
                </div>

            </div>

                            

        </div>
    );
}{/*  */}

export default MenuPage;