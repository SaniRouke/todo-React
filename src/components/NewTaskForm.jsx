import React, { useState } from 'react';
import PropsTypes from 'prop-types';

export default function NewTaskForm({ addItem }) {
  const [value, setValue] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const clear = () => {
    setValue('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <form className="new-todo-form" onSubmit={addItem(value, clear)}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <input
        id="minutesInput"
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={(event) => setMinutes(event.target.value)}
      />
      <input
        id="secondsInput"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={(event) => setSeconds(event.target.value)}
      />
      <button type="submit">ADD</button>
    </form>
  );
}

NewTaskForm.propTypes = {
  addItem: PropsTypes.func.isRequired,
};
