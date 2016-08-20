import clone from 'clone';
import { findIndex } from 'underscore';

function initial(state = {
  todos: [],
  fresh: {},
}, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        ...state,
        todos: state.todos.concat([{ id: action.id, text: action.text, editPanel: action.editPanel, completed: action.completed}]),
      };
    }
    case 'FetchFireBaseData': {
      console.log(action.todos);
      return {
        ...state,
        todos: state.todos.concat(action.todos),
      };
    }
    case 'EDIT_TODO': {
      const data = {};
      data.id = action.id;
      data.text = action.text;
      data.editPanel = action.editPanel;
      data.completed = action.completed;
      const todos = clone(state.todos);
      const editindex = findIndex(todos, {id: action.id });
      return {
        ...state,
        todos: [...todos.slice(0, editindex).concat([data]), ...todos.slice(editindex + 1)],
      };
    }
    case 'COMPLETE_TODO': {
      const data = {};
      data.id = action.id;
      data.text = action.text;
      data.editPanel = action.editPanel;
      data.completed = !action.completed;
      const todos = clone(state.todos);
      const editindex = findIndex(todos, {id: action.id });
      return {
        ...state,
        todos: [...todos.slice(0, editindex).concat([data]), ...todos.slice(editindex + 1)],
      };
    }
    case 'DELETE_TODO': {
      const todos = clone(state.todos);
      const deleteindex = findIndex(todos, {id: action.id });
      return {
        ...state,
        todos: [...todos.slice(0, deleteindex), ...todos.slice(deleteindex + 1)],
      };
    }
    default: {
      return state;
    }
  }
}

export {
  initial,
};
