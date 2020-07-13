import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import uniqid from 'uniqid';
import App from './components/App';

const data = ['text1asd', 'text2', 'text3'].map((item) => ({
  label: item,
  id: uniqid(),
  time: Date.now(),
  done: false,
  editing: false,
}));

ReactDOM.render(<App data={data} />, document.getElementById('root'));
