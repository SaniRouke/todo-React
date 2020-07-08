import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'
import uniqid from 'uniqid'

const data = [
  'text1asd',
  'text2',
  'text3',
].map((item) => ({
  label: item,
  id: uniqid(),
  time: Date.now(),
  done: false,
  editing: false,
}))

ReactDOM.render(<App data={data} />, document.getElementById('root')
);
