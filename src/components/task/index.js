import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import cn from 'classnames';

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: false,
    }
  }
  
  handleChange = () => {
    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }))
  }

  render() {
    const { isChecked } = this.state
    const { description, id, onDelete } = this.props
    const time = formatDistanceToNow(new Date(2020, 6, 2, 21, 19))
    const classes = cn({
      completed: isChecked
    })

    return (
      <li className={classes}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={this.handleChange} checked={this.state.isChecked}/>
          <label>
            <span className="description">{ description }</span>
            <span className="created">created {time} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDelete(id)}></button>
        </div>
      </li>
    )
  // <li className="editing">
  //   <div className="view">
  //     <input className="toggle" type="checkbox" />
  //     <label>
  //       <span className="description">Editing task</span>
  //       <span className="created">created 5 minutes ago</span>
  //     </label>
  //     <button className="icon icon-edit"></button>
  //     <button className="icon icon-destroy"></button>
  //   </div>
  //   <input type="text" className="edit" value="Editing task" />
  // </li>
  // <li>
  //   <div className="view">
  //     <input className="toggle" type="checkbox" />
  //     <label>
  //       <span className="description">Active task</span>
  //       <span className="created">created 5 minutes ago</span>
  //     </label>
  //     <button className="icon icon-edit"></button>
  //     <button className="icon icon-destroy"></button>
  //   </div>
  // </li>
  }
}
