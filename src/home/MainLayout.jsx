import {useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import '../Style.css';
import '../CustomStyle.css'
import Navbar from '../default/Navbar'
import HomePage from '../temp/HomePage';
import StorePage from '../temp/StorePage';
import api from '../api';

function MainLayout() {
      //const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  // 1. 카카오 로그인 시작 (주소창 이동)
  const handleLogin = () => {
    // 백엔드 시큐리티 입구로 보냅니다.
    window.location.href = "${BASE_URL}/oauth2/authorization/kakao";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 반드시 withCredentials: true 설정을 해야 브라우저가 쿠키를 같이 보냅니다.
        /*
        const response = await axios.get("http://localhost:8080/YKiosk/api/user/name", {
          withCredentials: true 
        });*/
        const response = await api.get("api/user/name")
        //setUserInfo(response.data);
        setUserName(response.data.name)
        console.log("서버에서 받은 유저 이름:", response.data.name);
      } catch (error) {
        console.error("인증 실패 또는 로그인되지 않음", error);
        setUserName(null);
      }
    };
    fetchUser();
  }, [])


  return (
    <div className="main-layout">
        <Navbar userName={userName}/>
        <Outlet context={{userName}}/>
        {/*<Home userName={userName}/>*/}
    </div>
  );
}

export default MainLayout;