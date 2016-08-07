const initialState = {
  loading: 'hey',
};

function initial(state = initialState, action) {
  switch (action.type) {
    case 'FIRST': {
      return { ...state, loading: state.loading };
    }
    default: {
      return state;
    }
  }
}

export {
  initial,
};
