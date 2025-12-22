import { useState } from 'react';
import axios from 'axios';
import Navbar from './default/Navbar';
import MainLayout from './home/MainLayout';
import Login from './account/Login'
import { Routes, Route } from 'react-router-dom';
import Home from './temp/Home';

function App() {
  return (
    <Routes>
      {/* 그룹 A: 네비게이션바가 필요한 화면들 */}
      {/* element에 MainLayout을 지정하고, 그 안에 자식 Route를 넣습니다 */}
      <Route element={<MainLayout />}>
        {/* 이 안에 있는 애들은 전부 MainLayout의 <Outlet /> 자리에 렌더링됩니다 */}
        <Route index element={<Home /> /*기본 화면면*/} />
      </Route>

      {/* 그룹 B: 네비게이션바가 필요 없는 화면들 (Login, Special) */}
      {/* 얘네는 MainLayout 밖으로 빼버립니다 */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;