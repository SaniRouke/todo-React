import React from 'react';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleInput = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  clear = (e) => {
    if (e.key !== 'Enter') return
    this.setState({
      value: ''
    })
  }

  render() {
    const { value } = this.state
    const { addItem } = this.props
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus value={value}
        onChange={this.handleInput}
        onKeyDown={addItem(value)}
        onKeyUp={this.clear} />
    )
  }
}