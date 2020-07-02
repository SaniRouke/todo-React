import React from 'react';
import Task from '../task';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [1,2,3]
    }
  }

  render() {
    const { items } = this.state
    const list = items.map((item, i) => <Task description={item} key={i}/>)
    return (
      <ul className="todo-list">
        {list}
      </ul>
    )
  }
}
