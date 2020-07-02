import React from 'react';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handlerChange = (e) => {
    this.setState({ value: e.target.value })
  }

  render() {
    const { value } = this.state
    console.log(value)
    return (
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={value}
          onChange={this.handlerChange} />
    )
  }
}