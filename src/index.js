import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css'
import './styles/index.css'

//import components
import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'
import TodoFooter from './components/TodoFooter'

class App extends Component {
  state = {
    list: [
      { id: 1, name: 'eating', done: false },
      { id: 2, name: 'sleeping', done: true },
      { id: 3, name: 'playing', done: false },
    ],
    type: 'all',
  }
  render() {
    const { list, type } = this.state
    return (
      <section className="todoapp">
        <TodoHeader addToDo={this.addToDo}></TodoHeader>
        <TodoMain
          list={list}
          delToDoById={this.delToDoById}
          updateDoneById={this.updateDoneById}
          editTodo={this.editTodo}
          type={type}
          checkAll={this.checkAll}
        ></TodoMain>
        <TodoFooter
          list={list}
          clearTodo={this.clearTodo}
          type={type}
          changeType={this.changeType}
        ></TodoFooter>
      </section>
    )
  }

  delToDoById = (id) => {
    this.setState({
      list: this.state.list.filter((item) => item.id !== id),
    })
  }
  updateDoneById = (id) => {
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            done: !item.done,
          }
        } else {
          return item
        }
      }),
    })
  }
  addToDo = (name) => {
    this.setState({
      list: [
        {
          id: Date.now(),
          name: name,
          done: false,
        },
        ...this.state.list,
      ],
    })
  }
  editTodo = (id, name) => {
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: name,
          }
        } else {
          return item
        }
      }),
    })
  }
  clearTodo = () => {
    this.setState({
      list: this.state.list.filter((item) => !item.done),
    })
  }
  changeType = (type) => {
    this.setState({
      type: type,
    })
  }
  checkAll = (check) => {
    this.setState({
      list: this.state.list.map((item) => {
        return {
          ...item,
          done: check,
        }
      }),
    })
  }
}

createRoot(document.getElementById('root')).render(<App />)
