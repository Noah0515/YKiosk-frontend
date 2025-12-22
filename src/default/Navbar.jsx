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

    return (
        <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <div className="container">
                <a className="navbar-brand" href="#page-top">Y Kiosk</a>
                <button className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
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