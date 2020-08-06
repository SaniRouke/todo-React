import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const TasksFilter = ({ filter, activeFilter }) => {
  const buttons = [
    { label: 'All', id: 'all' },
    { label: 'Active', id: 'active' },
    { label: 'Completed', id: 'completed' },
  ].map(({ label, id }) => {
    const classes = cn({
      selected: activeFilter === id,
    });
    return (
      <li key={id}>
        <button type="button" className={classes} id={id} onClick={filter}>
          {label}
        </button>
      </li>
    );
  });
  TasksFilter.propTypes = {
    filter: PropTypes.func.isRequired,
    activeFilter: PropTypes.string.isRequired,
  };
  return <ul className="filters">{buttons}</ul>;
};

export default function Footer({ children, clearAll, itemsLeft }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft()} items left</span>
      {children}
      <button type="button" className="clear-completed" onClick={clearAll}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.TasksFilter = TasksFilter;

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  clearAll: PropTypes.func.isRequired,
  itemsLeft: PropTypes.func.isRequired,
};
