import React from 'react';
import PropsTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  static propTypes = {
    addItem: PropsTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      minutes: '',
      seconds: '',
    };
  }

  handleInput = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleMinutes = (event) => {
    this.setState({
      minutes: event.target.value,
    });
  };

  handleSeconds = (event) => {
    this.setState({
      seconds: event.target.value,
    });
  };

  clear = () => {
    this.setState({
      value: '',
    });
  };

  render() {
    const { value, minutes, seconds } = this.state;
    const { addItem } = this.props;
    return (
      <form className="new-todo-form" onSubmit={addItem(value, this.clear)}>
        <input className="new-todo" placeholder="What needs to be done?" value={value} onChange={this.handleInput} />
        <input
          id="minutesInput"
          className="new-todo-form__timer"
          placeholder="Min"
          value={minutes}
          onChange={this.handleMinutes}
        />
        <input
          id="secondsInput"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={seconds}
          onChange={this.handleSeconds}
        />
        <button type="submit">ADD</button>
      </form>
    );
  }
}
