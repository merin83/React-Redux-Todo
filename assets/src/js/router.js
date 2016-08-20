import React, { Component } from 'react';
import { connect } from 'react-redux'
import initial from 'modules'
import { SingleItem } from 'containers';
import request from 'superagent';
import Firebase from 'firebase';
import Config from './config';

const appFirebase = Firebase.initializeApp(Config);
const rootRef = Firebase.database().ref();


// console.log(rootRef);
function changeName(data) {
  return {
    type: data.type,
    id: data.id,
    text: data.text,
    editPanel: data.editPanel,
    completed: data.completed,
  };
}
class Router extends Component {
  constructor(props) {
    super(props);
    this.handleFireBaseConect = this.handleFireBaseConect.bind(this);
    this.state = {
      value: '',
    };
  }
  handleTodo(type) {
    const data = {};
    data.type = type;
    data.text = this.input.value;
    data.id = new Date().getTime();
    data.editPanel = false;
    data.completed = false;
    this.input.value = '';
    this.props.changeName(data);
  }
  handleFireBaseConect() {
    this.props.FetchFireBaseData();
  }
   render() {
    return (<div>
      <input ref={node => {this.input = node;}}/>
      <button onClick={this.handleTodo.bind(this,'ADD_TODO')}>Add</button>
      <ul>
        {this.props.todos.map(todo =>
          <SingleItem key={todo.id} todo={todo} {...this.props}/>
        )}
      </ul>
      <button onClick={this.handleFireBaseConect}>Connect Firebase</button>
    </div>);
  }
}
function mapStateToProps(state) {
  return { 
    todos: state.initial.todos,
  }
}

function successRequest(data) {
  console.log(data);
  return ({
    type: 'FetchFireBaseData',
    todos: data,
  }); 
}

// For doing async request
function FetchFireBaseData() {
  return (dispatch, getState) => {
    const stateData = getState();
    const updatedTodos = stateData.initial.todos;
    let data = null;
    if(updatedTodos === null) {
      Firebase.database()
      .ref('/todos').on('value', function(snapshot) {
        data = snapshot.val();
        // console.log('data', data);
        Firebase.database().ref('/todos').set(data);
      });
    }
    if(updatedTodos !== null) {
      if(updatedTodos.length !== 0) {
        // console.log('updatedTodos', updatedTodos.length);
        Firebase.database().ref('/todos').set(updatedTodos);
      }
    }
    request
    .get(appFirebase)
    .end(function(err, res){
        // Do something 
      if (res.statusText === 'OK') {
          Firebase.database()
          .ref('/todos').on('value', function(snapshot) {
            const data = snapshot.val();
            return dispatch(successRequest(data));
          });
      }
    });  
  }
}

export default connect(mapStateToProps, {changeName, FetchFireBaseData})(Router)
