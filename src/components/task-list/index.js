import React from 'react';
import Task from '../task';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  onDelete = (currentID) => () => {
    this.setState(({ data }) => ({
      data: data.filter(({ id }) => currentID !== id)
    }))
  }

  render() {
    const { data } = this.state
    const list = data.map(({ label, id }) => <Task
      description={label}
      id={id}
      key={id}
      onDelete={this.onDelete} />)
    return (
      <ul className="todo-list">
        {list}
      </ul>
    )
  }
}
