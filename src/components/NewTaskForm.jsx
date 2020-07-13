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
    };
  }

  handleInput = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  clear = () => {
    this.setState({
      value: '',
    });
  };

  render() {
    const { value } = this.state;
    const { addItem } = this.props;
    return (
      <form className="adding-wrapper" onSubmit={addItem(value, this.clear)}>
        <input className="new-todo" placeholder="What needs to be done?" value={value} onChange={this.handleInput} />
        <button type="submit">ADD</button>
      </form>
    );
  }
}
