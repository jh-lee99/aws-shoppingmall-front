import React from 'react';

class MyComponent extends React.Component {
  handleButtonClick = () => {
    // 현재 도메인 주소를 가져옵니다.
    const currentDomain = window.location.origin;

    // 현재 도메인 주소에 "/event" 경로를 추가합니다.
    const url = `${currentDomain}/event`;

    // 새로운 팝업 창을 엽니다.
    window.open(url, '_blank', 'width=600,height=400');
  };

  render() {
    return (
      <div>
        {/* 버튼을 렌더링합니다. */}
        <button onClick={this.handleButtonClick}>이벤트</button>
      </div>
    );
  }
}

export default MyComponent;
