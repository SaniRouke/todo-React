import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { formatDistanceToNow, format, addSeconds, compareAsc } from 'date-fns';

export default class Task extends React.Component {
  static propTypes = {
    data: PropTypes.exact({
      label: PropTypes.string,
      id: PropTypes.string,
      time: PropTypes.number,
      timeTodo: PropTypes.any,
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
      timeTodo: props.data.timeTodo,
      isTimeUp: false,
      isPlay: false,
    };
  }

  componentDidMount() {
    this.tick();
    this.initTimerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.initTimerID);
    clearInterval(this.timerId);
  }

  handleChange = (event) => {
    this.setState({
      editValue: event.target.value,
    });
  };

  startTimer = () => {
    this.setState(({ isPlay }) => ({
      isPlay: !isPlay,
    }));
    this.timerId = setInterval(() => {
      const { timeTodo } = this.state;
      const isTimeUp = compareAsc(new Date(0, 0, 1, 0, 0, 1), timeTodo);
      if (isTimeUp === 1) {
        this.setState({
          isTimeUp: true,
        });
      } else {
        this.setState({
          isTimeUp: false,
        });
      }
      this.setState(() => ({
        timeTodo: addSeconds(timeTodo, -1),
      }));
    }, 1000);
  };

  stopTimer = () => {
    this.setState(({ isPlay }) => ({
      isPlay: !isPlay,
    }));
    clearInterval(this.timerId);
  };

  tick() {
    const { data } = this.props;
    this.setState({
      time: formatDistanceToNow(new Date(data.time)),
    });
  }

  render() {
    const { editValue, time, timeTodo, isTimeUp, isPlay } = this.state;
    const { data, onDelete, onToggleDone, onEdit, offEdit } = this.props;
    const { label, id, done, editing } = data;
    const classes = cn({
      completed: done,
      editing,
    });
    const styles = isTimeUp ? { color: 'red' } : undefined;
    return (
      <li className={classes} id={id}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone(id)} />
          <label>
            <span id={`button-edit-${id}`} className="title" style={styles}>
              {label}
            </span>
            <span className="description">
              {isPlay ? (
                <button type="button" className="icon icon-pause" onClick={this.stopTimer} label="pause" />
              ) : (
                <button type="button" className="icon icon-play" onClick={this.startTimer} label="play" />
              )}
              <span className="spent-time">{format(timeTodo, 'mm:ss')}</span>
            </span>
            <span id={`button-destroy-${id}`} className="description">
              created {time} ago
            </span>
          </label>
          <button type="button" className="icon icon-edit" onClick={onEdit(id)} aria-labelledby={`button-edit-${id}`} />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDelete(id)}
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
