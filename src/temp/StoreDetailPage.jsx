import api from '../api';
import '../Style.css'; 
import '../CustomStyle.css';
import { Outlet, useLocation , useNavigate } from 'react-router-dom';

import menuIcon from '../icons/menu_icon.png';
import employeeIcon from '../icons/employee_icon.png';
import orderedIcon from '../icons/ordered_icon.png';
import statisticsIcon from '../icons/statistics_icon.png';



function StoreDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const store = location.state?.store;

    const goStoreMenuPage = () => {
        navigate("menu", {state: { store }});
    }

    const goStoreEmployeePage = () => {
        navigate("employee");
    }

    const goOrderDetailPage = () => {
        navigate("order-detail", {state: { store }})
    }
    console.log("가게 정보", store)

    return (
        <div className="store-container" >
            <div className="sidebar">
                <img src={menuIcon} alt="메뉴 아이콘" onClick={goStoreMenuPage}/>
                <img src={employeeIcon} alt="직원 아이콘" />
                <img src={orderedIcon} alt="주문내역 아이콘" onClick={goOrderDetailPage}/>
                <img src={statisticsIcon} alt="통계계 아이콘"/>
            </div>
            <div className="content-body">
                <div className="store-header">
                    <h3>{store.storeName}</h3>
                </div>
                <Outlet context={{ store }} />
            </div>
        </div>
    );

}

export default StoreDetailPage;