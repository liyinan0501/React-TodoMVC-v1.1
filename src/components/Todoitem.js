import React, { Component } from 'react'
import classnames from 'classnames'

export default class Todoitem extends Component {
  //记录当前双击的id 和 name
  state = {
    currentId: '',
    currentName: '',
  }
  inputRef = React.createRef()
  render() {
    const { item } = this.props
    return (
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
          <label onDoubleClick={() => this.showEdit(item)}>{item.name}</label>
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
          onBlur={() => this.setState({ currentId: '' })}
          ref={this.inputRef}
        />
      </li>
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
  componentDidUpdate() {
    // let input have a focus
    this.inputRef.current.focus()
  }
}
