import api from '../api';
import '../Style.css'; 
import '../CustomStyle.css';
import { useState } from 'react';
import { useNavigate, useOutletContext, useLocation  } from 'react-router-dom';

function CreateMenuPage() {;
    const navigate = useNavigate();
    const location = useLocation();
    const { store, menuGroup, menuCategory } = location.state || {};
    const [inputs, setInputs] = useState({
        menuName: '',
        menuInfo: '',
        allergy: '',
        menuCategoryId: menuCategory.menuCategoryId,
        menuOptions: []
    });
    const [imageFile, setImageFile] = useState(null);
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // 옵션 추가 
    const addMenuOption = () => {
        const newOption = {
            optionName: '',
            selectionNum: 0,
            optionCategories: [{optionCategory: ''}]
        };
        setInputs({
            ...inputs,
            menuOptions: [
                ...inputs.menuOptions, newOption
            ]
        });
    }

    // 옵션 삭제 
    const removeMenuOption = (index) => {
        const newOptions = inputs.menuOptions.filter((_, i) => i !== index);
        setInputs({ ...inputs, menuOptions: newOptions });
    };

    // 옵션 필드 수정 (Name, SelectionNum)
    const handleOptionChange = (index, field, value) => {
        const newOptions = inputs.menuOptions.map((opt, i) => 
            i === index ? { ...opt, [field]: value } : opt
        );
        setInputs({ ...inputs, menuOptions: newOptions });
    };

    // 세부 옵션
    // 세부 옵션 추가
    const addOptionCategory = (optIndex) => {
        const newOptions = inputs.menuOptions.map((opt, i) => {
          if (i === optIndex) {
            return {
              ...opt,
              optionCategories: [...opt.optionCategories, { optionContent: '' }]
            };
          }
          return opt;
        });
        setInputs({ ...inputs, menuOptions: newOptions });
    };

    // 세부 옵션 삭제
    const removeOptionCategory = (optIndex, catIndex) => {
        const newOptions = inputs.menuOptions.map((opt, i) => {
          if (i === optIndex) {
            const newCats = opt.optionCategories.filter((_, ci) => ci !== catIndex);
            return { ...opt, optionCategories: newCats };
          }
          return opt;
        });
        setInputs({ ...inputs, menuOptions: newOptions });
    };
    
    const handleCategoryChange = (optIndex, catIndex, value) => {
        const newOptions = inputs.menuOptions.map((opt, i) => {
          if (i === optIndex) {
            const newCats = opt.optionCategories.map((cat, ci) => 
              ci === catIndex ? { ...cat, optionContent: value } : cat
            );
            return { ...opt, optionCategories: newCats };
          }
          return opt;
        });
        setInputs({ ...inputs, menuOptions: newOptions });
    };
    /*
    const addOptionCategories = () => {
        const optionCategory = {
            optionContent: ''
        }
    }*/

    console.log("그룹 정보: ", menuGroup)

    const handleSubmit = async () => {

        const formData = new FormData();

        // 1. JSON 데이터 추가 (Blob으로 감싸서 전송)
        const json = JSON.stringify(inputs);
        const blob = new Blob([json], { type: 'application/json' });
        formData.append('menuData', blob);

        formData.append('image', imageFile);


        try {
            console.log(inputs);
            await api.post('/api/user/store/group/category/menu/create', formData, {
                headers: {
                    'Content-Type': undefined
                }
            })
    
            navigate('/my/store')
        } catch (error) {
            // 1. 개발자 도구 콘솔에 진짜 에러 내용을 출력합니다.
            console.log("에러 전체:", error);
            console.log("서버 응답:", error.response); 
            console.log("서버 에러 메시지:", error.response?.data); // ★ 여기가 핵심!
    
            // 2. 상태 코드에 따라 다른 안내를 해주는 게 좋습니다.
            // 중복된 이름인 경우 등 다양한 설정. 이건 나중에
            if (error.response?.status === 401 || error.response?.status === 403) {
                alert('로그인이 필요하거나 권한이 없습니다.');
            } else if (error.response?.status === 400) {
                alert('입력값이 잘못되었습니다. (가게 이름 형식을 확인하세요)');
            } else {
                alert('서버 오류가 발생했습니다.');
            }
        }
    }

    return (
        <div className="store-content ">{/*overflow-hidden*/}
            <div className="content-card ">
                <div>
                    <h2>메뉴 만들기 페이지</h2>
                </div>
                <div className="content-scrollable">
                    <div className="input-group">
                        <input 
                            name="menuName"
                            value={inputs.menuName}
                            onChange={(e) => setInputs({...inputs, menuName: e.target.value})}
                            placeholder='메뉴 이름'
                        />
                        <input 
                            name="menuInfo"
                            value={inputs.menuInfo}
                            onChange={(e) => setInputs({...inputs, menuInfo: e.target.value})}
                            placeholder='메뉴 소개(필수X)'
                        />
                        <input 
                            name="allergy"
                            value={inputs.allergy}
                            onChange={(e) => setInputs({...inputs, allergy: e.target.value})}
                            placeholder='알러지 정보(필수X)'
                        />
                        <input 
                            type="file"
                            onChange={handleFileChange}
                            placeholder="메뉴 사진"
                        />
                        <div>

                        </div>
                    </div>
                    <button type="button" onClick={addMenuOption} className="btn-add-main" >
                        + 옵션 추가
                    </button>

                    {inputs.menuOptions.map((opt, optIndex) => (
                        <div key={optIndex} className="option-card"> 
                            <div className="option-header">
                                <input 
                                    value={opt.optionName}
                                    onChange={(e) => handleOptionChange(optIndex, 'optionName', e.target.value)}
                                    placeholder="옵션 이름"
                                />
                                <input 
                                    type="number"
                                    value={opt.selectionNum}
                                    onChange={(e) => handleOptionChange(optIndex, 'selectionNum', e.target.value)}
                                    placeholder="최대 선택 개수"
                                />
                                <button onClick={() => removeMenuOption(optIndex)} className="btn-del">삭제</button>
                            </div>

                            {/* 세부 옵션(OptionCategory) */}
                            <div className="option-category-list">
                                {opt.optionCategories.map((cat, catIndex) => (
                                    <div key={catIndex} className="option-category-item">
                                        <input 
                                            value={cat.optionContent}
                                            onChange={(e) => handleCategoryChange(optIndex, catIndex, e.target.value)}
                                            placeholder="세부 옵션 내용"
                                        />
                                        <button onClick={() => removeOptionCategory(optIndex, catIndex)} className="btn-del-small">-</button>
                                    </div>
                                ))}
                                <button onClick={() => addOptionCategory(optIndex)} className="btn-add-small">
                                    + 세부옵션 추가
                                </button>
                                <div>

                                </div>
                            </div>
                        </div>
                    
                    ))}
                    {/* 하단 버튼 영역 (고정) */}

                </div>
                <div className="footer-buttons" style={{ paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                    <button onClick={() => console.log(inputs)}>
                        최종 데이터 확인(콘솔)
                    </button>
                    <div onClick={handleSubmit} className="btn-submit">
                        <h4>메뉴 생성</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateMenuPage;