import {useState} from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios'
import '../Style.css'

function HomePage() {
    const navigate = useNavigate();
    const {userName} = useOutletContext();
    const goMyStore = () => {
        navigate('/my/store');
    }

    return (
        <div class="">
            <header class="masthead bg-primary text-white text-center">
                <h1 class="masthead-heading text-uppercase mb-0">Y Kiosk</h1>
                <div class="divider-custom divider-light">
                    <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    {/*<div class="divider-custom-icon"><i class="fas fa-star"></i></div> 별모양이 안나와서 일단 주석. 주석 풀어도 에러는 안남*/}
                    <div class="divider-custom-line"></div>
                    </div>
                </div>
                <p class="masthead-subheading font-weight-light mb-0">누구나 쓸 수 있는 간단한 키오스크</p>
            </header>
            <section class="page-section ">
                <div class="container d-flex justify-content-center">
                    {/*
                    {!userName? (   
                        <div >   
                            <p>임시</p>
                        </div>
                    ) : (
                        <div>
                            <h3 onClick={goMyStore}>내 가게</h3>
                            <h3>{userName}</h3>
                        </div>
                    )}*/}
                    <div>
                            <h3 onClick={goMyStore}>내 가게</h3>
                            <h3>{userName}</h3>
                        </div>
                    <div >

                    </div>
                </div>
            </section>
            
        </div>
    );
}

export default HomePage;

