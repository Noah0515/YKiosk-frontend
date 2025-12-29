import api from '../api';
import '../Style.css'; 
import '../CustomStyle.css';
import { useState } from 'react';
import { useNavigate, useOutletContext, useLocation  } from 'react-router-dom';

function CreateCategoryPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { store, menuGroup } = location.state || {};
    const [inputs, setInputs] = useState({
        menuCategoryName: '',
        menuGroupId: ''
    });

    console.log("그룹 정보: ", menuGroup)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
            menuGroupId: menuGroup.menuGroupId
        })
    }

    const handleSubmit = async () => {
        if(!inputs) {
            alert("그룹 이름을 입력해주세요.")
            return;
        }

        try {
            console.log(inputs);
            await api.post('/api/user/store/group/category/create', inputs)
    
            navigate('/my/store')
        } catch (error) {
            // 1. 개발자 도구 콘솔에 진짜 에러 내용을 출력합니다.
            console.log("에러 전체:", error);
            console.log("서버 응답:", error.response); 
            console.log("서버 에러 메시지:", error.response?.data); // ★ 여기가 핵심!
    
            // 2. 상태 코드에 따라 다른 안내를 해주는 게 좋습니다.
            // 중복된 이름인 경우 등 다양한 설정. 이건 나중에
            if (error.response?.status === 401 || error.response?.status === 403) {
                alert('로그인이 필요하거나 권한이 없습니다.');
            } else if (error.response?.status === 400) {
                alert('입력값이 잘못되었습니다. (가게 이름 형식을 확인하세요)');
            } else {
                alert('서버 오류가 발생했습니다.');
            }
        }
    }

    return (
        <div className="store-content">
            <div className="content-card">
                <div>
                    <h2>메뉴 카테고리 만들기 페이지</h2>
                </div>
                <div>
                    <div>
                        <input 
                            name="menuCategoryName"
                            value={inputs.menuCategoryName}
                            onChange={handleChange}
                            placeholder='카테고리 이름'
                        />
                    </div>
                    <div onClick={handleSubmit}>
                        <h4>카테고리리 생성</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCategoryPage;