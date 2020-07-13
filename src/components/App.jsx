import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import TaskList from './TaskList';
import Footer from './Footer';
import NewTaskForm from './NewTaskForm';

export default class App extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        id: PropTypes.string,
        time: PropTypes.number,
        done: PropTypes.bool,
        editing: PropTypes.bool,
      })
    ).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      activeFilter: 'all',
    };
  }

  onToggleDone = (currentId) => () => {
    this.setState(({ data }) => {
      const newData = data.map((item) => {
        const { done, ...otherProps } = item;
        if (item.id === currentId) {
          return {
            ...otherProps,
            done: !done,
          };
        }
        return item;
      });
      return {
        data: newData,
      };
    });
  };

  onEdit = (currentId) => () => {
    this.setState(({ data }) => {
      const newData = data.map((item) => {
        const { editing, ...otherProps } = item;
        if (item.id === currentId) {
          return {
            ...otherProps,
            editing: !editing,
          };
        }
        return item;
      });
      return {
        data: newData,
      };
    });
  };

  offEdit = (currentId, val) => (event) => {
    event.preventDefault();
    if (val === '') return;
    this.setState(({ data }) => {
      const newData = data.map((item) => {
        const { editing, label, ...otherProps } = item;
        if (item.id === currentId) {
          return {
            ...otherProps,
            editing: !editing,
            label: val,
          };
        }
        return item;
      });
      return {
        data: newData,
      };
    });
  };

  onDelete = (currentId) => () => {
    this.setState(({ data }) => ({
      data: data.filter(({ id }) => currentId !== id),
    }));
  };

  filter = (event) => {
    this.setState({
      activeFilter: event.target.id,
    });
  };

  addItem = (val, clearCallback) => (event) => {
    event.preventDefault();
    if (val === '') return;
    this.setState(({ data }) => {
      const newItem = {
        label: val,
        id: uniqid(),
        time: Date.now(),
        done: false,
        editing: false,
      };
      clearCallback();
      return {
        data: [newItem, ...data],
      };
    });
  };

  clearAll = () => {
    this.setState({
      data: [],
    });
  };

  itemsLeft = () => {
    const { data } = this.state;
    return data.filter((i) => !i.done).length;
  };

  render() {
    const { data, activeFilter } = this.state;
    const filteredData = data.filter(({ done }) => {
      switch (activeFilter) {
        case 'active':
          return !done;
        case 'completed':
          return done;
        default:
          return true;
      }
    });

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            data={filteredData}
            onDelete={this.onDelete}
            onToggleDone={this.onToggleDone}
            onEdit={this.onEdit}
            offEdit={this.offEdit}
          />
          <Footer clearAll={this.clearAll} itemsLeft={this.itemsLeft}>
            <Footer.TasksFilter filter={this.filter} activeFilter={activeFilter} />
          </Footer>
        </section>
      </section>
    );
  }
}
