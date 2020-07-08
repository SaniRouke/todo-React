import React from 'react';
import cn from 'classnames';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editValue: props.data.label,
      time: props.data.time
    }
  }

  handleChange = (e) => {
    this.setState({
      editValue: e.target.value
    })
  }

  componentDidMount() {
    this.tick()
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const { time } = this.props.data
    this.setState({
      time: formatDistanceToNow(new Date(time))
    })
  }

  render() {
    const { editValue, time } = this.state
    const { data, onDelete, onToggleDone, onEdit, offEdit } = this.props
    const { label, id, done, editing } = data
    const classes = cn({
      completed: done,
      editing: editing
    })
    return (
      <li className={classes} id={id}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone}/>
          <label>
            <span className="description">{label}</span>
            <span className="created">created {time} ago</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
        {editing && <input
          name='input'
          type="text"
          className="edit"
          value={editValue}
          onChange={this.handleChange}
          onKeyUp={offEdit(id, editValue)} ></input>}
      </li>
    )
  }
}