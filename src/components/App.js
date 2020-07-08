import React from 'react';
import TaskList from './TaskList';
import Footer from './Footer';
import NewTaskForm from './NewTaskForm';
import uniqid from 'uniqid';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      activeFilter: 'all'
    }
  }
  
  onToggleDone = (currentId) => () => {
    this.setState(({ data }) => {
      const newData = data.map((item) => {
        const { done, ...otherProps} = item
        if (item.id === currentId) return {
          ...otherProps,
          done: !done,
        }
        return item
      })
      return ({
        data: newData
      })
    })
  }

  onEdit = (currentId) => (e) => {
    this.setState(({ data }) => {
      const newData = data.map((item) => {
        const { editing, ...otherProps} = item
        if (item.id === currentId) return {
          ...otherProps,
          editing: !editing,
        }
        return item
      })
      return ({
        data: newData
      })
    })
  }

  offEdit = (currentId, val) => (e) => {
    if (e.key !== 'Enter') return
    this.setState(({ data }) => {
      const newData = data.map((item) => {
        const { editing, label, ...otherProps} = item
        if (item.id === currentId) return {
          ...otherProps,
          editing: !editing,
          label: val,
        }
        return item
      })
      return ({
        data: newData
      })
    })
  }

  onDelete = (currentId) => () => {
    this.setState(({ data }) => ({
      data: data.filter(({ id }) => currentId !== id)
    }))
  }

  filter = (e) => {
    this.setState({
      activeFilter: e.target.id
    })
  }

  addItem = (val) => (e) => {
    if (e.key !== 'Enter' || val === '') return
    this.setState(({ data }) => {
      const newItem = {
        label: val,
        id: uniqid(),
        time: Date.now(),
        done: false,
        editing: false
      }
      
      return {
        data: [newItem, ...data]
      }
    })
  }

  clearAll = () => {
    this.setState({
      data: []
    })
  }

  itemsLeft = () => this.state.data.filter(i => !i.done).length

  render() {
    const { data, activeFilter } = this.state
    const filteredData = data.filter(({ done }) => {
      switch(activeFilter) {
        case 'active':
          return !done
        case 'completed':
          return done
        default:
          return true
      }
    })
    
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
            offEdit={this.offEdit} />
          <Footer clearAll={this.clearAll} itemsLeft={this.itemsLeft} >
            <Footer.TasksFilter filter={this.filter} activeFilter={activeFilter} />
          </Footer>
        </section>
      </section>
    )
  }
}