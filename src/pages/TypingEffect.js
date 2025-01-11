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
    this.interval = setInterval(this.addCharacter, 100); // 100ms마다 글자 추가
  }

  componentWillUnmount() {
    clearInterval(this.interval); // 타이머 정리
  }

  addCharacter = () => {
    const content = 'Welcome to the Typing Effect Page!';
    const { text, index } = this.state;
    if (index < content.length) {
      this.setState({
        text: text + content[index],
        index: index + 1,
      });
    } else {
      clearInterval(this.interval); // 타이머 종료
    }
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
