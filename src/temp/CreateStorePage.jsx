import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateStorePage() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            [name]: value
        })
    }
    const handleSubmit = async () => {
        if(!inputs) {
            alert("가게 이름을 입력해주세요.")
            return;
        }

        try {
            await api.post('/api/user/store/create', data)

            navigate('/my/store')
        } catch (error) {
            alert('인증 실패 또는 로그인되지 않음');
        }
    }

    return (
        <div class="no-header-content">
            <div>
                <div>
                    <div>
                        <input
                            name="name"
                            value={inputs.name}
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