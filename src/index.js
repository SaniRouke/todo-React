import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app'
import uniqid from 'uniqid'

const data = [
  { label: 'text 1'},
  { label: 'text 2'},
  { label: 'text 3'},
].map(({ label, id }) => ({
  label: label,
  id: uniqid()
}))

ReactDOM.render(<App data={data} />, document.getElementById('root')
);
