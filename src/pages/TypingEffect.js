import React, { Component } from 'react';

class TypingEffectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      index: 0,
    };
  }

  componentDidMount() {
    this.typeNextCharacter(); // 첫 글자 타이핑 시작
  }

  componentWillUnmount() {
    clearTimeout(this.timeout); // 타이머 정리
  }

  typeNextCharacter = () => {
    const content = 'Welcome to the Typing Effect Page!';
    const { text, index } = this.state;

    if (index < content.length) {
      this.setState(
        {
          text: text + content[index], // 한 글자 추가
          index: index + 1,
        },
        () => {
          const randomDelay = this.getRandomDelay(); // 랜덤 딜레이 계산
          this.timeout = setTimeout(this.typeNextCharacter, randomDelay); // 다음 글자 타이핑 예약
        }
      );
    }
  };

  getRandomDelay = () => {
    // 50ms ~ 400ms 사이의 랜덤 딜레이
    return Math.floor(Math.random() * (400 - 50 + 1)) + 50;
  };

  render() {
    return (
      <div style={{ fontSize: '24px', fontFamily: 'monospace', textAlign: 'center', marginTop: '20%' }}>
        {this.state.text}
      </div>
    );
  }
}

export default TypingEffectPage;
