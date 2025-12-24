import '../Style.css'
import './login.css'

function LoginPage() {
    const handleLogin = () => {
        // 백엔드 시큐리티 입구로 보냅니다.
        window.location.href = "http://localhost:8080/YKiosk/oauth2/authorization/kakao";
    };

    return (
        <div className="">
            <div className="masthead bg-primary text-white text-center" >
                <div className="d-flex align-items-center flex-column">
                    <button onClick={handleLogin} className="kakao-login-btn"></button>
                </div>
                <div className="">

                </div>
            </div>
        </div>
        
    )
    
}

export default LoginPage;