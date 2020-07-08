import React from 'react';
import cn from 'classnames'

const TasksFilter = ({ filter, activeFilter }) => {
  const buttons = [
    { label: 'All', id: 'all'},
    { label: 'Active', id: 'active'},
    { label: 'Completed', id: 'completed'}
  ].map(({ label, id }) => {
    const classes = cn({
      selected: activeFilter === id
    })
    return <li key={id}>
      <button className={classes} id={id}>{label}</button>
    </li>
  })

  return (
    <ul className="filters" onClick={filter}>
      {buttons}
    </ul>
  )
}

export default class Footer extends React.Component {
  static TasksFilter = TasksFilter
  
  render() {
    const { children, clearAll, itemsLeft } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{itemsLeft()} items left</span>
        {children}
        <button className="clear-completed" onClick={clearAll}>Clear completed</button>
      </footer>
    )
  }
}