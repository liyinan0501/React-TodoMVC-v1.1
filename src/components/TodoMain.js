import React, { Component } from 'react'
import classnames from 'classnames'

export default class TodoMain extends Component {
  //记录当前双击的id 和 name
  state = {
    currentId: '',
    currentName: '',
  }
  render() {
    const { list, type } = this.props
    let showList = []
    if (type === 'active') {
      showList = list.filter((item) => !item.done)
    } else if (type === 'completed') {
      showList = list.filter((item) => item.done)
    } else {
      showList = list
    }
    return (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={list.every((item) => item.done)}
          onChange={this.handleChange}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {showList.map((item) => (
            <li
              className={classnames({
                completed: item.done,
                editing: item.id === this.state.currentId,
              })}
              key={item.id}
            >
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={item.done}
                  onChange={() => this.updateDone(item.id)}
                />
                <label onDoubleClick={() => this.showEdit(item)}>
                  {item.name}
                </label>
                <button
                  className="destroy"
                  onClick={() => this.delTodo(item.id)}
                ></button>
              </div>
              {/* <input className="edit" value="Create a TodoMVC template"  /> */}
              <input
                className="edit"
                value={this.state.currentName}
                onChange={(e) => this.setState({ currentName: e.target.value })}
                onKeyUp={this.handleKeyup}
              />
            </li>
          ))}
        </ul>
      </section>
    )
  }
  delTodo = (id) => {
    this.props.delToDoById(id)
  }
  updateDone = (id) => {
    this.props.updateDoneById(id)
  }
  showEdit = ({ id, name }) => {
    this.setState({
      currentId: id,
      currentName: name,
    })
  }
  handleKeyup = (e) => {
    if (e.keyCode === 27) {
      this.setState({
        currentId: '',
        currentName: '',
      })
    }
    if (e.keyCode === 13) {
      this.props.editTodo(this.state.currentId, this.state.currentName)
      this.setState({
        currentId: '',
        currentName: '',
      })
    }
  }
  handleChange = (e) => {
    this.props.checkAll(e.target.checked)
  }
}
