import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { formatDistanceToNow, format, addSeconds, compareAsc } from 'date-fns';

export default function Task({ data, onDelete, onToggleDone, onEdit, offEdit }) {
  const { label, id, done, editing } = data;

  const [editValue, setEditValue] = useState(label);
  const [time, setTime] = useState(data.time);
  const [timeTodo, setTimeTodo] = useState(data.timeTodo);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  let timerId;

  useEffect(() => {
    const tick = () => {
      setTime(formatDistanceToNow(new Date(data.time)));
    };
    tick();
    const initTimerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(initTimerID);
      clearInterval(timerId);
    };
  }, [timerId, data.time]);

  const startTimer = () => {
    setIsPlay(() => !isPlay);
    timerId = setInterval(() => {
      const compareTime = compareAsc(new Date(0, 0, 1, 0, 0, 1), timeTodo);
      if (compareTime === 1) {
        setIsTimeUp(true);
      } else {
        setIsTimeUp(false);
      }
      setTimeTodo(() => addSeconds(timeTodo, -1));
    }, 1000);
  };

  const stopTimer = () => {
    setIsPlay(() => !isPlay);
    clearInterval(timerId);
  };

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
              <button type="button" className="icon icon-pause" onClick={stopTimer} label="pause" />
            ) : (
              <button type="button" className="icon icon-play" onClick={startTimer} label="play" />
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
          <input
            name="input"
            type="text"
            className="edit"
            value={editValue}
            onChange={(event) => setEditValue(event.target.value)}
          />
          <button type="submit">OK</button>
        </form>
      )}
    </li>
  );
}

Task.propTypes = {
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
