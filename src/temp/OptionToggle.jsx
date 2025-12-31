import React, {useState} from 'react';

function OptionToggle() {
    const [showExtra, setShowExtra] = useState(false);

    return (
        <div className="option-container">
          <label>
            <input 
              type="checkbox" 
              checked={showExtra}
              onChange={() => setShowExtra(!showExtra)} // 클릭할 때마다 반전
            />
            추가 옵션 입력하기
          </label>
    
          {/* 2. 조건부 렌더링: showExtra가 true일 때만 아래 div가 나타남 */}
          {showExtra && (
            <div className="extra-input-div">
              <h4>추가 옵션 상세</h4>
              <input type="text" placeholder="예: 샷 추가, 덜 달게 등" />
            </div>
          )}
        </div>
    )
}