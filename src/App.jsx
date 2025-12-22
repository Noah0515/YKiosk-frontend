import { useState } from 'react';
import axios from 'axios';
import Navbar from './default/Navbar';

function App() {
  //const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState(null);
  
  // 1. 카카오 로그인 시작 (주소창 이동)
  const handleLogin = () => {
    // 백엔드 시큐리티 입구로 보냅니다.
    window.location.href = "http://localhost:8080/YKiosk/oauth2/authorization/kakao";
  };

  // 2. 로그인 성공 여부 확인용 API 호출
  const checkMyInfo = async () => {
    try {
      // 반드시 withCredentials: true 설정을 해야 브라우저가 쿠키를 같이 보냅니다.
      const response = await axios.get("http://localhost:8080/YKiosk/api/user/name", {
        withCredentials: true 
      });
      //setUserInfo(response.data);
      setUserName(response.data.name)
      console.log("서버에서 받은 유저 이름름:", response.data.name);
    } catch (error) {
      console.error("인증 실패 또는 로그인되지 않음", error);
      alert("로그인이 필요하거나 세션이 만료되었습니다.");
    }
  };

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
          <button onClick={() => setUserInfo(null)}>로그아웃(화면만)</button>
        </div>
      )}

      <div style={{ marginTop: '40px' }}>
        <p>로그인 후 아래 버튼을 눌러 쿠키가 제대로 작동하는지 확인하세요.</p>
        <button onClick={checkMyInfo}>내 정보 가져오기 (API Test)</button>
      </div>
    </div>
  );
}

export default App;