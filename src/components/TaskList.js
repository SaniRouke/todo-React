import React from 'react';
import Task from './Task'

export default ({ data, onDelete, onToggleDone, onEdit, offEdit }) => {
  const list = data.map((item) => <Task
    key={item.id}
    data={item}
    onDelete={onDelete(item.id)}
    onToggleDone={onToggleDone(item.id)}
    onEdit={onEdit(item.id)}
    offEdit={offEdit} />)
  return (
    <ul className="todo-list">
      {list}
    </ul>
  )
}