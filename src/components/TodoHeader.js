import React, { Component } from 'react'

export default class TodoHeader extends Component {
  state = {
    name: '',
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          onKeyUp={this.addToDo}
        />
      </header>
    )
  }
  addToDo = (e) => {
    if (e.keyCode !== 13) return
    if (!this.state.name.trim()) {
      return alert('input unvalid')
    } else {
      this.props.addToDo(this.state.name)
    }
    this.setState({
      name: '',
    })
  }
}
