import React, { Component } from 'react';

class TypingEffect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '', // 현재 화면에 출력된 텍스트
      lineIndex: 0, // 현재 출력 중인 줄의 인덱스
      charIndex: 0, // 현재 줄에서 출력 중인 글자의 인덱스
    };
  }

  componentDidMount() {
    this.typeNextCharacter(); // 첫 번째 줄의 첫 글자부터 출력 시작
    if (this.props.onTypingStart) this.props.onTypingStart();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout); // 예약된 타이머 정리
    if(this.props.onTypingEnd) this.props.onTypingEnd();
  }

  typeNextCharacter = () => {
    const { lines } = this.props; // props로 전달된 텍스트 배열 사용
    const { lineIndex, charIndex, text } = this.state;

    if (!lines || lines.length === 0) return; // 텍스트가 없는 경우 종료

    const currentLine = lines[lineIndex]; // 현재 줄 텍스트 가져오기

    if (charIndex < currentLine.length) {
      // 현재 줄에서 다음 글자를 추가
      this.setState({
        text: text + currentLine[charIndex],
        charIndex: charIndex + 1, // 다음 글자로 이동
      });

      const randomDelay = this.getRandomDelay();
      this.timeout = setTimeout(this.typeNextCharacter, randomDelay);
    } else if (lineIndex < lines.length - 1) {
      // 현재 줄이 끝났고, 다음 줄이 남아 있을 경우
      this.setState({
        text: text + '\n', // 줄 바꿈 추가
        lineIndex: lineIndex + 1, // 다음 줄로 이동
        charIndex: 0, // 다음 줄의 첫 글자로 초기화
      });

      const randomDelay = this.getRandomDelay();
      this.timeout = setTimeout(this.typeNextCharacter, randomDelay);
    } else {
      // 타이핑 완료
      if (this.props.onTypingEnd) this.props.onTypingEnd(); // 타이핑 종료 알림
    }
  };

  getRandomDelay = () => {
    const { minDelay = 50, maxDelay = 400 } = this.props; // 딜레이 범위 기본값
    return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  };

  render() {
    return (
      <div style={this.props.style}>
        {this.state.text}
      </div>
    );
  }  
}

export default TypingEffect;
