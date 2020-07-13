import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends React.Component {
  static propTypes = {
    data: PropTypes.exact({
      label: PropTypes.string,
      id: PropTypes.string,
      time: PropTypes.number,
      done: PropTypes.bool,
      editing: PropTypes.bool,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    offEdit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editValue: props.data.label,
      time: props.data.time,
    };
  }

  componentDidMount() {
    this.tick();
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleChange = (event) => {
    this.setState({
      editValue: event.target.value,
    });
  };

  tick() {
    const { data } = this.props;
    this.setState({
      time: formatDistanceToNow(new Date(data.time)),
    });
  }

  render() {
    const { editValue, time } = this.state;
    const { data, onDelete, onToggleDone, onEdit, offEdit } = this.props;
    const { label, id, done, editing } = data;
    const classes = cn({
      completed: done,
      editing,
    });
    return (
      <li className={classes} id={id}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
          <label>
            <span id={`button-edit-${id}`} className="description">
              {label}
            </span>
            <span id={`button-destroy-${id}`} className="created">
              created {time} ago
            </span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEdit} aria-labelledby={`button-edit-${id}`} />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDelete}
            aria-labelledby={`button-destroy-${id}`}
          />
        </div>
        {editing && (
          <form className="editing-wrapper" onSubmit={offEdit(id, editValue)}>
            <input name="input" type="text" className="edit" value={editValue} onChange={this.handleChange} />
            <button type="submit">OK</button>
          </form>
        )}
      </li>
    );
  }
}
