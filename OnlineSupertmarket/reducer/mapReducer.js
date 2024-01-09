const initialState = {
  text: null,
  selectedStreet: null,
  display: false,
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_STREET':
      return {
        ...state,
        selectedStreet: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'SET_DISPLAY':
      return {
        ...state,
        display: action.payload,
      };
    default:
      return state;
  }
};

export default mapReducer;
