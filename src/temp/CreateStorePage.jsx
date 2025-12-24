import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api';

function CreateStorePage() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        storeName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const handleSubmit = async () => {
        if(!inputs) {
            alert("가게 이름을 입력해주세요.")
            return;
        }

        try {
            console.log(inputs.storeName);
            await api.post('/api/user/store/create', inputs)

            navigate('/my/store')
        } catch (error) {
            // 1. 개발자 도구 콘솔에 진짜 에러 내용을 출력합니다.
            console.log("에러 전체:", error);
            console.log("서버 응답:", error.response); 
            console.log("서버 에러 메시지:", error.response?.data); // ★ 여기가 핵심!

            // 2. 상태 코드에 따라 다른 안내를 해주는 게 좋습니다.
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
        <div class="no-header-content">
            <div>
                <div>
                    <div>
                        <input
                            name="storeName"
                            value={inputs.storeName}
                            onChange={handleChange}
                            placeholder="가게 이름"
                        />
                    </div>
                </div>

            </div>
            <div>
                <div>
                    <div>
                        <div onClick={handleSubmit}>
                            <h3>가게 만들기</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default CreateStorePage;