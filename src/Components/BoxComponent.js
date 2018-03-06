import React, { Component } from 'react';
import ResultBox from './ResultBox';
import QuestionBox from './QuestionBox';
//import './style.css';

class BoxComponent extends Component {

  render() {
    return (
      <div>
          <QuestionBox question = {this.props.inputText}/>
          <ResultBox result = {this.props.result}/>
      </div>
    )
  }
}
export default BoxComponent;