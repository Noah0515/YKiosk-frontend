import '../Style.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Navbar({userName}) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8080/YKiosk/api/auth/logout", {}, {
                withCredentials: true
            })

            alert("로그아웃 되었습니다.")
            window.location.href = "/"
        } catch (error) {
            console.error("로그아웃 실패")
        }
    }

    const goRootPage = () => {
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <div className="container">
                <a className="navbar-brand" onClick={() => goRootPage()}>Y Kiosk</a>
                {!userName? (
                    <button className="text-uppercase font-weight-bold bg-primary text-white rounded" onClick={() => navigate('/login')}>
                    로그인
                    </button>
                ) : (
                    <div >
                       <button className="mx-2 text-uppercase font-weight-bold bg-primary text-white rounded" onClick={() => navigate('/user/info')}>
                            {userName}
                       </button>
                       <button className="mx-2 text-uppercase font-weight-bold bg-primary text-white rounded" onClick={() => 
                        handleLogout()}>
                            로그아웃
                       </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;