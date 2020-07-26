import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

const TaskList = ({ data, ...props }) => {
  const list = data.map((item) => <Task key={item.id} data={item} {...props} />);
  return <ul className="todo-list">{list}</ul>;
};
TaskList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
      time: PropTypes.number,
      done: PropTypes.bool,
      editing: PropTypes.bool,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  offEdit: PropTypes.func.isRequired,
};
export default TaskList;
