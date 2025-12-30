import { useState } from 'react';
import axios from 'axios';
import Navbar from './default/Navbar';
import MainLayout from './home/MainLayout';
import LoginPage from './account/LoginPage'
import { Routes, Route } from 'react-router-dom';
import HomePage from './temp/HomePage';
import StorePage from './temp/StorePage';
import StoreDetailPage from './temp/StoreDetailPage';
import CreateStorePage from './temp/CreateStorePage';
import MenuPage from "./temp/MenuPage";
import MenuDetailPage from "./temp/MenuDetailPage";
import EmployeePage from "./temp/EmployeePage"
import MenuCategoryPage from './temp/MenuCategoryPage';
import CreateCategoryPage from './temp/CreateCategoryPage';
import MenuGroupPage from './temp/MenuGroupPage';
import CreateGroupPage from './temp/CreateGroupPage';
import MenuGroupDetailPage from './temp/MenuGroupDetailPage';
import MenuCategoryDetailPage from './temp/MenuCategoryDetailPage';
import CreateMenuPage from './temp/CreateMenuPage';

function App() {
  return (
    <Routes>
      {/* 그룹 A: 네비게이션바가 필요한 화면들 */}
      {/* element에 MainLayout을 지정하고, 그 안에 자식 Route를 넣습니다 */}
      <Route element={<MainLayout />}>
        {/* 이 안에 있는 애들은 전부 MainLayout의 <Outlet /> 자리에 렌더링됩니다 */}
        <Route index element={<HomePage /> /*기본 화면*/} />
        <Route path="/my/store" element={<StorePage />} />
        <Route path="/my/store/create" element={<CreateStorePage />} />
        <Route path="/my/store/:id" element={<StoreDetailPage />}>
          <Route path="menu" element={<MenuPage />} />
          <Route path="menu/detail" element={<MenuDetailPage />} />

          <Route path="employee/:id" element={<EmployeePage />} />

          <Route path="menu/group" element={<MenuGroupPage />} />
          <Route path="menu/group/create" element={<CreateGroupPage />} />
          <Route path="menu/group/:id" element={<MenuGroupDetailPage />} />

          {/*<Route path="menu/group/:id/category" element={<MenuCategoryPage />} />*/}
          <Route path="menu/group/:id/category/create" element={<CreateCategoryPage />} />
          <Route path="menu/group/:id/category/:id" element={<MenuCategoryPage />} />

          <Route path="menu/group/:id/category/:id/menu/create" element={<CreateMenuPage />} />
        </Route>
      </Route>

      {/* 그룹 B: 네비게이션바가 필요 없는 화면들 (Login, Special) */}
      {/* 얘네는 MainLayout 밖으로 빼버립니다 */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;