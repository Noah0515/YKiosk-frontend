import {useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import '../Style.css'
import Navbar from '../default/Navbar'
import Home from '../temp/Home';

function MainLayout() {
      //const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState(null);
  
  // 1. 카카오 로그인 시작 (주소창 이동)
  const handleLogin = () => {
    // 백엔드 시큐리티 입구로 보냅니다.
    window.location.href = "http://localhost:8080/YKiosk/oauth2/authorization/kakao";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 반드시 withCredentials: true 설정을 해야 브라우저가 쿠키를 같이 보냅니다.
        const response = await axios.get("http://localhost:8080/YKiosk/api/user/name", {
          withCredentials: true 
        });
        //setUserInfo(response.data);
        setUserName(response.data.name)
        console.log("서버에서 받은 유저 이름:", response.data.name);
      } catch (error) {
        console.error("인증 실패 또는 로그인되지 않음", error);
        setUserName(null);
      }
    };
    fetchUser();
  })


  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <Navbar userName={userName}/>

      <h1>Y-Kiosk Test Page</h1>
      <hr />

      {!userName ? (
        <div style={{ marginTop: '20px' }}>
          <p>아직 로그인되지 않았습니다.</p>
          {/* 카카오 공식 디자인 색상 적용 */}
          <button 
            onClick={handleLogin}
            style={{
              backgroundColor: '#FEE500',
              color: '#191919',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            카카오 로그인 시작하기
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '20px' }}>
          <h3>🎉 로그인 성공!</h3>
          <p><strong>닉네임:</strong> {userName}</p>
          <button onClick={() => fetchUser(null)}>로그아웃(화면만)</button>
        </div>
      )}
      <Home ></Home>
    </div>
  );
}

export default MainLayout;