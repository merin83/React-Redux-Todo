import React, { Component } from 'react';
import clone from 'clone';

class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	todo: this.props.todo,
    };
  }
  handleEditButton(todoItem) {
    todoItem.editPanel = !todoItem.editPanel;
    this.setState({ todo: this.state.todo });
  }
  handleEditTodo(type, todoItem) {
    const data = {};
    data.type = type;
    data.text = this.input.value;
    data.id = todoItem.id;
    data.editPanel = todoItem.editPanel;
    data.completed = todoItem.completed;
    this.input.value = '';
    this.props.changeName(data);
  }
  handleChangeTypeTodo(type, todoItem) {
    const data = {};
    data.type = type;
    data.text = todoItem.text;
    data.id = todoItem.id;
    data.editPanel = todoItem.editPanel;
    data.completed = todoItem.completed;
    this.props.changeName(data);
  }
  render() {
  	const todo = this.props.todo;
    const divStyle = {
      textDecoration : 'line-through'
    }
    return (
      <li key={'single-item-'+ todo.id}>
        <input type="checkbox" onClick={this.handleChangeTypeTodo.bind(this,'COMPLETE_TODO', todo)}/>
        {todo.completed ? <span style={divStyle}>{todo.text}</span> : <span>{todo.text}</span>}
        <a href="#" onClick={this.handleEditButton.bind(this, todo)}> Edit </a>
        <a href="#" onClick={this.handleChangeTypeTodo.bind(this,'DELETE_TODO', todo)}> Delete </a>
        {todo.editPanel ? 
        	<div>
        		<input ref={node => {this.input = node;}}/>
      			<button onClick={this.handleEditTodo.bind(this, 'EDIT_TODO', todo)}>Add</button>
      		</div> 
      	: null}
      </li>
    );
  }
}
export default SingleItem;
