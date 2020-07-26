import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import uniqid from 'uniqid';
import App from './components/App';

const data = ['text1asd', 'text2', 'text3'].map((item, index) => ({
  label: item,
  id: uniqid(),
  time: Date.now(),
  timeTodo: new Date(0, 0, 1, 0, index, 0),
  done: false,
  editing: false,
}));

ReactDOM.render(<App data={data} />, document.getElementById('root'));
