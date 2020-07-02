import React from 'react';
import TasksFilter from '../task-filter';

export default class Footer extends React.Component {

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">1 items left</span>
        <TasksFilter />
        <button className="clear-completed">Clear completed</button>
      </footer>
    )
  }
}